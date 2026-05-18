// js/dev-switcher.js
// Painel flutuante de troca rápida de perfil — exclusivo do MODO MASTER.
//
// Visibilidade:
//   - Por padrão, NADA é renderizado (usuários comuns não veem nem o botão).
//   - O modo master é ativado quando:
//       a) o usuário Alan (Master) faz login com a credencial correta, OU
//       b) a URL contém o token de ativação: ?master=alanmaster2026
//   - Ativação fica salva no localStorage do navegador (chave ppc_master_mode='1').
//   - Pode ser desativado pelo botão "Desligar Modo Master" do próprio painel.

(function () {
    const MASTER_MODE_KEY = 'ppc_master_mode';
    const MASTER_USER_ID  = 999;
    const MASTER_TOKEN    = 'alanmaster2026';

    // ── Perfis disponíveis (espelha o banco mock em store.js) ─────────
    const PROFILES = [
        {
            id: 101, name: 'João Silva', cpf: '123.456.789-00',
            profile: 'paciente', tag: 'Paciente',
            note: 'Diabetes + Hipertensão · dados moderados',
            iconBg: '#EFF6FF', iconColor: '#1D4ED8', icon: 'user'
        },
        {
            id: 105, name: 'Carlos Eduardo Pereira', cpf: '321.654.987-00',
            profile: 'paciente', tag: 'Paciente',
            note: '⚠️ Crítico: hipertensão descontrolada (170/105)',
            iconBg: '#FEE2E2', iconColor: '#B91C1C', icon: 'heart-pulse'
        },
        {
            id: 106, name: 'Ana Beatriz Lima', cpf: '789.123.456-00',
            profile: 'paciente', tag: 'Paciente',
            note: '⚠️ Crítico: diabetes descompensada (240 mg/dL)',
            iconBg: '#FEF3C7', iconColor: '#92400E', icon: 'droplet'
        },
        {
            id: 104, name: 'Maria Souza', cpf: '987.654.321-00',
            profile: 'paciente', tag: 'Paciente',
            note: 'Conta limpa: sem dados (testar fluxo do zero)',
            iconBg: '#EFF6FF', iconColor: '#1D4ED8', icon: 'user'
        },
        {
            id: 102, name: 'Alan Cuidador', cpf: '477.447.980-23',
            profile: 'cuidador', tag: 'Cuidador',
            note: 'Vinculado ao paciente João Silva',
            iconBg: '#FFF7ED', iconColor: '#C2410C', icon: 'shield-check',
            linkedPatientId: 101
        },
        {
            id: 103, name: 'Dra. Ana', cpf: '111.111.111-11',
            profile: 'medico', tag: 'Médico',
            note: 'CRM 12345-MG · vê todos os pacientes',
            iconBg: '#F0FDF4', iconColor: '#15803D', icon: 'stethoscope'
        }
    ];

    // ── Helpers ───────────────────────────────────────────────────────
    function getCurrentUser() {
        try { return JSON.parse(localStorage.getItem('ppc_currentUser')); }
        catch (_) { return null; }
    }

    function isMasterMode() {
        return localStorage.getItem(MASTER_MODE_KEY) === '1';
    }
    function enableMasterMode() {
        localStorage.setItem(MASTER_MODE_KEY, '1');
    }
    function disableMasterMode() {
        localStorage.removeItem(MASTER_MODE_KEY);
    }

    // Verifica gatilhos de ativação:
    //   1) token na URL  →  ?master=<TOKEN>
    //   2) usuário master logado (id 999)
    function checkActivationTriggers() {
        // 1) URL token
        const params = new URLSearchParams(location.search);
        if (params.get('master') === MASTER_TOKEN) {
            enableMasterMode();
            // Limpa o token da URL para não ficar visível
            params.delete('master');
            const qs = params.toString();
            history.replaceState({}, '', location.pathname + (qs ? '?' + qs : ''));
        }
        // 2) Usuário master logado
        const user = getCurrentUser();
        if (user && user.id === MASTER_USER_ID) {
            enableMasterMode();
        }
    }

    function loginAs(profile) {
        const users = JSON.parse(localStorage.getItem('ppc_users') || '[]');
        const user = users.find(u => u.id === profile.id);
        if (!user) {
            alert('Usuário não encontrado no banco mock. Tente recarregar a tela inicial primeiro.');
            return;
        }
        // Usa appStore.loginUser quando disponível (valida que o usuário existe e
        // mantém consistência com o resto do app). Fallback para gravação direta.
        if (window.appStore && typeof window.appStore.loginUser === 'function') {
            const ok = window.appStore.loginUser(user);
            if (!ok) {
                // Fallback: grava direto se a validação do store falhar
                localStorage.setItem('ppc_currentUser', JSON.stringify(user));
            }
        } else {
            localStorage.setItem('ppc_currentUser', JSON.stringify(user));
        }
        // Redireciona pra dashboard apropriada
        const base = location.pathname.includes('/pages/') ? '' : 'pages/';
        if (user.profile === 'medico') {
            location.href = base + 'clinical-dashboard.html';
        } else {
            location.href = base + 'dashboard.html';
        }
    }

    function logoutAll() {
        localStorage.removeItem('ppc_currentUser');
        // Volta pra index
        const inPagesFolder = location.pathname.includes('/pages/');
        location.href = inPagesFolder ? '../index.html' : 'index.html';
    }

    function resetTutorials() {
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const k = localStorage.key(i);
            if (k && k.startsWith('ppc_onboarding_done_')) {
                localStorage.removeItem(k);
            }
        }
        location.reload();
    }

    function clearAllData() {
        if (!confirm('Isso vai apagar TODOS os dados locais (usuários, medições, sessões) e voltar pra tela inicial. Continuar?')) return;
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith('ppc_')) keys.push(k);
        }
        keys.forEach(k => localStorage.removeItem(k));
        const inPagesFolder = location.pathname.includes('/pages/');
        location.href = inPagesFolder ? '../index.html' : 'index.html';
    }

    // ── Construção da UI ──────────────────────────────────────────────
    function buildButton() {
        const btn = document.createElement('button');
        btn.className = 'devsw-fab';
        btn.id = 'devsw-fab';
        btn.setAttribute('aria-label', 'Modo desenvolvedor – trocar de perfil');
        btn.setAttribute('title', 'Modo dev: trocar de perfil');
        btn.innerHTML = `<i data-lucide="users-round"></i>`;
        document.body.appendChild(btn);
        return btn;
    }

    function buildPanel() {
        const overlay = document.createElement('div');
        overlay.className = 'devsw-overlay';
        overlay.id = 'devsw-overlay';

        const panel = document.createElement('div');
        panel.className = 'devsw-panel';

        const current = getCurrentUser();
        const currentId = current ? current.id : null;

        panel.innerHTML = `
            <div class="devsw-header">
                <div class="devsw-header-title">
                    <i data-lucide="flask-conical"></i>
                    <span>Modo Desenvolvedor</span>
                </div>
                <button class="devsw-close" aria-label="Fechar">
                    <i data-lucide="x"></i>
                </button>
            </div>
            <p class="devsw-subtitle">Troque rapidamente entre perfis sem passar pelo login.</p>

            <div class="devsw-section-label">
                <i data-lucide="user-cog"></i>
                Perfis disponíveis
            </div>
            <div class="devsw-list">
                ${PROFILES.map(p => `
                    <button class="devsw-item ${p.id === currentId ? 'active' : ''}" data-id="${p.id}">
                        <div class="devsw-item-icon" style="background:${p.iconBg}; color:${p.iconColor};">
                            <i data-lucide="${p.icon}"></i>
                        </div>
                        <div class="devsw-item-body">
                            <div class="devsw-item-head">
                                <strong>${p.name}</strong>
                                <span class="devsw-tag" style="background:${p.iconBg}; color:${p.iconColor};">${p.tag}</span>
                            </div>
                            <span class="devsw-item-cpf">CPF ${p.cpf}</span>
                            <span class="devsw-item-note">${p.note}</span>
                        </div>
                        <i data-lucide="${p.id === currentId ? 'check-circle' : 'arrow-right'}" class="devsw-item-action"></i>
                    </button>
                `).join('')}
            </div>

            <div class="devsw-section-label">
                <i data-lucide="settings-2"></i>
                Atalhos de teste
            </div>
            <div class="devsw-actions">
                <button class="devsw-action" data-act="reset-tutorial">
                    <i data-lucide="rotate-ccw"></i>
                    <span>Resetar tutoriais (mostrar de novo)</span>
                </button>
                <button class="devsw-action" data-act="logout">
                    <i data-lucide="log-out"></i>
                    <span>Sair / ir pra tela de login</span>
                </button>
                <button class="devsw-action devsw-action--danger" data-act="clear-all">
                    <i data-lucide="trash-2"></i>
                    <span>Apagar TODOS os dados locais</span>
                </button>
                <button class="devsw-action devsw-action--master" data-act="disable-master">
                    <i data-lucide="shield-off"></i>
                    <span>Desligar Modo Master neste navegador</span>
                </button>
            </div>

            <div class="devsw-footer">
                <small>
                    <strong>Modo Master ativo</strong> · Painel exclusivo do construtor.
                    Outros usuários do mesmo navegador não veem esse acesso.
                </small>
            </div>
        `;

        overlay.appendChild(panel);
        document.body.appendChild(overlay);

        // Bind handlers
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closePanel();
        });
        panel.querySelector('.devsw-close').addEventListener('click', closePanel);

        panel.querySelectorAll('.devsw-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = Number(btn.getAttribute('data-id'));
                const profile = PROFILES.find(p => p.id === id);
                if (profile) loginAs(profile);
            });
        });

        panel.querySelectorAll('.devsw-action').forEach(btn => {
            btn.addEventListener('click', () => {
                const act = btn.getAttribute('data-act');
                if (act === 'reset-tutorial') resetTutorials();
                else if (act === 'logout') logoutAll();
                else if (act === 'clear-all') clearAllData();
                else if (act === 'disable-master') {
                    if (confirm('Desligar Modo Master? Para reativar você precisará logar como Alan (Master) ou usar o link de ativação.')) {
                        disableMasterMode();
                        location.reload();
                    }
                }
            });
        });

        if (typeof lucide !== 'undefined') lucide.createIcons();
        return overlay;
    }

    let panelEl = null;
    function openPanel() {
        if (panelEl) return;
        panelEl = buildPanel();
        requestAnimationFrame(() => panelEl.classList.add('show'));
    }
    function closePanel() {
        if (!panelEl) return;
        panelEl.classList.remove('show');
        setTimeout(() => {
            if (panelEl) { panelEl.remove(); panelEl = null; }
        }, 200);
    }

    // API pública (útil para console)
    window.devSwitcher = {
        open: openPanel,
        close: closePanel,
        isMaster: isMasterMode,
        enable: () => { enableMasterMode(); init(); },
        disable: () => { disableMasterMode(); const f = document.getElementById('devsw-fab'); if (f) f.remove(); }
    };

    // ── Atalho de teclado: Ctrl/Cmd + Shift + D ──────────────────────
    // Só funciona se o modo master estiver ativo (para evitar curiosos abrirem)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
            if (!isMasterMode()) return;
            e.preventDefault();
            if (panelEl) closePanel(); else openPanel();
        }
    });

    // ── Inicialização ────────────────────────────────────────────────
    function init() {
        // Primeiro verifica se algum gatilho de ativação foi acionado nessa carga
        checkActivationTriggers();

        // Se não está em modo master, não renderiza absolutamente nada
        if (!isMasterMode()) return;
        if (document.getElementById('devsw-fab')) return;

        const btn = buildButton();
        btn.addEventListener('click', openPanel);
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

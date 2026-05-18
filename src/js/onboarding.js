// js/onboarding.js
// Tutorial guiado contextual: passos curtos por tela e por perfil
// (paciente, cuidador, médico). Cada tela tem sua própria flag de "já visto".

(function () {
    const STORAGE_PREFIX = 'ppc_onboarding_done_';

    // ── DEFINIÇÃO DOS TOURS ───────────────────────────────────────────
    // Estrutura: TUTORIALS[profile][screenKey] = [ {selector, title, text, placement}, ... ]
    // placement: 'top' (tooltip abaixo do alvo, seta pra cima)
    //            'bottom' (tooltip acima do alvo, seta pra baixo)
    // O posicionador faz fallback se não houver espaço.
    const TUTORIALS = {
        // ── PACIENTE ──────────────────────────────────────────────
        paciente: {
            dashboard: [
                {
                    selector: '#status-card',
                    title: 'Seu painel de saúde',
                    text: 'Aqui aparecem alertas inteligentes sobre suas medições. Se algo estiver fora do alvo, este cartão vai te avisar.',
                    placement: 'top'
                },
                {
                    selector: '#home-med-list',
                    title: 'Seus remédios do dia',
                    text: 'Veja os medicamentos cadastrados e marque o círculo do lado direito quando tomar cada um.',
                    placement: 'top'
                },
                {
                    selector: '#fab-add',
                    title: 'Registre uma medição',
                    text: 'Toque no botão "Novo Registro" sempre que medir sua pressão, glicemia ou sentir algum sintoma.',
                    placement: 'top'
                },
                {
                    selector: '.bottom-nav',
                    title: 'Navegação pelo app',
                    text: 'Use esta barra para acessar Histórico (registros antigos), Remédios (gerenciar medicamentos) e Perfil (dados clínicos).',
                    placement: 'top'
                }
            ],
            history: [
                {
                    selector: '#kpi-row',
                    title: 'Resumo dos seus registros',
                    text: 'Veja rapidamente quantas medições de pressão, glicemia, sintomas e exames você já registrou.',
                    placement: 'top'
                },
                {
                    selector: '#hist-search',
                    title: 'Busque pelo que precisa',
                    text: 'Digite para filtrar registros por tipo, data ou descrição. Útil quando o histórico fica longo.',
                    placement: 'top'
                },
                {
                    selector: '#btn-upload',
                    title: 'Anexe um exame',
                    text: 'Clique aqui para registrar um exame, laudo ou consulta antiga que você queira guardar no histórico.',
                    placement: 'top'
                }
            ],
            medications: [
                {
                    selector: '#kpi-row',
                    title: 'Visão geral dos remédios',
                    text: 'Quantos medicamentos você tem cadastrados, quantos estão em dia e se algum precisa de atenção.',
                    placement: 'top'
                },
                {
                    selector: '#btn-show-form',
                    title: 'Cadastre um remédio novo',
                    text: 'Toque para adicionar um novo medicamento com dose, horário da primeira dose e frequência de uso.',
                    placement: 'top'
                }
            ],
            profile: [
                {
                    selector: '#accordion-cuidadores',
                    title: 'Convide seus cuidadores',
                    text: 'Adicione familiares ou cuidadores aqui — eles terão acesso para acompanhar suas medições e ajudar com remédios.',
                    placement: 'top'
                },
                {
                    selector: '#btn-replay-tutorial',
                    title: 'Refaça o tutorial',
                    text: 'Sempre que quiser rever este passeio guiado, é só clicar neste botão.',
                    placement: 'bottom'
                }
            ]
        },

        // ── CUIDADOR (mesmas telas do paciente, com texto adaptado) ──
        cuidador: {
            dashboard: [
                {
                    selector: '.caregiver-banner',
                    title: 'Você é um cuidador',
                    text: 'Este aviso laranja aparece em todas as telas para você nunca esquecer qual paciente está acompanhando. Todos os registros são feitos em nome dele.',
                    placement: 'top'
                },
                {
                    selector: '#status-card',
                    title: 'Painel do paciente',
                    text: 'Aqui aparecem alertas sobre as medições dele. Se algo estiver fora do alvo, este cartão te avisa.',
                    placement: 'top'
                },
                {
                    selector: '#home-med-list',
                    title: 'Remédios prescritos',
                    text: 'Lista dos remédios do paciente. Marque o círculo do lado quando ajudar a tomar cada um.',
                    placement: 'top'
                },
                {
                    selector: '#fab-add',
                    title: 'Registre por ele',
                    text: 'Use o botão "Novo Registro" para anotar pressão, glicemia ou sintomas observados no paciente.',
                    placement: 'top'
                },
                {
                    selector: '.bottom-nav',
                    title: 'Navegação',
                    text: 'Use a barra para acessar o histórico, gerenciar medicamentos e ver os dados clínicos do paciente.',
                    placement: 'top'
                }
            ],
            history: [
                {
                    selector: '#kpi-row',
                    title: 'Resumo de registros',
                    text: 'Quantas medições e relatos já foram feitos para este paciente.',
                    placement: 'top'
                },
                {
                    selector: '#hist-search',
                    title: 'Busque rapidamente',
                    text: 'Filtre por data, tipo ou termo. Útil para mostrar ao médico em consultas.',
                    placement: 'top'
                },
                {
                    selector: '#btn-upload',
                    title: 'Anexar exame',
                    text: 'Inclua exames e laudos do paciente no histórico digital.',
                    placement: 'top'
                }
            ],
            medications: [
                {
                    selector: '#kpi-row',
                    title: 'Remédios do paciente',
                    text: 'Visão geral dos medicamentos cadastrados, em dia ou que precisam de atenção.',
                    placement: 'top'
                },
                {
                    selector: '#btn-show-form',
                    title: 'Adicionar medicamento',
                    text: 'Cadastre um novo remédio com dose, horário e frequência.',
                    placement: 'top'
                }
            ],
            profile: [
                {
                    selector: '#clinic-container',
                    title: 'Dados clínicos do paciente',
                    text: 'Idade, sexo, tipo sanguíneo, alergias e condições crônicas. Você pode editar caso precise atualizar.',
                    placement: 'top'
                },
                {
                    selector: '#btn-replay-tutorial',
                    title: 'Rever este passeio',
                    text: 'Clique aqui sempre que quiser refazer o tutorial.',
                    placement: 'bottom'
                }
            ]
        },

        // ── MÉDICO (clinical-dashboard) ───────────────────────────
        medico: {
            clinical: [
                {
                    selector: '.clinical-sidebar',
                    title: 'Sua área profissional',
                    text: 'Esta barra lateral identifica você como médico e dá acesso à gestão de pacientes.',
                    placement: 'top'
                },
                {
                    selector: '#patient-search',
                    title: 'Buscar pacientes',
                    text: 'Digite o nome do paciente para filtrar rapidamente na lista ao lado.',
                    placement: 'top'
                },
                {
                    selector: '#doctor-patient-list',
                    title: 'Lista de pacientes',
                    text: 'Clique em um paciente para abrir o prontuário completo: evolução, prescrições, sintomas e poder registrar conduta clínica.',
                    placement: 'top'
                }
            ]
        }
    };

    // ── ESTADO ────────────────────────────────────────────────────────
    let currentStep = 0;
    let activeSteps = null;
    let activeScreenKey = null;
    let overlayEl, tooltipEl, highlightEl;

    // ── HELPERS DE CONTEXTO ───────────────────────────────────────────
    function getCurrentUser() {
        try { return JSON.parse(localStorage.getItem('ppc_currentUser')); }
        catch (_) { return null; }
    }

    function getScreenKey() {
        const p = location.pathname.toLowerCase();
        if (p.endsWith('clinical-dashboard.html')) return 'clinical';
        if (p.endsWith('dashboard.html')) return 'dashboard';
        if (p.endsWith('history.html')) return 'history';
        if (p.endsWith('medications.html')) return 'medications';
        if (p.endsWith('profile.html')) return 'profile';
        return null;
    }

    function getStepsFor(user, screenKey) {
        if (!user || !screenKey) return null;
        const byProfile = TUTORIALS[user.profile];
        if (!byProfile) return null;
        return byProfile[screenKey] || null;
    }

    function doneKey(userId, screenKey) {
        return STORAGE_PREFIX + userId + '_' + screenKey;
    }

    function isDone(userId, screenKey) {
        return localStorage.getItem(doneKey(userId, screenKey)) === '1';
    }

    function markDone(userId, screenKey) {
        if (userId && screenKey) {
            localStorage.setItem(doneKey(userId, screenKey), '1');
        }
    }

    // Remove TODAS as flags de tutorial deste usuário
    function clearAllDone(userId) {
        if (!userId) return;
        const prefix = STORAGE_PREFIX + userId + '_';
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const k = localStorage.key(i);
            if (k && k.startsWith(prefix)) localStorage.removeItem(k);
        }
        // Limpa também a chave antiga (versão sem screenKey) caso exista
        localStorage.removeItem(STORAGE_PREFIX + userId);
    }

    // ── UI: construção do overlay/tooltip ─────────────────────────────
    function buildDom() {
        overlayEl = document.createElement('div');
        overlayEl.className = 'onb-overlay';

        highlightEl = document.createElement('div');
        highlightEl.className = 'onb-highlight';

        tooltipEl = document.createElement('div');
        tooltipEl.className = 'onb-tooltip';
        tooltipEl.innerHTML = `
            <div class="onb-tooltip-header">
                <span class="onb-step-counter"></span>
                <button class="onb-skip" type="button" aria-label="Pular tutorial">Pular</button>
            </div>
            <h3 class="onb-title"></h3>
            <p class="onb-text"></p>
            <div class="onb-dots" aria-hidden="true"></div>
            <div class="onb-actions">
                <button class="btn btn-outline onb-prev" type="button">Voltar</button>
                <button class="btn btn-primary onb-next" type="button">Próximo</button>
            </div>
            <div class="onb-arrow" aria-hidden="true"></div>
        `;

        document.body.appendChild(overlayEl);
        document.body.appendChild(highlightEl);
        document.body.appendChild(tooltipEl);

        // Bullets de progresso
        const dotsEl = tooltipEl.querySelector('.onb-dots');
        dotsEl.innerHTML = '';
        for (let i = 0; i < activeSteps.length; i++) {
            const dot = document.createElement('span');
            dot.className = 'onb-dot';
            dotsEl.appendChild(dot);
        }

        tooltipEl.querySelector('.onb-skip').addEventListener('click', finish);
        tooltipEl.querySelector('.onb-prev').addEventListener('click', () => goTo(currentStep - 1));
        tooltipEl.querySelector('.onb-next').addEventListener('click', () => {
            if (currentStep >= activeSteps.length - 1) finish();
            else goTo(currentStep + 1);
        });

        window.addEventListener('resize', renderCurrent);
        window.addEventListener('scroll', renderCurrent, { passive: true });
        document.addEventListener('keydown', onKeydown);
    }

    function onKeydown(e) {
        if (!overlayEl) return;
        if (e.key === 'Escape') finish();
        if (e.key === 'ArrowRight') goTo(currentStep + 1);
        if (e.key === 'ArrowLeft') goTo(currentStep - 1);
    }

    function goTo(idx) {
        if (idx < 0) return;
        if (idx >= activeSteps.length) { finish(); return; }
        currentStep = idx;
        renderCurrent();
    }

    function renderCurrent() {
        if (!overlayEl || !activeSteps) return;
        const step = activeSteps[currentStep];
        const target = document.querySelector(step.selector);

        tooltipEl.querySelector('.onb-title').textContent = step.title;
        tooltipEl.querySelector('.onb-text').textContent = step.text;
        tooltipEl.querySelector('.onb-step-counter').textContent =
            `${currentStep + 1} / ${activeSteps.length}`;

        const nextBtn = tooltipEl.querySelector('.onb-next');
        nextBtn.textContent = (currentStep === activeSteps.length - 1) ? 'Concluir' : 'Próximo';

        const prevBtn = tooltipEl.querySelector('.onb-prev');
        prevBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';

        tooltipEl.querySelectorAll('.onb-dot').forEach((d, i) => {
            d.classList.toggle('active', i === currentStep);
        });

        if (!target) {
            // Elemento da tela não existe (ex: acordeão escondido) → centraliza tooltip
            highlightEl.style.opacity = '0';
            tooltipEl.classList.remove('arrow-top', 'arrow-bottom');
            tooltipEl.style.left = '50%';
            tooltipEl.style.top  = '50%';
            tooltipEl.style.transform = 'translate(-50%, -50%)';
            return;
        }

        const rect = target.getBoundingClientRect();
        const needsScroll = rect.top < 80 || rect.bottom > (window.innerHeight - 220);
        if (needsScroll) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(positionTo.bind(null, target, step.placement), 320);
        } else {
            positionTo(target, step.placement);
        }
    }

    function positionTo(target, placement) {
        const r = target.getBoundingClientRect();
        const pad = 8;

        // Spotlight
        highlightEl.style.opacity = '1';
        highlightEl.style.left   = `${r.left - pad}px`;
        highlightEl.style.top    = `${r.top  - pad}px`;
        highlightEl.style.width  = `${r.width  + pad * 2}px`;
        highlightEl.style.height = `${r.height + pad * 2}px`;

        tooltipEl.style.transform = 'none';
        const tooltipRect = tooltipEl.getBoundingClientRect();
        const tw = tooltipRect.width || 320;
        const th = tooltipRect.height || 180;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const gap = 16;

        let top, left;
        let arrowSide = placement;

        // arrowSide = 'top'    → tooltip ABAIXO, seta no topo apontando pra CIMA.
        //                        precisa de espaço ABAIXO do alvo.
        // arrowSide = 'bottom' → tooltip ACIMA, seta embaixo apontando pra BAIXO.
        //                        precisa de espaço ACIMA do alvo.
        if (placement === 'top' && r.bottom + th + gap > vh - 12) {
            arrowSide = 'bottom';
        } else if (placement === 'bottom' && r.top - th - gap < 12) {
            arrowSide = 'top';
        }

        if (arrowSide === 'top') {
            top = r.bottom + gap;
            left = r.left + r.width / 2 - tw / 2;
        } else {
            top = r.top - th - gap;
            left = r.left + r.width / 2 - tw / 2;
        }

        left = Math.max(12, Math.min(left, vw - tw - 12));
        top  = Math.max(12, Math.min(top,  vh - th - 12));

        tooltipEl.style.left = `${left}px`;
        tooltipEl.style.top  = `${top}px`;

        tooltipEl.classList.remove('arrow-top', 'arrow-bottom');
        tooltipEl.classList.add(arrowSide === 'top' ? 'arrow-top' : 'arrow-bottom');

        const arrow = tooltipEl.querySelector('.onb-arrow');
        const arrowOffset = Math.max(20, Math.min((r.left + r.width / 2) - left, tw - 20));
        arrow.style.left = `${arrowOffset}px`;
    }

    function finish() {
        if (overlayEl) overlayEl.remove();
        if (tooltipEl) tooltipEl.remove();
        if (highlightEl) highlightEl.remove();
        overlayEl = tooltipEl = highlightEl = null;
        window.removeEventListener('resize', renderCurrent);
        window.removeEventListener('scroll', renderCurrent);
        document.removeEventListener('keydown', onKeydown);

        const user = getCurrentUser();
        if (user && activeScreenKey) markDone(user.id, activeScreenKey);

        activeSteps = null;
        activeScreenKey = null;
    }

    // ── API PÚBLICA ───────────────────────────────────────────────────
    function start(forceProfile, forceScreen) {
        if (overlayEl) return; // já aberto

        const user = getCurrentUser();
        if (!user) return;

        const profile = forceProfile || user.profile;
        const screenKey = forceScreen || getScreenKey();
        const steps = (TUTORIALS[profile] || {})[screenKey];
        if (!steps || !steps.length) return;

        activeSteps = steps;
        activeScreenKey = screenKey;
        currentStep = 0;
        buildDom();
        renderCurrent();
    }

    window.startOnboarding = start;
    window.resetOnboarding = function () {
        const user = getCurrentUser();
        if (user) clearAllDone(user.id);
    };

    // Auto-início: roda automaticamente em qualquer tela com tour pendente
    function maybeAutoStart() {
        const user = getCurrentUser();
        if (!user) return;
        const screenKey = getScreenKey();
        if (!screenKey) return;
        if (isDone(user.id, screenKey)) return;
        const steps = getStepsFor(user, screenKey);
        if (!steps || !steps.length) return;
        // espera renderização da página
        setTimeout(start, 700);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', maybeAutoStart);
    } else {
        maybeAutoStart();
    }
})();

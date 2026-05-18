// js/security.js
// RNF-07: Segurança de Acesso - Timeout de Inatividade + Roteamento por Perfil

// Checagem síncrona (executa no parse, antes do DOMContentLoaded) para impedir que
// scripts da página tentem renderizar dados protegidos sem sessão.
(function () {
    const path = window.location.pathname;
    const isAuthPage = path.endsWith('/') || path.endsWith('/index.html') || path.endsWith('/register.html');
    if (isAuthPage) return;

    let session = null;
    try { session = JSON.parse(localStorage.getItem('ppc_currentUser')); } catch (e) { session = null; }
    if (!session || typeof session.id === 'undefined' || !session.profile) {
        // Limpa qualquer resíduo inválido antes de redirecionar
        localStorage.removeItem('ppc_currentUser');
        window.location.replace('../index.html');
        return;
    }

    // ── Controle de acesso por perfil ──────────────────────────────────
    // Páginas de paciente/cuidador: dashboard, history, medications, profile, report
    // Página exclusiva do médico: clinical-dashboard
    const isClinical = path.endsWith('/clinical-dashboard.html');
    const isPatientArea = (
        path.endsWith('/dashboard.html')   ||
        path.endsWith('/history.html')     ||
        path.endsWith('/medications.html') ||
        path.endsWith('/profile.html')     ||
        path.endsWith('/report.html')
    );

    if (isClinical && session.profile !== 'medico') {
        // Paciente/cuidador tentando acessar área clínica → manda pro dashboard correto
        window.location.replace('dashboard.html');
        return;
    }
    if (isPatientArea && session.profile === 'medico') {
        // Médico tentando acessar área do paciente → manda pra área clínica
        window.location.replace('clinical-dashboard.html');
        return;
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const isAuthPage = path.endsWith('/') || path.endsWith('/index.html') || path.endsWith('/register.html');
    if (isAuthPage) return;

    let timeoutId;
    const TIMEOUT_MS = 15 * 60 * 1000; // 15 minutos em milissegundos

    function logoutByInactivity() {
        // Limpa apenas o usuário ativo, mantendo o banco ppc_users intacto para retorno
        localStorage.removeItem('ppc_currentUser');
        if (typeof showToast === 'function') {
            showToast("Sessão expirou (15 min de inatividade). Redirecionando…", 'info', 2000);
            setTimeout(() => { window.location.href = '../index.html'; }, 1800);
        } else {
            window.location.href = '../index.html';
        }
    }

    function resetTimer() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(logoutByInactivity, TIMEOUT_MS);
    }

    // Array de eventos que representam interação do usuário para manter a sessão viva
    const userEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    
    userEvents.forEach(event => {
        window.addEventListener(event, resetTimer);
    });

    // Inicia a primeira contagem
    resetTimer();
});

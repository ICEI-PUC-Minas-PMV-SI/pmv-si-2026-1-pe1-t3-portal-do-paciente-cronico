// js/security.js
// RNF-07: Segurança de Acesso - Timeout de Inatividade

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
        alert("Sua sessão expirou devido a um período de 15 minutos de inatividade. Por motivos de segurança (Proteção de Dados Médicos), você foi desconectado.");
        window.location.href = '../index.html'; 
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

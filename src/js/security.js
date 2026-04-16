// js/security.js
// RNF-07: Segurança de Acesso - Timeout de Inatividade

document.addEventListener('DOMContentLoaded', () => {
    // Evita rodar na página de login e cadastro (onde não há sessão autenticada)
    const isAuthPage = window.location.pathname.includes('index.html') || window.location.pathname.includes('register.html');
    if (isAuthPage) return;

    // Se tentar acessar uma página restrita sem usuário, chuta pra fora localmente
    if (typeof appStore !== 'undefined') {
        const currentUser = JSON.parse(localStorage.getItem('ppc_currentUser'));
        if (!currentUser) {
            window.location.href = '../index.html';
            return;
        }
    }

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

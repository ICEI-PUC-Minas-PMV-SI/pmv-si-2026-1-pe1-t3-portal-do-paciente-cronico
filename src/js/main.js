// js/main.js
// Lógica global e utilitários

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização do Lucide Icons (substitui as tags <i data-lucide="...">)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

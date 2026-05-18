// js/modal.js
// Gerenciamento do Bottom Sheet (Ação Rápida +)

document.addEventListener('DOMContentLoaded', () => {
    const fabButton = document.getElementById('fab-add');
    const bottomSheet = document.getElementById('quick-action-sheet');
    const overlay = document.getElementById('modal-overlay');
    const cancelBtn = document.getElementById('btn-cancel-action');

    function openSheet() {
        if (!bottomSheet || !overlay) return;
        overlay.classList.add('active');
        bottomSheet.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evita rolagem fundo
    }

    function closeSheet() {
        if (!bottomSheet || !overlay) return;
        overlay.classList.remove('active');
        bottomSheet.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (fabButton) {
        fabButton.addEventListener('click', openSheet);
    }
    if (overlay) {
        overlay.addEventListener('click', closeSheet);
    }
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeSheet);
    }

    // Lógica simples de Tabs dentro do modal
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Limpa estado ativo de TODAS as abas (e remove estilo inline antigo que
            // sobrescrevia o visual de "pílula" da nova UI do bottom-sheet)
            tabs.forEach(t => {
                t.classList.remove('active');
                t.style.borderBottom = '';
            });
            tabContents.forEach(c => c.style.display = 'none');

            // Marca a aba atual
            tab.classList.add('active');

            // Mostra o conteúdo correspondente
            const target = tab.getAttribute('data-target');
            const targetEl = document.getElementById(target);
            if (targetEl) targetEl.style.display = 'block';
        });
    });
});

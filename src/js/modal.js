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
            // Remove active classes
            tabs.forEach(t => t.classList.remove('active', 'border-b-2', 'border-primary', 'text-primary'));
            tabContents.forEach(c => c.style.display = 'none');
            
            // Add active class
            tab.classList.add('active', 'text-primary');
            tab.style.borderBottom = '2px solid var(--primary)';
            
            // Show content
            const target = tab.getAttribute('data-target');
            document.getElementById(target).style.display = 'block';
        });
    });
});

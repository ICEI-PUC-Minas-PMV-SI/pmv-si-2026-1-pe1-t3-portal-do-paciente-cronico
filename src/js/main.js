// js/main.js
// Lógica global e utilitários

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização do Lucide Icons (se usado via tag i)
    // Se estivermos usando CDN cdnjs, a função lucide.createIcons() substitui as tags apropriadas.
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Utility para navegar entre páginas sem reload visual bruto se possível (SPA simples), 
// mas por enquanto apenas links padrões com transição suave.
function navigateTo(url) {
    document.body.style.opacity = 0;
    setTimeout(() => {
        window.location.href = url;
    }, 200);
}

// Interação simples no botão de check de medicamentos
function toggleMedication(btnElement) {
    const card = btnElement.closest('.card');
    card.classList.toggle('bg-success-light');
    
    // Troca ícone ou cor do botão
    if (card.classList.contains('bg-success-light')) {
        btnElement.style.backgroundColor = 'var(--success)';
        btnElement.style.color = 'white';
        // Feedback visual
        btnElement.innerHTML = '<i data-lucide="check-circle"></i>';
    } else {
        btnElement.style.backgroundColor = '';
        btnElement.style.color = 'var(--text-muted)';
        btnElement.innerHTML = '<i data-lucide="circle"></i>';
    }
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

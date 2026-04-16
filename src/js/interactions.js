// js/interactions.js
// Lógica para Accordion e outras interações específicas de páginas

document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            // Toggle active class no botão
            this.classList.toggle('active');
            
            // Pega o painel de conteúdo
            const panel = this.nextElementSibling;
            const icon = this.querySelector('.accordion-icon');
            
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                panel.style.paddingTop = null;
                panel.style.paddingBottom = null;
                if(icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            } else {
                // Remove visual de todos (opcional - accordion exclusivo)
                // document.querySelectorAll('.accordion-content').forEach(p => p.style.maxHeight = null);
                
                panel.style.maxHeight = panel.scrollHeight + 40 + "px"; // + padding approx
                panel.style.paddingTop = "16px";
                panel.style.paddingBottom = "16px";
                if(icon) {
                    icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });
});

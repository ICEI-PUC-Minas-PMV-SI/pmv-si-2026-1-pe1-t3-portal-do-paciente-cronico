// js/toast.js
// Sistema simples de toasts não-bloqueantes (substitui alert() em fluxos do app)

(function () {
    function ensureContainer() {
        let c = document.getElementById('ppc-toast-container');
        if (!c) {
            c = document.createElement('div');
            c.id = 'ppc-toast-container';
            document.body.appendChild(c);
        }
        return c;
    }

    /**
     * Exibe um toast.
     * @param {string} message
     * @param {'success'|'error'|'info'} type
     * @param {number} durationMs (default 2500)
     */
    function showToast(message, type, durationMs) {
        type = type || 'info';
        durationMs = typeof durationMs === 'number' ? durationMs : 2500;
        const container = ensureContainer();
        const toast = document.createElement('div');
        toast.className = 'ppc-toast ppc-toast-' + type;
        toast.textContent = String(message || '');
        container.appendChild(toast);
        // Trigger CSS transition
        requestAnimationFrame(() => toast.classList.add('ppc-toast-show'));
        setTimeout(() => {
            toast.classList.remove('ppc-toast-show');
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
            setTimeout(() => { if (toast.isConnected) toast.remove(); }, 600); // fallback
        }, durationMs);
    }

    window.showToast = showToast;
})();

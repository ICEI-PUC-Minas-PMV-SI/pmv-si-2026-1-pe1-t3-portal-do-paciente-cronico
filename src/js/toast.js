// js/toast.js
// Sistema simples de toasts não-bloqueantes + utilitários de UI compartilhados

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
        requestAnimationFrame(() => toast.classList.add('ppc-toast-show'));
        setTimeout(() => {
            toast.classList.remove('ppc-toast-show');
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
            setTimeout(() => { if (toast.isConnected) toast.remove(); }, 600);
        }, durationMs);
    }

    /**
     * Escapa string para uso seguro em innerHTML.
     * Sempre use esta função quando o conteúdo pode vir de input do usuário.
     */
    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /**
     * Confirmação modal não-bloqueante (substitui window.confirm).
     * Retorna uma Promise<boolean>.
     */
    function showConfirm(message, options) {
        options = options || {};
        const okLabel = options.okLabel || 'Confirmar';
        const cancelLabel = options.cancelLabel || 'Cancelar';
        const danger = !!options.danger;

        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.className = 'ppc-confirm-overlay';
            overlay.innerHTML = `
                <div class="ppc-confirm-card" role="dialog" aria-modal="true">
                    <p class="ppc-confirm-msg">${escapeHtml(message)}</p>
                    <div class="ppc-confirm-actions">
                        <button class="btn btn-outline" data-act="cancel">${escapeHtml(cancelLabel)}</button>
                        <button class="btn ${danger ? 'ppc-btn-danger' : 'btn-primary'}" data-act="ok">${escapeHtml(okLabel)}</button>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);
            requestAnimationFrame(() => overlay.classList.add('show'));

            const close = (result) => {
                overlay.classList.remove('show');
                setTimeout(() => overlay.remove(), 200);
                resolve(result);
            };
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) close(false);
                const act = e.target.closest('[data-act]')?.getAttribute('data-act');
                if (act === 'ok') close(true);
                if (act === 'cancel') close(false);
            });
        });
    }

    window.showToast = showToast;
    window.escapeHtml = escapeHtml;
    window.showConfirm = showConfirm;
})();

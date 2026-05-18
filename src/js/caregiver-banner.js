// js/caregiver-banner.js
// Injeta automaticamente um banner identificando o cuidador e o paciente representado.
// Inclua este script DEPOIS de store.js em todas as páginas internas (dashboard, history, medications, profile).

(function () {
    function buildBanner(caregiverName, patientName, patientInitial) {
        const banner = document.createElement('div');
        banner.className = 'caregiver-banner';
        banner.setAttribute('role', 'status');
        banner.setAttribute('aria-live', 'polite');
        banner.innerHTML = `
            <div class="cgb-avatar" aria-hidden="true">${patientInitial}</div>
            <div class="cgb-body">
                <span class="cgb-label">
                    <i data-lucide="shield-check" class="cgb-icon"></i>
                    Você está acompanhando
                </span>
                <strong class="cgb-patient">${patientName}</strong>
                <span class="cgb-cg">Cuidador logado: ${caregiverName}</span>
            </div>
        `;
        return banner;
    }

    function mount() {
        if (typeof appStore === 'undefined') return;
        const current = appStore.getCurrentUser();
        if (!current || current.profile !== 'cuidador') return;

        const patient = appStore.getPatientUser();
        if (!patient) return;

        const container = document.querySelector('.container');
        if (!container) return;

        // Evita duplicar
        if (container.querySelector('.caregiver-banner')) return;

        const safePatient = escapeHtmlSafe(patient.name || 'Paciente');
        const safeCg = escapeHtmlSafe(current.name || 'Cuidador');
        const initial = (patient.name || 'P').charAt(0).toUpperCase();

        const banner = buildBanner(safeCg, safePatient, initial);
        container.insertBefore(banner, container.firstChild);

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    function escapeHtmlSafe(s) {
        if (typeof window.escapeHtml === 'function') return window.escapeHtml(s);
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }
})();

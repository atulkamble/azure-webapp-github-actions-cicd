(() => {
    const panel = document.querySelector('[data-health-panel]');
    if (!panel) return;

    const refreshButton = panel.querySelector('[data-health-refresh]');
    const title = panel.querySelector('[data-health-title]');
    const description = panel.querySelector('[data-health-description]');
    const checkedTime = panel.querySelector('[data-health-time]');
    const statusIcon = panel.querySelector('.status-orb use');

    async function checkHealth() {
        if (panel.getAttribute('aria-busy') === 'true') return;
        panel.setAttribute('aria-busy', 'true');
        panel.dataset.state = 'loading';
        refreshButton.disabled = true;
        title.textContent = 'Checking application…';
        description.textContent = 'Contacting the health endpoint.';
        statusIcon.setAttribute('href', '#icon-refresh');

        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 8000);
        try {
            const response = await fetch(panel.dataset.healthUrl, {
                cache: 'no-store',
                headers: { Accept: 'application/json' },
                signal: controller.signal,
            });
            if (!response.ok) throw new Error('Health request failed');
            const result = await response.json();
            if (result.status !== 'healthy' || result.application !== 'azure-webapp-github-actions-cicd') {
                throw new Error('Unexpected health response');
            }
            panel.dataset.state = 'healthy';
            title.textContent = 'The application is healthy.';
            description.textContent = 'The application is responding and healthy.';
            statusIcon.setAttribute('href', '#icon-check');
        } catch (error) {
            panel.dataset.state = 'error';
            title.textContent = 'Unable to confirm health.';
            description.textContent = error.name === 'AbortError'
                ? 'The request timed out. Give it another try.'
                : 'The health check failed. Refresh to try again.';
            statusIcon.setAttribute('href', '#icon-shield');
        } finally {
            window.clearTimeout(timeout);
            const checked = new Date();
            checkedTime.textContent = checked.toLocaleTimeString([], {
                hour: '2-digit', minute: '2-digit', second: '2-digit',
            });
            checkedTime.title = checked.toLocaleString();
            refreshButton.disabled = false;
            panel.setAttribute('aria-busy', 'false');
        }
    }

    refreshButton.addEventListener('click', checkHealth);
    checkHealth();
})();

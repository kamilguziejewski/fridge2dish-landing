// assets/js/beta-form.js
// Logika formularza zapisu do beta testów Fridge2Dish AI
// Wersja pod GitHub Pages + Formspree (bez PHP)

export function initBetaForm() {
    const form = document.getElementById('beta-signup-form');
    if (!form) return;

    const nameInput = form.querySelector('#beta-name');
    const emailInput = form.querySelector('#beta-email');
    const consentInput = form.querySelector('#beta-consent');
    const statusEl = form.querySelector('#beta-status');
    const emailErrorEl = form.querySelector('.beta-error[data-for="email"]');
    const consentErrorEl = form.querySelector('.beta-error[data-for="consent"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!emailInput || !consentInput || !statusEl || !submitBtn) {
        return;
    }

    // 1) Endpoint z data-attribute albo stałej
    const endpointFromData = form.getAttribute('data-endpoint');
    const FORM_ENDPOINT = endpointFromData || 'https://formspree.io/f/mrbjrkla'; // <- PODMIEŃ na swój

    function clearErrors() {
        if (emailErrorEl) emailErrorEl.textContent = '';
        if (consentErrorEl) consentErrorEl.textContent = '';
        statusEl.textContent = '';
        statusEl.classList.remove('beta-success', 'beta-error');
    }

    function validateEmail(value) {
        if (!value) return 'Podaj adres e-mail.';
        const emailPattern = /^\S+@\S+\.\S+$/;
        if (!emailPattern.test(value)) return 'Podaj poprawny adres e-mail.';
        return null;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        await new Promise(r => setTimeout(r, 250));
        clearErrors();

        const email = emailInput.value.trim();
        const name = nameInput ? nameInput.value.trim() : '';
        const consentChecked = consentInput.checked;

        let hasError = false;

        const emailError = validateEmail(email);
        if (emailError && emailErrorEl) {
            emailErrorEl.textContent = emailError;
            hasError = true;
        }

        if (!consentChecked && consentErrorEl) {
            consentErrorEl.textContent = 'Zaznacz zgodę, abyśmy mogli się z Tobą skontaktować.';
            hasError = true;
        }

        if (hasError) {
            statusEl.textContent = 'Popraw zaznaczone pola i spróbuj ponownie.';
            statusEl.classList.add('beta-error');
            return;
        }

        // 2) Przygotowanie danych do wysyłki na Formspree
        const formData = new FormData();
        // nazwy pól muszą odpowiadać temu, co chcesz widzieć w mailu
        formData.append('email', email);
        formData.append('name', name || '(bez imienia)');
        formData.append('consent', consentChecked ? 'yes' : 'no');
        formData.append('_subject', 'Nowe zgłoszenie do beta testów Fridge2Dish AI');
        formData.append('_replyto', email);
        formData.append('_form_name', 'Fridge2DishBetaForm');
        // opcjonalnie, możesz dodać info o źródle
        formData.append('_origin', window.location.href);

        // UX – blokujemy przycisk
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Wysyłanie...';

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                // Formspree np. przy braku konfiguracji zwróci 400/422
                statusEl.textContent = 'Nie udało się wysłać formularza. Spróbuj ponownie później.';
                statusEl.classList.add('beta-error');
                return;
            }

            const data = await response.json().catch(() => null);

            // Formspree zwykle zwraca { ok: true } lub podobny JSON
            statusEl.textContent = 'Dziękujemy! Zapisaliśmy Cię na listę oczekujących.';
            statusEl.classList.add('beta-success');

            if (nameInput) nameInput.value = '';
            emailInput.value = '';
            consentInput.checked = false;

        } catch (error) {
            console.error('Błąd podczas zapisu do beta:', error);
            statusEl.textContent = 'Wystąpił błąd. Spróbuj ponownie za chwilę.';
            statusEl.classList.add('beta-error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

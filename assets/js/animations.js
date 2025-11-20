/* ============================================
   ANIMATIONS.JS - Dodatkowe animacje
   ============================================ */

// Efekt gradientu dla tekstu
export function initGradientText() {
    const gradientTexts = document.querySelectorAll('.gradient-text');
    gradientTexts.forEach(text => {
        const gradient = text.getAttribute('data-gradient') || '135deg, #ffffff 0%, #63D1A2 100%';
        text.style.background = `linear-gradient(${gradient})`;
        text.style.webkitBackgroundClip = 'text';
        text.style.backgroundClip = 'text';
        text.style.webkitTextFillColor = 'transparent';
    });
}

// Animacja liczb (jeśli są statystyki)
export function animateNumbers() {
    const numbers = document.querySelectorAll('[data-number]');
    
    numbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-number'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                num.textContent = target;
                clearInterval(timer);
            } else {
                num.textContent = Math.floor(current);
            }
        }, 16);
    });
}


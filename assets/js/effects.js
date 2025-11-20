/* ============================================
   EFFECTS.JS - Efekty wizualne (parallax, particles)
   ============================================ */

// Sprawdź czy jesteśmy na mobile
const isMobile = () => window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Efekt parallax dla sekcji hero (tylko desktop) - tylko tło, nie cała sekcja
export function initParallax() {
    if (isMobile()) return; // Wyłącz na mobile
    
    const hero = document.getElementById('hero');
    const pageHero = document.querySelector('.page-hero');
    const heroElement = hero || pageHero;
    
    if (!heroElement) return;
    
    // Parallax tylko dla pseudo-elementów (tła), nie dla całej sekcji
    // Sekcja pozostaje na swoim miejscu, tylko tło się przesuwa
    // To jest już obsługiwane przez CSS (background-attachment: fixed)
    // Więc możemy wyłączyć JS parallax, który przesuwał całą sekcję
}

// Efekt cząsteczek w tle (tylko desktop)
export function createParticles() {
    if (isMobile()) return; // Wyłącz na mobile
    
    const hero = document.getElementById('hero');
    const pageHero = document.querySelector('.page-hero');
    const heroElement = hero || pageHero;
    
    if (!heroElement) return;
    
    const particleCount = 20; // Zmniejszona liczba cząsteczek
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(99, 209, 162, 0.4)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        particle.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        heroElement.appendChild(particle);
        particles.push(particle);
    }
}

// Efekt navbar przy scrollowaniu
export function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Smooth scroll dla linków nawigacyjnych z offsetem dla navbar
export function initSmoothScroll() {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const offset = navbarHeight + 20; // Dodatkowe 20px odstępu
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Efekt hover dla kart
export function initCardHoverEffects() {
    const cards = document.querySelectorAll('.problem-card, .solution-card, .feature-card, .step-card, .technology-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!isMobile()) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Ripple effect dla przycisków
export function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: -1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}


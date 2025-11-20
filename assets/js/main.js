/* ============================================
   MAIN.JS - Główny plik łączący wszystkie moduły
   ============================================ */

import { initScrollAnimations } from './scroll.js';
import { initMobileMenu } from './mobile-menu.js';
import { initParallax, createParticles, initNavbarScroll, initSmoothScroll, initCardHoverEffects, initRippleEffect } from './effects.js';
import { initLazyLoading } from './lazyload.js';
import { initGradientText, animateNumbers } from './animations.js';
import { initBetaForm } from './beta-form.js';

console.log("Fridge2Dish AI – Skrypt działa poprawnie.");

// Inicjalizacja wszystkich funkcji po załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initNavbarScroll();
    initSmoothScroll();
    initCardHoverEffects();
    initMobileMenu();
    initLazyLoading();
    initGradientText();
    initRippleEffect();
    initBetaForm();
    
    // Efekty tylko na desktop (wyłączone na mobile)
    if (window.innerWidth > 768) {
        createParticles();
        initParallax();
    }
    
    // Animacja liczb (jeśli są)
    animateNumbers();
});

// Dodanie animacji ripple do CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);

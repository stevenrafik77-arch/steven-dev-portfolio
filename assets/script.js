/**
 * Steven Ibrahim Portfolio - Main Script
 * Handles: Lucide Icons, Typewriter Effect, Navbar Scroll Logic, and Scroll Reveals.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Automatic Year Update for Footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.innerText = new Date().getFullYear();
    }

    // 3. Optimized Scroll Handling using RequestAnimationFrame
    let lastScrollY = window.scrollY;
    const mainNav = document.getElementById('main-nav');
    const progressBar = document.getElementById('progress-bar');
    const navHeight = mainNav?.offsetHeight || 80;
    let ticking = false;

    const updateScrollElements = () => {
        const currentScrollY = window.scrollY;

        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (progressBar) progressBar.style.width = `${scrolled}%`;

        if (mainNav) {
            if (currentScrollY > lastScrollY && currentScrollY > navHeight) {
                mainNav.style.transform = "translateY(-100%)";
            } else {
                mainNav.style.transform = "translateY(0)";
            }
        }
        lastScrollY = currentScrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    }, { passive: true, capture: false });

    // 4. Modern Intersection Observer for Reveal Animations
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 5. Professional Typewriter Effect
    const textToType = "Steven Ibrahim";
    const typewriterEl = document.getElementById('typewriter-text');
    const jobTitleEl = document.getElementById('job-title');
    let charIndex = 0;
    const typingSpeed = 150;

    function startTypewriter() {
        if (typewriterEl && charIndex < textToType.length) {
            typewriterEl.innerText += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(startTypewriter, typingSpeed);
        } else if (jobTitleEl) {
            jobTitleEl.classList.remove('opacity-0', 'translate-y-4');
            jobTitleEl.classList.add('opacity-100', 'translate-y-0');
        }
    }

    // Start execution
    setTimeout(startTypewriter, 800);

    // Initial sync
    updateScrollElements();
});
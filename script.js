document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Custom Cursor ---
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    const hoverLinks = document.querySelectorAll('a, button, .image-frame');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 400, fill: "forwards" });
    });

    hoverLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hovered');
            cursorDot.style.opacity = '0';
        });
        link.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hovered');
            cursorDot.style.opacity = '1';
        });
    });

    // --- 2. Scroll Reveal (Observer) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden-element').forEach((el) => observer.observe(el));

    // --- 3. Parallax Effect ---
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroText = document.querySelector('.hero-content');
        if(heroText) {
            heroText.style.transform = `translateY(${scrollY * 0.4}px)`;
            heroText.style.opacity = 1 - (scrollY / 600);
        }
    });
});

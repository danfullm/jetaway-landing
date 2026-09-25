// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            navLinks.style.display = isExpanded ? 'none' : 'flex';
            navLinks.style.position = isExpanded ? 'static' : 'absolute';
            navLinks.style.top = isExpanded ? 'auto' : '100%';
            navLinks.style.left = isExpanded ? 'auto' : '0';
            navLinks.style.right = isExpanded ? 'auto' : '0';
            navLinks.style.backgroundColor = isExpanded ? 'transparent' : 'var(--warm-white)';
            navLinks.style.padding = isExpanded ? '0' : 'var(--spacing-md)';
            navLinks.style.flexDirection = isExpanded ? 'row' : 'column';
            navLinks.style.boxShadow = isExpanded ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.1)';

            // Animate hamburger
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (!isExpanded) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });

        // Close mobile menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    navLinks.style.display = 'none';
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    const spans = mobileMenuBtn.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                }
            });
        });
    }

    // Smooth scroll with offset for fixed nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

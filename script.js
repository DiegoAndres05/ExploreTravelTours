document.addEventListener('DOMContentLoaded', () => {
    // Nav link hover effects and active states
    const navLinks = document.querySelectorAll('.nav-link');
    const menuBtn = document.querySelector('.menu-btn');
    const navCenter = document.querySelector('.nav-center');
    const mainHeader = document.querySelector('.main-header');
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                // If mobile menu is open, close it on click
                if(window.innerWidth <= 768) {
                    navCenter.style.display = 'none';
                    mainHeader.classList.remove('menu-open');
                }
                
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    if (menuBtn && navCenter) {
        menuBtn.addEventListener('click', () => {
            if (navCenter.style.display === 'flex') {
                navCenter.style.display = 'none';
                mainHeader.classList.remove('menu-open');
                // Ensure header transparency logic applies
                handleScroll();
            } else {
                navCenter.style.display = 'flex';
                mainHeader.classList.add('menu-open');
                
                // Force background to be solid on mobile menu open
                mainHeader.classList.add('scrolled');

                // Inline styles for mobile dropdown
                navCenter.style.flexDirection = 'column';
                navCenter.style.position = 'absolute';
                navCenter.style.top = '100%';
                navCenter.style.left = '0';
                navCenter.style.width = '100%';
                navCenter.style.background = 'rgba(255, 255, 255, 0.98)';
                navCenter.style.padding = '20px';
                navCenter.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                
                // Set link colors to dark text for the white dropdown
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.style.color = '#1A1A1A';
                    link.style.textShadow = 'none';
                });
            }
        });
    }

    // Reset mobile menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navCenter) {
            navCenter.style.display = 'flex';
            navCenter.style.flexDirection = 'row';
            navCenter.style.position = 'static';
            navCenter.style.boxShadow = 'none';
            navCenter.style.background = 'transparent';
            navCenter.style.padding = '0';
            mainHeader.classList.remove('menu-open');
            
            // Reset link styling to be controlled by CSS classes
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.color = '';
                link.style.textShadow = '';
            });
            handleScroll();
        } else if (navCenter) {
            navCenter.style.display = 'none';
            mainHeader.classList.remove('menu-open');
        }
    });

    // Scroll animation for navbar to add shadow and change from transparent to solid
    const handleScroll = () => {
        // Don't modify if mobile menu is actively open
        if (mainHeader.classList.contains('menu-open')) return;

        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on load

    // Scroll Fade-In Observer Setup
    const fadeElements = document.querySelectorAll('.fade-in-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Unobserve if we only want it to animate once
                // observer.unobserve(entry.target);
            } else {
                // If we want it to fade out when scrolling up/down away
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });
});

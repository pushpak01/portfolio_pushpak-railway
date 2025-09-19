// loading.js - Enhanced with session storage tracking
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const navLinks = document.querySelectorAll('.nav-link');
    const homeLink = document.getElementById('homeLink');

    // ✅ Step 1: Skip loader if redirected from contact form
    if (window.location.href.includes('from=contact')) {
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
        // Clean URL → remove ?from=contact but keep #contact
        const cleanUrl = window.location.pathname + '#contact';
        window.history.replaceState({}, document.title, cleanUrl);
        return; // stop further loader logic
    }

    // ✅ Step 2: Standard loading screen behavior for home page
    const fromContact = sessionStorage.getItem('fromContactForm');

    if (fromContact && loadingScreen) {
        // If coming from contact form (old sessionStorage logic), skip loader
        sessionStorage.removeItem('fromContactForm');
        loadingScreen.style.display = 'none';
        return;
    }

    if (loadingScreen) {
        // Show loading screen initially
        loadingScreen.style.display = 'flex';

        // Hide loading screen after page loads
        window.addEventListener('load', function() {
            setTimeout(function() {
                loadingScreen.style.opacity = '0';
                setTimeout(function() {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000); // Adjust timing as needed
        });
    }

    // ✅ Step 3: Handle navigation to contact page
    document.querySelectorAll('[data-link="contact"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // For contact page, set a flag that we're navigating to contact
            sessionStorage.setItem('navigatingTo', 'contact');
        });
    });

    // ✅ Step 4: Handle navigation to home page
    document.querySelectorAll('[data-link="home"]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.location.pathname === '/' && this.getAttribute('href').includes('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                sessionStorage.setItem('navigatingTo', 'home');
            }
        });
    });
});

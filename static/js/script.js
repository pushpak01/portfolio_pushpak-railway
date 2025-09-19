// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = 'none';
    }
});

// Animate skill bars when in viewport
const skillSections = document.querySelectorAll('.skill-category');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.parentElement.previousElementSibling.querySelector('.skill-percentage').textContent;
                bar.style.width = width;
                bar.style.animation = 'move 1s linear infinite';
            });
        }
    });
}, { threshold: 0.5 });

skillSections.forEach(section => {
    observer.observe(section);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        // Simulate form submission
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // In a real application, you would use fetch or axios to submit the form
        setTimeout(() => {
            alert('Message sent successfully!');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Initialize animations
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Scroll animation for elements
function checkScroll() {
    const scrollTriggers = document.querySelectorAll('.scroll-trigger');

    scrollTriggers.forEach(trigger => {
        const triggerTop = trigger.getBoundingClientRect().top;
        const triggerBottom = trigger.getBoundingClientRect().bottom;

        // If element is in viewport
        if (triggerTop < window.innerHeight - 100 && triggerBottom > 0) {
            trigger.classList.add('visible');
        }
    });
}

// Initial check and add scroll listener
window.addEventListener('load', checkScroll);
window.addEventListener('scroll', checkScroll);

// Initialize skill bar animations
function initSkillBars() {
    const skillSections = document.querySelectorAll('.skill-category');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                    bar.style.animation = 'move 1s linear infinite';
                });
            }
        });
    }, { threshold: 0.5 });

    skillSections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSkillBars();

    // Add animation delay to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Modern loading page functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const contentWrapper = document.getElementById('contentWrapper');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');

    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            // Complete loading
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';

                contentWrapper.style.opacity = '1';

                // Trigger any animations on the main content
                setTimeout(() => {
                    if (typeof initSkillBars === 'function') {
                        initSkillBars();
                    }
                    checkScroll();
                }, 300);
            }, 500);
        }

        // Update progress bar
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
    }, 200);

    // Alternative: Use real loading events if needed
    window.addEventListener('load', () => {
        // If everything is already loaded, skip the simulated loading
        if (progress < 90) {
            progress = 90;
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
        }
    });
});

// Optional: Page transition animations for a more app-like feel
function navigateWithTransition(url) {
    const contentWrapper = document.getElementById('contentWrapper');
    const loadingScreen = document.getElementById('loadingScreen');

    // Fade out current content
    contentWrapper.style.opacity = '0';

    // Show loading screen briefly
    loadingScreen.style.opacity = '1';
    loadingScreen.style.visibility = 'visible';

    // Navigate after transition
    setTimeout(() => {
        window.location.href = url;
    }, 800);
}


// Optional: Add a subtle animation to the content wrapper on page load
function animateContentEntrance() {
    const contentWrapper = document.getElementById('contentWrapper');
    contentWrapper.style.transform = 'translateY(20px)';
    contentWrapper.style.opacity = '0';

    setTimeout(() => {
        contentWrapper.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        contentWrapper.style.transform = 'translateY(0)';
        contentWrapper.style.opacity = '1';
    }, 100);
}

// Call this function when your page content is ready
animateContentEntrance();




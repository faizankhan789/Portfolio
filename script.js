// ===============================================
// Portfolio Interactive JavaScript
// ===============================================

// Smooth Scroll & Navigation
document.addEventListener('DOMContentLoaded', function() {

    // ===============================================
    // Navigation Scroll Effect
    // ===============================================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // ===============================================
    // Mobile Menu Toggle
    // ===============================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // ===============================================
    // Smooth Scrolling for Navigation Links
    // ===============================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===============================================
    // Update Active Navigation Link
    // ===============================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ===============================================
    // Scroll Indicator
    // ===============================================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.querySelector('a').getAttribute('href'));
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ===============================================
    // Intersection Observer for Scroll Animations
    // ===============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.timeline-item, .project-card, .cert-card, .skill-category, .stat-item, .education-item'
    );

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // ===============================================
    // Typing Effect for Home Section (Optional)
    // ===============================================
    const titleElement = document.querySelector('.title');
    if (titleElement) {
        const titleText = titleElement.textContent;
        let isTypingEffectEnabled = false; // Set to true to enable typing effect

        if (isTypingEffectEnabled) {
            titleElement.textContent = '';
            let charIndex = 0;

            function typeTitle() {
                if (charIndex < titleText.length) {
                    titleElement.textContent += titleText.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeTitle, 100);
                }
            }

            setTimeout(typeTitle, 500);
        }
    }

    // ===============================================
    // Parallax Effect for Home Section Background
    // ===============================================
    const homeSection = document.querySelector('.section-home');
    if (homeSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;
            if (scrolled < homeSection.offsetHeight) {
                homeSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ===============================================
    // Dynamic Stats Counter Animation
    // ===============================================
    const statItems = document.querySelectorAll('.stat-item h3');
    let hasAnimated = false;

    function animateStats() {
        if (hasAnimated) return;

        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible) {
            hasAnimated = true;
            statItems.forEach(stat => {
                const finalValue = stat.textContent;
                const isNumber = !isNaN(parseFloat(finalValue));

                if (isNumber) {
                    const targetValue = parseFloat(finalValue);
                    const duration = 2000; // 2 seconds
                    const increment = targetValue / (duration / 16);
                    let currentValue = 0;

                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= targetValue) {
                            stat.textContent = finalValue;
                            clearInterval(counter);
                        } else {
                            stat.textContent = currentValue.toFixed(2);
                        }
                    }, 16);
                }
            });
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats(); // Check on page load

    // ===============================================
    // Project Cards Hover Effect Enhancement
    // ===============================================
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // ===============================================
    // Skill Tags Interactive Effect
    // ===============================================
    const skillTags = document.querySelectorAll('.tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // ===============================================
    // Copy Email to Clipboard
    // ===============================================
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');

            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email copied to clipboard!');
                });
            }
        });
    });

    // ===============================================
    // Show Notification Helper
    // ===============================================
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #ff6b35, #f7931e);
            color: white;
            padding: 15px 25px;
            border-radius: 50px;
            box-shadow: 0 5px 20px rgba(255, 107, 53, 0.4);
            z-index: 10000;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            animation: slideInUp 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutDown 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // ===============================================
    // Back to Top Button (Optional)
    // ===============================================
    const createBackToTopButton = false; // Set to true to enable

    if (createBackToTopButton) {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.setAttribute('id', 'back-to-top');
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ff6b35, #f7931e);
            color: white;
            border: none;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 5px 20px rgba(255, 107, 53, 0.4);
            z-index: 1000;
            transition: all 0.3s ease;
        `;

        document.body.appendChild(backToTopBtn);

        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        backToTopBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        backToTopBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }

    // ===============================================
    // Add CSS Animation Keyframes Dynamically
    // ===============================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                transform: translateY(100px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        @keyframes slideOutDown {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ===============================================
    // Preload Images (Optional)
    // ===============================================
    function preloadImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
        });
    }

    preloadImages();

    // ===============================================
    // Console Welcome Message
    // ===============================================
    console.log('%c👋 Welcome to Muhammad Faizan Khan\'s Portfolio!',
        'font-size: 20px; font-weight: bold; color: #ff6b35;');
    console.log('%cInterested in the code? Check out my GitHub: https://github.com/faizankhan789',
        'font-size: 14px; color: #f7931e;');

    // ===============================================
    // Performance Optimization
    // ===============================================

    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll-heavy functions
    const debouncedScrollHandler = debounce(function() {
        updateActiveNavLink();
        animateStats();
    }, 10);

    window.addEventListener('scroll', debouncedScrollHandler);

    // ===============================================
    // Easter Egg - Konami Code
    // ===============================================
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join('') === konamiSequence.join('')) {
            showNotification('🎮 Konami Code Activated! You found the easter egg!');
            document.body.style.animation = 'rainbow 3s linear';
        }
    });

    // ===============================================
    // Initialize Everything
    // ===============================================
    console.log('✅ Portfolio JavaScript Initialized');
    updateActiveNavLink();
});

// ===============================================
// External Link Handler
// ===============================================
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.hostname !== window.location.hostname) {
        e.target.setAttribute('rel', 'noopener noreferrer');
    }
});

// ===============================================
// Service Worker Registration (Optional - for PWA)
// ===============================================
if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // window.addEventListener('load', function() {
    //     navigator.serviceWorker.register('/sw.js').then(
    //         function(registration) {
    //             console.log('ServiceWorker registration successful');
    //         },
    //         function(err) {
    //             console.log('ServiceWorker registration failed: ', err);
    //         }
    //     );
    // });
}

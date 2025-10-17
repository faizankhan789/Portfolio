// ===============================================
// Portfolio Interactive JavaScript
// ===============================================

// Smooth Scroll & Navigation
document.addEventListener('DOMContentLoaded', function() {

    // ===============================================
    // Animated Background with Particles
    // ===============================================
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 107, 53, 0.5)';
            ctx.fill();
        }
    }

    // Create particles
    const particlesArray = [];
    const numberOfParticles = 80;

    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }

    // Mouse interaction
    let mouse = {
        x: null,
        y: null,
        radius: 150
    };

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('mouseout', function() {
        mouse.x = null;
        mouse.y = null;
    });

    // Draw connections between particles
    function connectParticles() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = 1 - (distance / 120);
                    ctx.strokeStyle = `rgba(255, 107, 53, ${opacity * 0.3})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Connect particles to mouse
    function connectToMouse() {
        if (mouse.x && mouse.y) {
            for (let i = 0; i < particlesArray.length; i++) {
                const dx = mouse.x - particlesArray[i].x;
                const dy = mouse.y - particlesArray[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const opacity = 1 - (distance / mouse.radius);
                    ctx.strokeStyle = `rgba(247, 147, 30, ${opacity * 0.5})`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();

                    // Push particles away from mouse
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    particlesArray[i].x -= Math.cos(angle) * force * 2;
                    particlesArray[i].y -= Math.sin(angle) * force * 2;
                }
            }

            // Draw glow at mouse position
            const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
            gradient.addColorStop(0, 'rgba(255, 107, 53, 0.15)');
            gradient.addColorStop(1, 'rgba(255, 107, 53, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    // Animation loop
    function animateBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw and update particles
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }

        connectParticles();
        connectToMouse();

        requestAnimationFrame(animateBackground);
    }

    animateBackground();

    // ===============================================
    // Custom Cursor
    // ===============================================
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    const cursorBubble = document.createElement('div');
    cursor.classList.add('custom-cursor');
    cursorDot.classList.add('custom-cursor-dot');
    cursorBubble.classList.add('cursor-bubble');
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorBubble);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    let bubbleX = 0;
    let bubbleY = 0;

    // Track mouse position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows with delay
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;

        // Dot follows immediately
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;

        // Bubble follows with more delay (slower)
        bubbleX += (mouseX - bubbleX) * 0.08;
        bubbleY += (mouseY - bubbleY) * 0.08;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        cursorBubble.style.left = bubbleX + 'px';
        cursorBubble.style.top = bubbleY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .cert-card, .skill-category, .tag, .nav-link');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
            cursorDot.classList.add('hover');
            cursorBubble.classList.add('hover');
        });

        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
            cursorDot.classList.remove('hover');
            cursorBubble.classList.remove('hover');
        });
    });

    // Click effect
    document.addEventListener('mousedown', function() {
        cursor.classList.add('click');
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });

    document.addEventListener('mouseup', function() {
        cursor.classList.remove('click');
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
        cursorBubble.style.opacity = '0';
    });

    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
        cursorBubble.style.opacity = '0.8';
    });

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
    // Intersection Observer for Scroll Animations (Repeatable)
    // ===============================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create observer that does NOT unobserve (allows repeat animations)
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            } else {
                // Remove animation class when element leaves viewport
                entry.target.classList.remove('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections and their children for animation
    const animateElements = document.querySelectorAll(
        'section, .timeline-item, .project-card, .cert-card, .skill-category, .stat-item, .education-item, .contact-item, .about-text, .about-education, .section-title'
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

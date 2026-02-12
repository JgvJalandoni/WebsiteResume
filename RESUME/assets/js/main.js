// Main JavaScript for Interactive Resume
(function($) {
    "use strict";

    // Remove preload class
    window.addEventListener('load', function() {
        document.body.classList.remove('is-preload');
    });

    // Navigation
    const nav = document.getElementById('nav');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#nav a');

    // Show/hide navigation on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
        }

        // Active section highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });

        lastScroll = currentScroll;
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a.scrolly').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 60;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const fadeInElements = document.querySelectorAll('.fade-in');

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeInElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // Typewriter effect
    const fullText = 'Full Stack Developer • Cybersecurity Enthusiast • Administration Enthusiast';
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.querySelector('.typewriter .role');

    function typeWriter() {
        if (isDeleting) {
            typewriterElement.textContent = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = fullText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 30 : 80;

        if (!isDeleting && charIndex === fullText.length) {
            typeSpeed = 3000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            typeSpeed = 1000; // Pause before retyping
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start typewriter effect
    if (typewriterElement) {
        setTimeout(typeWriter, 1000);
    }

    // Parallax effect for background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const bg = document.getElementById('bg');
        if (bg) {
            bg.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
        }
    });

    // Skill cards animation on hover
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(10deg)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });

    // Project modals
    const modals = {
        'discord-bot': document.getElementById('modal-discord-bot'),
        'game-server': document.getElementById('modal-game-server'),
        'clinic-app': document.getElementById('modal-clinic-app')
    };

    // Open modal
    $('.view-details').on('click', function(e) {
        e.preventDefault();
        const projectId = $(this).data('project');
        console.log('Button clicked:', projectId);
        const modal = modals[projectId];

        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            // Animation
            setTimeout(() => {
                modal.querySelector('.modal-content').style.opacity = '1';
            }, 10);
        }
    });

    // Close modal
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            Object.values(modals).forEach(modal => {
                if (modal) {
                    modal.style.display = 'none';
                }
            });
            document.body.style.overflow = 'auto';
        }
    });

    // Animated counter for stats (if needed in future)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Particle effect for header (optional enhancement)
    function createParticles() {
        const header = document.getElementById('header');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${5 + Math.random() * 10}s infinite ease-in-out;
            `;
            header.appendChild(particle);
        }
    }

    // Add floating animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize particles
    createParticles();

    // Mouse trail effect (subtle)
    let mouseTrail = [];
    const maxTrailLength = 20;

    document.addEventListener('mousemove', function(e) {
        mouseTrail.push({ x: e.clientX, y: e.clientY });

        if (mouseTrail.length > maxTrailLength) {
            mouseTrail.shift();
        }
    });

    // Tilt effect for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Console Easter Egg
    console.log('%c👨‍💻 Jesbert V. Jalandoni', 'font-size: 20px; font-weight: bold; color: #667eea;');
    console.log('%cInterested in the code behind this site? Check it out on GitHub!', 'font-size: 14px; color: #999;');
    console.log('%chttps://github.com/JgvJalandoni', 'font-size: 12px; color: #667eea;');

    // Loading animation complete
    console.log('%c✓ Website loaded successfully', 'color: #00ff00; font-weight: bold;');

    // Performance monitoring
    window.addEventListener('load', function() {
        const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
        console.log(`%c⚡ Page loaded in ${loadTime}ms`, 'color: #667eea; font-weight: bold;');
    });

    // Add hover sound effect (optional - requires audio file)
    // Uncomment if you want to add sound effects
    /*
    const hoverSound = new Audio('assets/sounds/hover.mp3');
    document.querySelectorAll('button, .project-card, .skill-card').forEach(element => {
        element.addEventListener('mouseenter', function() {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    });
    */

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Press 'H' to go to top
        if (e.key === 'h' || e.key === 'H') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Press 'C' to scroll to contact
        if (e.key === 'c' || e.key === 'C') {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // Right-click protection (optional - uncomment if needed)
    /*
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        console.log('Right-click disabled. Use keyboard shortcuts instead!');
    });
    */

    // Service Worker for offline support (optional)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Uncomment when you create a service worker file
            // navigator.serviceWorker.register('/sw.js');
        });
    }

    // Smooth reveal for sections
    const revealSection = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

})(jQuery);

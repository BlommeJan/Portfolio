/**
 * Portfolio Website JavaScript
 * Professional, responsive portfolio with mobile navigation and accessibility
 */

class Portfolio {
    constructor() {
        this.currentSection = 'about';
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.handleInitialHash();
        this.preloadImages();
        this.setupSkillsToggle();
        this.setupAboutAnimations();
    }

    setupEventListeners() {
        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Mobile hamburger menu
        const hamburger = document.querySelector('.hamburger');
        const sidebar = document.querySelector('.sidebar');
        
        if (hamburger && sidebar) {
            hamburger.addEventListener('click', () => this.toggleMobileMenu());
            
            // Close menu when clicking outside on mobile
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 1024 && 
                    this.isMenuOpen && 
                    !sidebar.contains(e.target) && 
                    !hamburger.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }

        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));

        // Add click handlers for project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', () => this.handleProjectClick(card));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleProjectClick(card);
                }
            });
        });

        // Social links tracking (analytics)
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => this.trackSocialClick(e));
        });
    }

    handleNavigation(e) {
        e.preventDefault();
        
        const link = e.currentTarget;
        const targetSection = link.getAttribute('data-section');
        
        if (targetSection === this.currentSection) return;
        
        this.showSection(targetSection);
        this.updateActiveNavLink(link);
        this.updateURL(targetSection);
        this.announceNavigation(targetSection);
        
        // Close mobile menu if open
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        }
    }

    showSection(sectionId) {
        // Hide current section
        const currentSectionEl = document.getElementById(this.currentSection);
        if (currentSectionEl) {
            currentSectionEl.classList.remove('active');
        }

        // Show new section
        const newSectionEl = document.getElementById(sectionId);
        if (newSectionEl) {
            newSectionEl.classList.add('active');
            // Scroll to top of content
            document.querySelector('.main-content').scrollTop = 0;
        }

        this.currentSection = sectionId;
    }

    updateActiveNavLink(activeLink) {
        // Remove active state from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });

        // Add active state to clicked link
        activeLink.classList.add('active');
        activeLink.setAttribute('aria-current', 'page');
    }

    updateURL(sectionId) {
        // Update URL without triggering navigation
        const url = new URL(window.location);
        url.hash = sectionId;
        window.history.replaceState({}, '', url);
    }

    announceNavigation(sectionId) {
        const announcer = document.getElementById('announcer');
        const sectionTitle = document.querySelector(`#${sectionId} .section-title`)?.textContent;
        
        if (announcer && sectionTitle) {
            announcer.textContent = `Navigated to ${sectionTitle} section`;
        }
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        const hamburger = document.querySelector('.hamburger');
        const sidebar = document.querySelector('.sidebar');
        
        if (hamburger && sidebar) {
            hamburger.classList.toggle('active', this.isMenuOpen);
            hamburger.setAttribute('aria-expanded', this.isMenuOpen);
            sidebar.classList.toggle('open', this.isMenuOpen);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
        }
    }

    closeMobileMenu() {
        this.isMenuOpen = false;
        
        const hamburger = document.querySelector('.hamburger');
        const sidebar = document.querySelector('.sidebar');
        
        if (hamburger && sidebar) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            sidebar.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    handleResize() {
        // Close mobile menu on desktop
        if (window.innerWidth > 1024 && this.isMenuOpen) {
            this.closeMobileMenu();
        }
    }

    handleKeyboardNavigation(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && this.isMenuOpen) {
            this.closeMobileMenu();
        }

        // Tab key adds keyboard user class for focus styles
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-user');
        }
    }

    setupIntersectionObserver() {
        // Animate elements when they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe cards and timeline items
        const animateElements = document.querySelectorAll(
            '.card, .skill-card, .project-card, .timeline-item, .hero-intro-card, .language-item, .strength-item'
        );
        
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    handleInitialHash() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            const navLink = document.querySelector(`[data-section="${hash}"]`);
            if (navLink) {
                this.showSection(hash);
                this.updateActiveNavLink(navLink);
                this.currentSection = hash;
            }
        }
    }

    handleProjectClick(card) {
        // Add visual feedback
        card.classList.add('clicked');
        setTimeout(() => {
            card.classList.remove('clicked');
        }, 300);

        // Here you could add modal opening or navigation to project details
        // For now, just log the project
        const projectTitle = card.querySelector('.project-title')?.textContent;
        console.log(`Project clicked: ${projectTitle}`);
        
        // You could implement project detail modal here
        // this.openProjectModal(card);
    }

    trackSocialClick(e) {
        const platform = e.currentTarget.getAttribute('aria-label');
        console.log(`Social link clicked: ${platform}`);
        
        // Here you could add analytics tracking
        // gtag('event', 'social_click', { platform: platform });
    }

    preloadImages() {
        // Preload any critical images
        const imagesToPreload = [
            // Add any critical images here
        ];

        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Utility method for smooth scrolling
    smoothScrollTo(element, duration = 500) {
        const start = element.scrollTop;
        const target = 0;
        const change = target - start;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = this.easeInOutCubic(progress);
            
            element.scrollTop = start + (change * ease);
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    }

    // Easing function for smooth animations
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    setupSkillsToggle() {
        const toggleButtons = document.querySelectorAll('.skill-toggle');
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const card = button.closest('.skill-card');
                const moreSkills = card.querySelector('.more-skills');
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                
                if (isExpanded) {
                    // Collapse
                    moreSkills.classList.remove('visible');
                    button.setAttribute('aria-expanded', 'false');
                    button.innerHTML = 'Show more <i class="fas fa-chevron-down"></i>';
                } else {
                    // Expand
                    moreSkills.classList.add('visible');
                    button.setAttribute('aria-expanded', 'true');
                    button.innerHTML = 'Show less <i class="fas fa-chevron-up"></i>';
                }
            });
        });
    }

    setupAboutAnimations() {
        // Setup language progress bars
        this.setupLanguageProgress();
        
        // Setup enhanced intersection observer for about section
        this.setupAboutIntersectionObserver();
    }


    setupLanguageProgress() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const level = parseInt(bar.getAttribute('data-level'));
            bar.dataset.animated = 'false';
            
            // Store animation function for later use
            bar.animateProgress = () => {
                if (bar.dataset.animated === 'true') return;
                
                bar.dataset.animated = 'true';
                
                // Delay the animation slightly for staggered effect
                const delay = Array.from(progressBars).indexOf(bar) * 200;
                
                setTimeout(() => {
                    bar.style.width = level + '%';
                }, delay);
            };
        });
    }

    setupAboutIntersectionObserver() {
        const aboutObserverOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate language progress bars
                    if (entry.target.classList.contains('languages-card')) {
                        const progressBars = entry.target.querySelectorAll('.progress-bar');
                        progressBars.forEach(bar => {
                            if (bar.animateProgress) {
                                bar.animateProgress();
                            }
                        });
                    }
                    
                    // Add stagger animation for strength items
                    if (entry.target.classList.contains('strength-card')) {
                        const strengthItems = entry.target.querySelectorAll('.strength-item');
                        strengthItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('animate-in');
                            }, index * 100);
                        });
                    }
                    
                    // Add stagger animation for interest tags
                    if (entry.target.classList.contains('interests-card')) {
                        const interestTags = entry.target.querySelectorAll('.interest-tag');
                        interestTags.forEach((tag, index) => {
                            setTimeout(() => {
                                tag.classList.add('animate-in');
                            }, index * 50);
                        });
                    }
                }
            });
        }, aboutObserverOptions);

        // Observe about section specific elements
        const aboutElements = document.querySelectorAll(
            '.languages-card, .strength-card, .interests-card'
        );
        
        aboutElements.forEach(el => {
            aboutObserver.observe(el);
        });
    }

    // Enhanced method to handle section switching with animations
    showSection(sectionId) {
        // Hide current section
        const currentSectionEl = document.getElementById(this.currentSection);
        if (currentSectionEl) {
            currentSectionEl.classList.remove('active');
        }

        // Show new section
        const newSectionEl = document.getElementById(sectionId);
        if (newSectionEl) {
            newSectionEl.classList.add('active');
            // Scroll to top of content
            document.querySelector('.main-content').scrollTop = 0;
            
            // Trigger animations for About section when switching to it
            if (sectionId === 'about') {
                setTimeout(() => {
                    this.triggerAboutAnimations();
                }, 300); // Small delay to ensure section is visible
            }
        }

        this.currentSection = sectionId;
    }

    triggerAboutAnimations() {
        // Force trigger animations if user navigates directly to about section
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            if (bar.animateProgress && bar.dataset.animated === 'false') {
                bar.animateProgress();
            }
        });
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .card, .skill-card, .project-card, .timeline-item, .hero-intro-card, .language-item, .strength-item, .interest-tag {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .project-card.clicked {
        transform: scale(0.98);
        transition: transform 0.1s ease;
    }
    
    .keyboard-user *:focus {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
    }
    
    /* Initial state for progress bars */
    .progress-bar {
        width: 0 !important;
    }
    
    /* Stagger animations for strength items */
    .strength-item {
        transition-delay: calc(var(--index, 0) * 0.1s);
    }
    
    /* Stagger animations for interest tags */
    .interest-tag {
        transition-delay: calc(var(--index, 0) * 0.05s);
    }
    
    @media (prefers-reduced-motion: reduce) {
        .card, .skill-card, .project-card, .timeline-item, .hero-intro-card, .language-item, .strength-item, .interest-tag {
            opacity: 1;
            transform: none;
            transition: none;
        }
        
        .progress-bar {
            width: var(--target-width, 0%) !important;
            transition: none;
        }
    }
`;

document.head.appendChild(style); 

// Configuration
const CONFIG = {
    siteName: 'Henry Shields',
    currentYear: new Date().getFullYear(),
    navigation: [
        { name: 'About Me', href: 'index.html' },
        { name: 'Experience', href: 'experience.html' },
        { name: 'Projects', href: 'projects.html' },
        { name: 'Resume', href: 'resume.html' },
        { name: 'Contact', href: 'contact.html' }
    ],
    // EmailJS Configuration
    // Sign up at https://www.emailjs.com/ and replace these values
    emailJS: {
        publicKey: 'YOUR_PUBLIC_KEY',  // Get from EmailJS dashboard
        serviceID: 'YOUR_SERVICE_ID',  // Get from EmailJS dashboard
        templateID: 'YOUR_TEMPLATE_ID' // Get from EmailJS dashboard
    }
};

// Utility Functions
const Utils = {
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        return page === '' ? 'index.html' : page;
    },
    
    createElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'textContent') {
                element.textContent = value;
            } else {
                element.setAttribute(key, value);
            }
        });
        
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                element.appendChild(child);
            }
        });
        
        return element;
    }
};

// Component: Navigation
const Navigation = {
    render() {
        const currentPage = Utils.getCurrentPage();

        const nav = Utils.createElement('nav');
        const navContainer = Utils.createElement('div', { className: 'nav-container' });

        // Logo
        const logo = Utils.createElement('div', {
            className: 'logo',
            textContent: CONFIG.siteName
        });

        // Hamburger button
        const hamburger = Utils.createElement('button', { className: 'hamburger', 'aria-label': 'Toggle navigation' });
        for (let i = 0; i < 3; i++) {
            hamburger.appendChild(Utils.createElement('span'));
        }

        // Navigation Menu
        const navMenu = Utils.createElement('ul', { className: 'nav-menu' });

        CONFIG.navigation.forEach(item => {
            const li = Utils.createElement('li');
            const a = Utils.createElement('a', {
                href: item.href,
                textContent: item.name,
                className: item.href === currentPage ? 'active' : ''
            });
            li.appendChild(a);
            navMenu.appendChild(li);
        });

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        navContainer.appendChild(logo);
        navContainer.appendChild(hamburger);
        navContainer.appendChild(navMenu);
        nav.appendChild(navContainer);

        return nav;
    },
    
    mount(selector = '#nav-placeholder') {
        const placeholder = document.querySelector(selector);
        if (placeholder) {
            const header = Utils.createElement('header');
            header.appendChild(this.render());
            placeholder.replaceWith(header);
            // Progress bar (GSAP animates scaleX via ScrollTrigger)
            document.body.appendChild(Utils.createElement('div', { className: 'progress-bar' }));
        }
    }
};

// Component: Footer
const Footer = {
    render() {
        const footer = Utils.createElement('footer');

        const inner = Utils.createElement('div', { className: 'footer-inner' });

        const links = Utils.createElement('div', { className: 'footer-links' });

        const githubLink = Utils.createElement('a', {
            href: 'https://github.com/henryoshi',
            target: '_blank',
            'aria-label': 'GitHub'
        });
        githubLink.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>GitHub`;

        const linkedinLink = Utils.createElement('a', {
            href: 'https://www.linkedin.com/in/henryshields/',
            target: '_blank',
            'aria-label': 'LinkedIn'
        });
        linkedinLink.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>LinkedIn`;

        const emailLink = Utils.createElement('a', {
            href: 'mailto:shieldshenry28@gmail.com',
            'aria-label': 'Email'
        });
        emailLink.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>Email`;

        links.appendChild(githubLink);
        links.appendChild(linkedinLink);
        links.appendChild(emailLink);

        const copy = Utils.createElement('p', {
            textContent: `© ${CONFIG.currentYear} ${CONFIG.siteName}. All rights reserved.`
        });

        inner.appendChild(links);
        inner.appendChild(copy);
        footer.appendChild(inner);
        return footer;
    },
    
    mount(selector = '#footer-placeholder') {
        const placeholder = document.querySelector(selector);
        if (placeholder) {
            placeholder.replaceWith(this.render());
        }
    }
};

// Feature: Smooth Scrolling
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
};

// Feature: Form Validation and Handling
const FormHandler = {
    emailJSInitialized: false,
    
    init() {
        const contactForm = document.querySelector('.contact-form form');
        if (!contactForm) return;
        
        // Initialize EmailJS
        this.initEmailJS();
        
        contactForm.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
        });
    },
    
    initEmailJS() {
        if (typeof emailjs === 'undefined') {
            console.warn('EmailJS library not loaded. Email functionality will not work.');
            return;
        }
        
        // Check if credentials are configured
        if (CONFIG.emailJS.publicKey === 'YOUR_PUBLIC_KEY') {
            console.warn('EmailJS not configured. Please update CONFIG.emailJS in main.js');
            return;
        }
        
        emailjs.init(CONFIG.emailJS.publicKey);
        this.emailJSInitialized = true;
        console.log('EmailJS initialized successfully');
    },
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        this.showFieldError(field, isValid, errorMessage);
        return isValid;
    },
    
    showFieldError(field, isValid, message) {
        // Remove existing error
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        if (!isValid) {
            field.classList.add('error');
            const errorDiv = Utils.createElement('div', {
                className: 'error-message',
                textContent: message
            });
            field.parentElement.appendChild(errorDiv);
        } else {
            field.classList.remove('error');
        }
    },
    
    handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const inputs = form.querySelectorAll('input, textarea');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            // Disable submit button to prevent double submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            if (this.emailJSInitialized) {
                // Send email using EmailJS
                this.sendEmailJS(form, submitBtn, originalBtnText);
            } else {
                // Fallback: just show the data (for testing without EmailJS setup)
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                console.log('Form data (EmailJS not configured):', data);
                
                this.showMessage(form, 'EmailJS not configured. Check console for form data.', 'warning');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        }
    },
    
    sendEmailJS(form, submitBtn, originalBtnText) {
        // Get form data
        const formData = new FormData(form);
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            message: formData.get('message'),
            to_name: 'Henry Shields' // Your name
        };
        
        emailjs.send(
            CONFIG.emailJS.serviceID,
            CONFIG.emailJS.templateID,
            templateParams
        )
        .then((response) => {
            console.log('Email sent successfully!', response.status, response.text);
            this.showMessage(form, 'Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
        })
        .catch((error) => {
            console.error('Failed to send email:', error);
            this.showMessage(form, 'Failed to send message. Please try again or email me directly.', 'error');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        });
    },
    
    showMessage(form, text, type = 'success') {
        // Remove existing messages
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();
        
        const messageDiv = Utils.createElement('div', {
            className: `form-message ${type}-message`,
            textContent: text
        });
        
        form.insertBefore(messageDiv, form.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => messageDiv.remove(), 5000);
    }
};

// Feature: Project Gallery Slideshow
const ProjectGallery = {
    galleries: [],
    autoPlayInterval: 4000, // 4 seconds
    
    init() {
        const galleryElements = document.querySelectorAll('.project-gallery');
        if (!galleryElements.length) return;
        
        galleryElements.forEach((gallery, index) => {
            this.initGallery(gallery, index);
        });
        
        this.createLightbox();
    },
    
    initGallery(galleryElement, index) {
        const images = galleryElement.querySelectorAll('.gallery-image');
        const dotsContainer = galleryElement.querySelector('.gallery-dots');
        const prevBtn = galleryElement.querySelector('.gallery-prev');
        const nextBtn = galleryElement.querySelector('.gallery-next');
        const container = galleryElement.querySelector('.gallery-container');
        
        if (images.length === 0) return;
        
        const galleryData = {
            element: galleryElement,
            images: images,
            currentIndex: 0,
            autoPlayTimer: null
        };
        
        this.galleries.push(galleryData);
        
        // Create dots
        images.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => this.goToSlide(index, i));
            dotsContainer.appendChild(dot);
        });
        
        // Navigation buttons
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.prevSlide(index);
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.nextSlide(index);
        });
        
        // Click to open lightbox
        container.addEventListener('click', () => {
            this.openLightbox(index);
        });
        
        // Start autoplay
        this.startAutoPlay(index);
        
        // Pause on hover
        container.addEventListener('mouseenter', () => this.stopAutoPlay(index));
        container.addEventListener('mouseleave', () => this.startAutoPlay(index));
    },
    
    goToSlide(galleryIndex, slideIndex) {
        const gallery = this.galleries[galleryIndex];
        
        gallery.images[gallery.currentIndex].classList.remove('active');
        const dots = gallery.element.querySelectorAll('.gallery-dot');
        dots[gallery.currentIndex].classList.remove('active');
        
        gallery.currentIndex = slideIndex;
        
        gallery.images[gallery.currentIndex].classList.add('active');
        dots[gallery.currentIndex].classList.add('active');
    },
    
    nextSlide(galleryIndex) {
        const gallery = this.galleries[galleryIndex];
        const nextIndex = (gallery.currentIndex + 1) % gallery.images.length;
        this.goToSlide(galleryIndex, nextIndex);
    },
    
    prevSlide(galleryIndex) {
        const gallery = this.galleries[galleryIndex];
        const prevIndex = (gallery.currentIndex - 1 + gallery.images.length) % gallery.images.length;
        this.goToSlide(galleryIndex, prevIndex);
    },
    
    startAutoPlay(galleryIndex) {
        const gallery = this.galleries[galleryIndex];
        this.stopAutoPlay(galleryIndex);
        gallery.autoPlayTimer = setInterval(() => {
            this.nextSlide(galleryIndex);
        }, this.autoPlayInterval);
    },
    
    stopAutoPlay(galleryIndex) {
        const gallery = this.galleries[galleryIndex];
        if (gallery.autoPlayTimer) {
            clearInterval(gallery.autoPlayTimer);
            gallery.autoPlayTimer = null;
        }
    },
    
    createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.id = 'gallery-lightbox';
        
        lightbox.innerHTML = `
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">&lt;</button>
            <button class="lightbox-next">&gt;</button>
            <div class="lightbox-content">
                <img src="" alt="" class="lightbox-image">
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) this.closeLightbox();
        });
        
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') this.lightboxPrev();
            if (e.key === 'ArrowRight') this.lightboxNext();
        });
        
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.lightboxPrev());
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.lightboxNext());
    },
    
    openLightbox(galleryIndex) {
        this.currentLightboxGallery = galleryIndex;
        const gallery = this.galleries[galleryIndex];
        const lightbox = document.getElementById('gallery-lightbox');
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        
        const currentImage = gallery.images[gallery.currentIndex];
        lightboxImage.src = currentImage.src;
        lightboxImage.alt = currentImage.alt;
        
        lightbox.classList.add('active');
        this.stopAutoPlay(galleryIndex);
    },
    
    closeLightbox() {
        const lightbox = document.getElementById('gallery-lightbox');
        lightbox.classList.remove('active');
        if (this.currentLightboxGallery !== undefined) {
            this.startAutoPlay(this.currentLightboxGallery);
        }
    },
    
    lightboxNext() {
        if (this.currentLightboxGallery === undefined) return;
        this.nextSlide(this.currentLightboxGallery);
        const gallery = this.galleries[this.currentLightboxGallery];
        const lightboxImage = document.querySelector('.lightbox-image');
        const currentImage = gallery.images[gallery.currentIndex];
        lightboxImage.src = currentImage.src;
        lightboxImage.alt = currentImage.alt;
    },
    
    lightboxPrev() {
        if (this.currentLightboxGallery === undefined) return;
        this.prevSlide(this.currentLightboxGallery);
        const gallery = this.galleries[this.currentLightboxGallery];
        const lightboxImage = document.querySelector('.lightbox-image');
        const currentImage = gallery.images[gallery.currentIndex];
        lightboxImage.src = currentImage.src;
        lightboxImage.alt = currentImage.alt;
    }
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Navigation.mount();
    Footer.mount();
    SmoothScroll.init();
    FormHandler.init();
    ProjectGallery.init();
});

// Export for potential use in other scripts
window.PortfolioApp = {
    CONFIG,
    Utils,
    Navigation,
    Footer,
    FormHandler
};

// GSAP Animations for Portfolio Website
// Requires GSAP + ScrollTrigger (loaded via CDN in HTML)

document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded.');
        return;
    }

    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Wait for the dynamically-injected header before animating it
    const header = document.querySelector('header');
    if (header) {
        initAnimations();
    } else {
        const observer = new MutationObserver(() => {
            if (document.querySelector('header')) {
                observer.disconnect();
                initAnimations();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
});

function initAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    animateNavigation();
    animateHeroSection();
    animateProjects();
    animateContactForm();
    animateResume();
    addHoverEffects();
}

// ── Navigation ────────────────────────────────────────────────────────────────

function animateNavigation() {
    const header = document.querySelector('header');
    if (!header) return;

    gsap.from(header, {
        y: -80,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all'
    });
}

// ── Hero Section ──────────────────────────────────────────────────────────────

function animateHeroSection() {
    const h1    = document.querySelector('.hero h1');
    const intro = document.querySelector('.hero .intro');
    const contentPs = document.querySelectorAll('.hero .content p');
    const profileImg = document.querySelector('.profile-image');

    if (!h1) return;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out', clearProps: 'all' } });

    tl.from(h1, { y: 30, opacity: 0, duration: 0.5 });

    if (intro) {
        tl.from(intro, { y: 20, opacity: 0, duration: 0.45 }, '-=0.25');
    }

    if (contentPs.length > 0) {
        tl.from(contentPs, { y: 20, opacity: 0, duration: 0.4, stagger: 0.12 }, '-=0.2');
    }

    if (profileImg) {
        tl.from(profileImg, { x: 40, opacity: 0, duration: 0.55 }, '-=0.5');
    }
}

// ── Projects (scroll-triggered) ───────────────────────────────────────────────

function animateProjects() {
    const projects = document.querySelectorAll('.project-horizontal');
    if (!projects.length) return;

    projects.forEach((project) => {
        const isReverse = project.classList.contains('reverse');
        const fromX = isReverse ? 60 : -60;

        gsap.from(project, {
            scrollTrigger: {
                trigger: project,
                start: 'top 82%',
                toggleActions: 'play none none none'
            },
            x: fromX,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'x,opacity'
        });

        const gallery = project.querySelector('.project-gallery');
        if (gallery) {
            gsap.from(gallery, {
                scrollTrigger: {
                    trigger: project,
                    start: 'top 78%',
                    toggleActions: 'play none none none'
                },
                scale: 0.92,
                opacity: 0,
                duration: 0.5,
                delay: 0.1,
                ease: 'power2.out',
                clearProps: 'scale,opacity'
            });
        }
    });
}

// ── Contact Form (scroll-triggered) ──────────────────────────────────────────

function animateContactForm() {
    if (!document.querySelector('.contact-info')) return;

    gsap.from('.contact-info p', {
        scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: -40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all'
    });

    if (document.querySelector('.contact-form')) {
        gsap.from('.form-group', {
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 25,
            opacity: 0,
            duration: 0.5,
            stagger: 0.12,
            ease: 'power2.out',
            clearProps: 'all'
        });
    }
}

// ── Resume (scroll-triggered) ─────────────────────────────────────────────────

function animateResume() {
    const resumeItems = document.querySelectorAll('.resume-item');

    resumeItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'all'
        });
    });

    const skillTags = document.querySelectorAll('.skill-tag');
    if (skillTags.length > 0) {
        gsap.from(skillTags, {
            scrollTrigger: {
                trigger: '.skills-tags',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            scale: 0,
            opacity: 0,
            duration: 0.35,
            stagger: 0.04,
            ease: 'back.out(1.7)',
            clearProps: 'all'
        });
    }
}

// ── Hover Effects ─────────────────────────────────────────────────────────────

function addHoverEffects() {
    document.querySelectorAll('.project-horizontal').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.15)', duration: 0.25, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, boxShadow: '0 2px 4px rgba(0,0,0,0.06)', duration: 0.25, ease: 'power2.out' });
        });
    });

    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, { scale: 1.04, duration: 0.18, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { scale: 1, duration: 0.18, ease: 'power2.out' });
        });
    });
}

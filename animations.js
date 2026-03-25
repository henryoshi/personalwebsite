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

    // Wait for dynamically-injected header
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

    initPageEntrance();
    initProgressBar();
    initHeaderScroll();
    animateNavigation();
    animateHeroSection();
    animateProjects();
    animateSkillTags();
    animateContactForm();
    animateResume();
    addHoverEffects();
}

// ── Page Entrance ─────────────────────────────────────────────────────────────

function initPageEntrance() {
    gsap.from('main', {
        opacity: 0,
        duration: 0.45,
        ease: 'power2.out',
        clearProps: 'opacity'
    });
}

// ── Scroll Progress Bar ───────────────────────────────────────────────────────

function initProgressBar() {
    const bar = document.querySelector('.progress-bar');
    if (!bar) return;
    gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0
        }
    });
}

// ── Header Scroll Shadow ──────────────────────────────────────────────────────

function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    ScrollTrigger.create({
        start: 'top -5',
        onEnter: () => header.classList.add('scrolled'),
        onLeaveBack: () => header.classList.remove('scrolled')
    });
}

// ── Navigation ────────────────────────────────────────────────────────────────

function animateNavigation() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-menu a');
    if (!header) return;

    const tl = gsap.timeline();

    tl.from(header, {
        y: -70,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'all'
    });

    if (navLinks.length) {
        tl.from(navLinks, {
            opacity: 0,
            y: -8,
            duration: 0.3,
            stagger: 0.06,
            ease: 'power2.out',
            clearProps: 'all'
        }, '-=0.2');
    }
}

// ── Hero Section ──────────────────────────────────────────────────────────────

function animateHeroSection() {
    const h1        = document.querySelector('.hero h1');
    const intro     = document.querySelector('.hero .intro');
    const contentPs = document.querySelectorAll('.hero .content p');
    const profileImg = document.querySelector('.profile-image');

    if (!h1) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Clip-path reveal: text slides up from behind a bottom mask
    tl.fromTo(h1,
        { clipPath: 'inset(0 0 100% 0)', y: 16 },
        { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.65, clearProps: 'all' }
    );

    if (intro) {
        tl.fromTo(intro,
            { clipPath: 'inset(0 0 100% 0)', y: 12 },
            { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.55, clearProps: 'all' },
            '-=0.35'
        );
    }

    if (contentPs.length) {
        tl.from(contentPs, {
            opacity: 0,
            y: 18,
            duration: 0.45,
            stagger: 0.1,
            clearProps: 'all'
        }, '-=0.25');
    }

    if (profileImg) {
        // Slide in from right
        tl.fromTo(profileImg,
            { x: 40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.55, ease: 'power2.out', clearProps: 'x,opacity' },
            '-=0.5'
        );
        // Border draw: animate border-color from transparent → accent
        tl.to(profileImg, {
            borderColor: '#DC143C',
            duration: 0.8,
            ease: 'power2.inOut'
        }, '-=0.1');
    }
}

// ── Projects & Experience Cards ───────────────────────────────────────────────

function animateProjects() {
    const projects = document.querySelectorAll('.project-horizontal');
    if (!projects.length) return;

    projects.forEach(project => {
        const isReverse   = project.classList.contains('reverse');
        const fromX       = isReverse ? 55 : -55;
        const h3          = project.querySelector('h3');
        const meta        = project.querySelector('.experience-meta');
        const gallery     = project.querySelector('.project-gallery');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: project,
                start: 'top 82%',
                toggleActions: 'play none none none'
            }
        });

        // Card slides in
        tl.fromTo(project,
            { x: fromX, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out', clearProps: 'x,opacity' }
        );

        // H3 clip-path reveal
        if (h3) {
            tl.fromTo(h3,
                { clipPath: 'inset(0 0 100% 0)' },
                { clipPath: 'inset(0 0 0% 0)', duration: 0.4, ease: 'power3.out', clearProps: 'clipPath' },
                '-=0.35'
            );
        }

        // Experience meta subtitle
        if (meta) {
            tl.from(meta, {
                opacity: 0,
                x: -10,
                duration: 0.3,
                ease: 'power2.out',
                clearProps: 'all'
            }, '-=0.2');
        }

        // Gallery scale in
        if (gallery) {
            tl.fromTo(gallery,
                { scale: 0.93, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)', clearProps: 'all' },
                '-=0.45'
            );
        }
    });
}

// ── Skill Tags Cascade (all pages) ───────────────────────────────────────────

function animateSkillTags() {
    document.querySelectorAll('.skills-tags').forEach(container => {
        const tags = container.querySelectorAll('.skill-tag');
        if (!tags.length) return;

        gsap.from(tags, {
            scrollTrigger: {
                trigger: container,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            scale: 0.65,
            opacity: 0,
            duration: 0.28,
            stagger: 0.035,
            ease: 'back.out(2)',
            clearProps: 'all'
        });
    });
}

// ── Contact Form ──────────────────────────────────────────────────────────────

function animateContactForm() {
    const contactContent = document.querySelector('.contact-content');
    if (!contactContent) return;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: contactContent,
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    const infoH2 = contactContent.querySelector('.contact-info h2');
    if (infoH2) {
        tl.fromTo(infoH2,
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0% 0)', duration: 0.4, ease: 'power3.out', clearProps: 'clipPath' }
        );
    }

    tl.from('.contact-info p', {
        opacity: 0,
        x: -25,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'all'
    }, '-=0.2');

    const formH2 = contactContent.querySelector('.contact-form h2');
    if (formH2) {
        tl.fromTo(formH2,
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0% 0)', duration: 0.4, ease: 'power3.out', clearProps: 'clipPath' },
            '-=0.3'
        );
    }

    tl.from('.form-group', {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all'
    }, '-=0.2');
}

// ── Resume ────────────────────────────────────────────────────────────────────

function animateResume() {
    const actions = document.querySelector('.resume-actions');
    if (actions) {
        gsap.from(actions.querySelectorAll('.btn'), {
            scrollTrigger: { trigger: actions, start: 'top 88%' },
            opacity: 0,
            y: 15,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out',
            clearProps: 'all'
        });
    }

    const viewer = document.querySelector('.resume-viewer');
    if (viewer) {
        gsap.fromTo(viewer,
            { opacity: 0, y: 20 },
            {
                opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'all',
                scrollTrigger: { trigger: viewer, start: 'top 85%' }
            }
        );
    }

    // Poster viewer on experience page
    const poster = document.querySelector('.poster-viewer');
    if (poster) {
        gsap.fromTo(poster,
            { opacity: 0, y: 20 },
            {
                opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'all',
                scrollTrigger: { trigger: poster, start: 'top 88%' }
            }
        );
    }
}

// ── Hover Effects ─────────────────────────────────────────────────────────────

function addHoverEffects() {
    // Project / experience cards
    document.querySelectorAll('.project-horizontal').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -5, boxShadow: '0 16px 40px rgba(0,0,0,0.13)', duration: 0.25, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, boxShadow: 'none', duration: 0.25, ease: 'power2.out' });
        });
    });

    // Primary buttons
    document.querySelectorAll('.btn:not([disabled])').forEach(btn => {
        btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.05, duration: 0.18, ease: 'power2.out' }));
        btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1,    duration: 0.18, ease: 'power2.out' }));
    });

    // Outline buttons
    document.querySelectorAll('.btn-outline').forEach(btn => {
        btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.04, duration: 0.18, ease: 'power2.out' }));
        btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1,    duration: 0.18, ease: 'power2.out' }));
    });

    // Skill tags — subtle lift
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => gsap.to(tag, { y: -3, duration: 0.15, ease: 'power2.out' }));
        tag.addEventListener('mouseleave', () => gsap.to(tag, { y: 0,  duration: 0.15, ease: 'power2.out' }));
    });

    // Skills category boxes
    document.querySelectorAll('.skills-category').forEach(cat => {
        cat.addEventListener('mouseenter', () => {
            gsap.to(cat, { y: -3, boxShadow: '0 8px 20px rgba(139,0,0,0.1)', duration: 0.2, ease: 'power2.out' });
        });
        cat.addEventListener('mouseleave', () => {
            gsap.to(cat, { y: 0, boxShadow: 'none', duration: 0.2, ease: 'power2.out' });
        });
    });

    // Nav links — very subtle scale
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('mouseenter', () => gsap.to(link, { scale: 1.06, duration: 0.15, ease: 'power2.out' }));
        link.addEventListener('mouseleave', () => gsap.to(link, { scale: 1,    duration: 0.15, ease: 'power2.out' }));
    });
}

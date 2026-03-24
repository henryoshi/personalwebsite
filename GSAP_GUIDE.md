# GSAP Animation Guide

GSAP (GreenSock Animation Platform) is the industry-standard JavaScript animation library used by companies like Google, Adobe, and NASA. It's incredibly powerful and performs better than CSS animations.

## Why GSAP?

- **Performance**: Hardware-accelerated, 20x faster than jQuery
- **Cross-browser**: Works perfectly everywhere, even IE
- **Easy to use**: Intuitive API with powerful controls
- **Rich ecosystem**: ScrollTrigger, Draggable, MorphSVG plugins
- **Timeline control**: Sequence animations with precision

## Installation

### Option 1: CDN (Easiest - Already added to your site!)

Add to your HTML `<head>`:

```html
<!-- GSAP Core -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>

<!-- GSAP ScrollTrigger Plugin (for scroll animations) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
```

### Option 2: NPM (for build tools)

```bash
npm install gsap
```

## Basic Usage Examples

### 1. Simple Fade In

```javascript
// Fade in an element
gsap.from('.project-card', {
    opacity: 0,
    y: 50,
    duration: 1
});
```

### 2. Stagger Animation (Animate multiple elements in sequence)

```javascript
// Animate project cards one after another
gsap.from('.project-horizontal', {
    opacity: 0,
    y: 100,
    duration: 1,
    stagger: 0.3  // 0.3s delay between each
});
```

### 3. Scroll Triggered Animations

```javascript
gsap.registerPlugin(ScrollTrigger);

gsap.from('.project-horizontal', {
    scrollTrigger: {
        trigger: '.project-horizontal',
        start: 'top 80%',  // When top of element hits 80% of viewport
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: -100,
    duration: 1
});
```

### 4. Timeline (Sequence multiple animations)

```javascript
const tl = gsap.timeline();

tl.from('h1', { opacity: 0, y: -50, duration: 0.8 })
  .from('.intro', { opacity: 0, duration: 0.5 }, '-=0.3')  // Start 0.3s before previous ends
  .from('.project-card', { opacity: 0, y: 50, stagger: 0.2 });
```

## Animations I've Already Implemented for Your Site

I've created a powerful animation system in a new file `animations.js` with:

### 1. **Page Load Animations**
- Hero section fades and slides up
- Staggered content reveal

### 2. **Scroll-Triggered Animations**
- Projects slide in from alternating sides
- Contact form elements animate on scroll
- Resume sections reveal progressively

### 3. **Hover Effects**
- Smooth project card elevation
- Gallery image zoom
- Button scale effects

### 4. **Navigation Animation**
- Smooth slide-down on page load
- Active link morphs

## Common Animation Properties

```javascript
gsap.to(element, {
    // Position
    x: 100,              // Move right 100px
    y: -50,              // Move up 50px
    
    // Appearance
    opacity: 0,          // Fade out
    scale: 1.2,          // Scale to 120%
    rotation: 45,        // Rotate 45 degrees
    
    // Timing
    duration: 1,         // 1 second
    delay: 0.5,          // Wait 0.5s before starting
    ease: 'power2.out',  // Easing function
    
    // Callbacks
    onComplete: () => console.log('Done!')
});
```

## Popular Easing Functions

- `'power1.out'` - Gentle deceleration
- `'power2.inOut'` - Smooth acceleration and deceleration
- `'elastic.out'` - Bouncy effect
- `'back.out'` - Slight overshoot then settle
- `'bounce.out'` - Bouncing effect

## ScrollTrigger Advanced Options

```javascript
ScrollTrigger.create({
    trigger: '.section',
    start: 'top 75%',     // When top of trigger hits 75% of viewport
    end: 'bottom 25%',    // When bottom hits 25%
    scrub: true,          // Smooth scrubbing (tied to scrollbar)
    pin: true,            // Pin element during scroll
    markers: true,        // Show debug markers (remove in production)
    onEnter: () => {},    // Callback when entering
    onLeave: () => {},    // Callback when leaving
});
```

## Example: Parallax Scrolling

```javascript
gsap.to('.background-image', {
    y: '50%',
    ease: 'none',
    scrollTrigger: {
        trigger: '.section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});
```

## Performance Tips

1. **Use transforms** (`x`, `y`, `scale`, `rotation`) instead of CSS properties - they're GPU accelerated
2. **Avoid animating** `width`, `height`, `top`, `left` - use transforms instead
3. **Kill animations** when not needed: `gsap.killTweensOf(element)`
4. **Use `will-change`** CSS for complex animations

## Resources

- **Official Docs**: https://greensock.com/docs/
- **Cheat Sheet**: https://greensock.com/cheatsheet/
- **Ease Visualizer**: https://greensock.com/ease-visualizer/
- **ScrollTrigger Demos**: https://greensock.com/st-demos/
- **CodePen Examples**: https://codepen.io/GreenSock/

## Quick Start for Your Site

Just include these files in your HTML:

```html
<head>
    <!-- ... other head content ... -->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
</head>
<body>
    <!-- ... your content ... -->
    
    <script src="main.js"></script>
    <script src="animations.js"></script>  <!-- Load after main.js -->
</body>
```

The animations are already set up and will work immediately once you add the GSAP scripts!

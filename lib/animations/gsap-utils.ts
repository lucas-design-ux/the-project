import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Fade in animation with upward motion
 * Perfect for content reveals on scroll
 */
export function fadeInUp(element: HTMLElement | string, options: gsap.TweenVars = {}) {
    return gsap.fromTo(
        element,
        {
            opacity: 0,
            y: 30,
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            ...options,
        }
    );
}

/**
 * Stagger animation for lists and grids
 * Animates children sequentially with delay
 */
export function staggerFadeIn(container: HTMLElement | string, options: gsap.TweenVars = {}) {
    const children = typeof container === 'string'
        ? document.querySelectorAll(`${container} > *`)
        : container.children;

    return gsap.fromTo(
        children,
        {
            opacity: 0,
            y: 20,
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            ...options,
        }
    );
}

/**
 * Scroll-triggered fade in
 * Element fades in when it enters viewport
 */
export function scrollFadeIn(
    element: HTMLElement | string,
    options: ScrollTrigger.Vars & gsap.TweenVars = {}
) {
    const { scrollOptions, ...tweenOptions } = options as any;

    return gsap.fromTo(
        element,
        {
            opacity: 0,
            y: 40,
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
                ...scrollOptions,
            },
            ...tweenOptions,
        }
    );
}

/**
 * Button hover lift effect
 * Adds smooth scale and shadow on hover
 */
export function buttonHoverEffect(button: HTMLElement) {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            y: -2,
            duration: 0.2,
            ease: 'power1.out',
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            y: 0,
            duration: 0.2,
            ease: 'power1.in',
        });
    });
}

/**
 * Image hover zoom effect
 * Slightly scales image on parent hover
 */
export function imageHoverZoom(
    containerSelector: string,
    imageSelector: string = 'img'
) {
    const containers = document.querySelectorAll(containerSelector);

    containers.forEach((container) => {
        const image = container.querySelector(imageSelector);
        if (!image) return;

        container.addEventListener('mouseenter', () => {
            gsap.to(image, {
                scale: 1.05,
                duration: 0.6,
                ease: 'power2.out',
            });
        });

        container.addEventListener('mouseleave', () => {
            gsap.to(image, {
                scale: 1,
                duration: 0.6,
                ease: 'power2.out',
            });
        });
    });
}

/**
 * Page transition animation
 * Smooth fade on route change
 */
export function pageTransition(element: HTMLElement | string) {
    const timeline = gsap.timeline();

    timeline
        .fromTo(
            element,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );

    return timeline;
}

/**
 * Utility to check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Safe animation wrapper that respects reduced motion
 */
export function safeAnimate(
    animationFn: () => void,
    reducedMotionFallback?: () => void
) {
    if (prefersReducedMotion()) {
        reducedMotionFallback?.();
    } else {
        animationFn();
    }
}

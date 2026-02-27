'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

type UseGSAPCallback = (context: gsap.Context) => void | (() => void);

interface UseGSAPOptions {
    dependencies?: React.DependencyList;
    scope?: React.RefObject<HTMLElement>;
    revertOnUpdate?: boolean;
}

/**
 * Custom hook for GSAP animations with automatic cleanup
 * Wraps animations in gsap.context() for proper scoping and cleanup
 * 
 * @param callback - Function containing GSAP animations
 * @param options - Configuration options
 * @returns ref to the scope element
 */
export function useGSAP(
    callback: UseGSAPCallback,
    options: UseGSAPOptions = {}
) {
    const { dependencies = [], scope, revertOnUpdate = true } = options;
    const contextRef = useRef<gsap.Context | null>(null);
    const scopeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = scope?.current || scopeRef.current;

        if (!element) return;

        // Create GSAP context for automatic cleanup
        contextRef.current = gsap.context(() => {
            callback(contextRef.current!);
        }, element);

        // Cleanup function
        return () => {
            if (contextRef.current) {
                contextRef.current.revert();
                contextRef.current = null;
            }
        };
    }, dependencies);

    return scopeRef;
}

/**
 * Hook for scroll-triggered animations
 * Automatically handles ScrollTrigger refresh and cleanup
 */
export function useScrollTrigger(
    callback: UseGSAPCallback,
    dependencies: React.DependencyList = []
) {
    const { ScrollTrigger } = require('gsap/ScrollTrigger');

    useEffect(() => {
        if (typeof window === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(callback);

        // Refresh ScrollTrigger after layout changes
        ScrollTrigger.refresh();

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
        };
    }, dependencies);
}

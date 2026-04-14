"use client";

import { useState, useCallback, useEffect, useRef } from "react";

const SESSION_KEY = "wl_tool_drawer_shown";

/**
 * Hook to manage the Tool Discovery Drawer lifecycle.
 *
 * - `triggerDrawer()` — call after a calculator renders its results.
 *   Opens the drawer after a 1.5 s delay, unless it was already shown
 *   during this browser session.
 * - `isOpen` / `closeDrawer()` — control visibility.
 */
export function useToolDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const alreadyShown = useCallback(() => {
        if (typeof window === "undefined") return true;
        return sessionStorage.getItem(SESSION_KEY) === "1";
    }, []);

    const triggerDrawer = useCallback(() => {
        if (alreadyShown()) return;

        // Avoid stacking multiple timers
        if (timerRef.current) return;

        timerRef.current = setTimeout(() => {
            if (!alreadyShown()) {
                setIsOpen(true);
                sessionStorage.setItem(SESSION_KEY, "1");
            }
            timerRef.current = null;
        }, 1500);
    }, [alreadyShown]);

    const closeDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    // Clean up timer on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    return { isOpen, triggerDrawer, closeDrawer };
}

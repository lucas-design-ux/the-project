"use client";

import { useEffect, useState, useRef } from "react";
import { Bell, X } from "lucide-react";

const DISMISSED_KEY = "wl_push_dismissed";

/**
 * Non-intrusive bottom banner that appears when the user scrolls
 * past 85% of the article.
 *
 * - "Notify Me" → triggers OneSignal opt-in (if SDK is loaded)
 * - "No thanks" → dismisses permanently via localStorage
 * - Never shows again if user previously declined
 * - Respects mobile: doesn't fire if already dismissed
 */
export default function PushNotificationBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasPassedThreshold, setHasPassedThreshold] = useState(false);
    const bannerRef = useRef<HTMLDivElement>(null);

    // Check if user already dismissed
    const isDismissed = () => {
        if (typeof window === "undefined") return true;
        return localStorage.getItem(DISMISSED_KEY) === "1";
    };

    // Monitor scroll depth
    useEffect(() => {
        if (isDismissed()) return;

        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight <= 0) return;

            const scrollPercent = (window.scrollY / scrollHeight) * 100;

            if (scrollPercent > 85 && !hasPassedThreshold) {
                setHasPassedThreshold(true);
                // Small delay for smooth UX
                setTimeout(() => setIsVisible(true), 500);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasPassedThreshold]);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem(DISMISSED_KEY, "1");
    };

    const handleOptIn = async () => {
        try {
            // Check if OneSignal SDK is loaded
            const OneSignal = (window as unknown as Record<string, unknown>).OneSignalDeferred as unknown[];
            if (OneSignal && Array.isArray(OneSignal)) {
                OneSignal.push(async function (os: { Notifications: { requestPermission: () => Promise<void> } }) {
                    await os.Notifications.requestPermission();
                });
            } else {
                // Fallback: native browser notification API
                if ("Notification" in window) {
                    await Notification.requestPermission();
                }
            }
        } catch {
            // Silently fail — non-critical feature
        }

        setIsVisible(false);
        localStorage.setItem(DISMISSED_KEY, "1");
    };

    if (!isVisible) return null;

    return (
        <div
            ref={bannerRef}
            className="fixed bottom-0 left-0 right-0 z-800 border-t border-border bg-background/95 backdrop-blur-sm shadow-[0_-4px_20px_rgba(0,0,0,0.08)] animate-slideUp"
            role="alert"
            aria-live="polite"
        >
            <div className="mx-auto max-w-5xl px-4 py-4 md:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <Bell size={14} className="text-primary" />
                        </div>
                        <p className="text-sm text-foreground leading-snug">
                            Get notified when this article is updated with new rates or law changes.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={handleOptIn}
                            className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                            Notify Me
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Dismiss notification banner"
                        >
                            No thanks
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="hidden sm:flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Close"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideUp {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                .animate-slideUp {
                    animation: slideUp 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                @media (prefers-reduced-motion: reduce) {
                    .animate-slideUp {
                        animation: none;
                    }
                }
            `}</style>
        </div>
    );
}

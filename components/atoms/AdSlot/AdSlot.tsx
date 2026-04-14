"use client";

import React from "react";

type AdVariant = "leaderboard" | "rectangle" | "skyscraper";

interface AdSlotProps {
    variant: AdVariant;
    className?: string;
}

/**
 * Responsive ad slot placeholder.
 *
 * - Leaderboard: fluid full-width horizontal banner, 60px mobile / 90px desktop
 * - Rectangle (300×250): fixed size, centered
 * - Skyscraper (300×600): fixed size, centered
 *
 * TODO: Remove `hidden` from the wrapper divs when AdSense is approved and ready to activate.
 */
export default function AdSlot({ variant, className = "" }: AdSlotProps) {
    if (variant === "leaderboard") {
        return (
            <div
                hidden
                className={`ad-slot ad-slot--leaderboard w-full ${className}`}
                role="complementary"
                aria-label="Advertisement"
                data-ad-slot="leaderboard"
            >
                <span className="pointer-events-none select-none opacity-60">
                    Advertisement
                </span>
            </div>
        );
    }

    const dimensions: Record<"rectangle" | "skyscraper", { width: number; height: number; label: string }> = {
        rectangle: { width: 300, height: 250, label: "Ad — 300×250" },
        skyscraper: { width: 300, height: 600, label: "Ad — 300×600" },
    };

    const { width, height, label } = dimensions[variant];

    return (
        <div
            hidden
            className={`ad-slot mx-auto ${className}`}
            style={{ maxWidth: width, height }}
            role="complementary"
            aria-label={label}
            data-ad-slot={variant}
        >
            <span className="pointer-events-none select-none opacity-60">
                {label}
            </span>
        </div>
    );
}

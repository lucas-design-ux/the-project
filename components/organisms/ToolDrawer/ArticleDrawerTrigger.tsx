"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useToolDrawer } from "@/hooks/useToolDrawer";

const ToolDrawer = dynamic(
    () => import("@/components/organisms/ToolDrawer/ToolDrawer"),
    { ssr: false }
);

export default function ArticleDrawerTrigger() {
    const { isOpen, triggerDrawer, closeDrawer } = useToolDrawer();
    const hasFired = useRef(false);

    // Trigger the drawer automatically when the user scrolls past 90% of the page length
    useEffect(() => {
        const handleScroll = () => {
            if (hasFired.current) return;
            
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight <= 0) return;

            const scrollPercent = (window.scrollY / scrollHeight) * 100;

            if (scrollPercent > 90) {
                hasFired.current = true;
                triggerDrawer();
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [triggerDrawer]);

    return <ToolDrawer isOpen={isOpen} onClose={closeDrawer} />;
}

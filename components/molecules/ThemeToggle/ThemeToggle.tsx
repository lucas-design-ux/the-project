"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/lib/theme/ThemeProvider";

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button
                className="flex h-12 w-12 items-center justify-center border-2 border-border bg-background text-foreground transition-colors hover:border-foreground disabled:opacity-50"
                disabled
                aria-label="Loading theme toggle"
            >
                <span className="text-xs font-bold">...</span>
            </button>
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="flex h-12 w-20 items-center justify-center border-2 border-border bg-background text-foreground transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
            <span className="text-xs font-bold uppercase tracking-wider">
                {theme === "dark" ? "Light" : "Dark"}
            </span>
        </button>
    );
}

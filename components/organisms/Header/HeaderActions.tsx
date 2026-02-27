"use client";

import ThemeToggle from "@/components/molecules/ThemeToggle/ThemeToggle";

export default function HeaderActions() {
    return (
        <div className="flex items-center gap-4">
            <ThemeToggle />
        </div>
    );
}

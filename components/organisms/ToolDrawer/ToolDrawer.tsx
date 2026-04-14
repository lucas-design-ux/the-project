"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import "./ToolDrawer.css";

interface ToolDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const TOOLS = [
    {
        slug: "savings-goal-calculator",
        name: "Savings Goal Calculator",
        description: "Find out exactly when you'll hit your savings target.",
    },
    {
        slug: "wealth-growth-simulator",
        name: "Wealth Growth Simulator",
        description: "Visualize decades of compound growth in seconds.",
    },
    {
        slug: "debt-payoff-strategist",
        name: "Debt Payoff Strategist",
        description: "Discover the fastest path to becoming debt-free.",
    },
    {
        slug: "freedom-fund-calculator",
        name: "Freedom Fund Calculator",
        description: "Calculate your Financial Independence number.",
    },
];

export default function ToolDrawer({ isOpen, onClose }: ToolDrawerProps) {
    const drawerRef = useRef<HTMLDivElement>(null);

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose]);

    // Close on click outside
    useEffect(() => {
        if (!isOpen) return;

        const handleClick = (e: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        // Small delay to avoid catching the opening click
        const timer = setTimeout(() => {
            document.addEventListener("mousedown", handleClick);
        }, 100);

        return () => {
            clearTimeout(timer);
            document.removeEventListener("mousedown", handleClick);
        };
    }, [isOpen, onClose]);

    // Prevent body scroll when drawer is open on mobile
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <div
            className={`tool-drawer-overlay ${isOpen ? "tool-drawer-overlay--open" : ""}`}
            aria-hidden={!isOpen}
        >
            <aside
                ref={drawerRef}
                className={`tool-drawer ${isOpen ? "tool-drawer--open" : ""}`}
                role="dialog"
                aria-label="Explore more financial tools"
                aria-modal="true"
            >
                <div className="tool-drawer__header">
                    <div>
                        <p className="tool-drawer__label">Explore</p>
                        <h2 className="tool-drawer__title">More Financial Tools</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="tool-drawer__close"
                        aria-label="Close tools drawer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <ul className="tool-drawer__list">
                    {TOOLS.map((tool) => (
                        <li key={tool.slug}>
                            <Link
                                href={`/tools/${tool.slug}`}
                                className="tool-drawer__item"
                                onClick={onClose}
                            >
                                <div className="tool-drawer__item-content">
                                    <span className="tool-drawer__item-name">{tool.name}</span>
                                    <span className="tool-drawer__item-desc">{tool.description}</span>
                                </div>
                                <ArrowRight size={16} className="tool-drawer__item-arrow" />
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="tool-drawer__footer">
                    <Link
                        href="/tools"
                        className="tool-drawer__cta"
                        onClick={onClose}
                    >
                        View All Tools →
                    </Link>
                </div>
            </aside>
        </div>
    );
}

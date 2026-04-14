"use client";

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import dynamic from "next/dynamic";
import { useToolDrawer } from "@/hooks/useToolDrawer";
import { useInlineCompact } from "@/components/tools/InlineCompactProvider/InlineCompactProvider";
import { ChevronDown } from "lucide-react";

const ToolDrawer = dynamic(
    () => import("@/components/organisms/ToolDrawer/ToolDrawer"),
    { ssr: false }
);

const ContextualRecommendations = dynamic(
    () => import("@/components/molecules/ContextualRecommendations/ContextualRecommendations"),
    { ssr: false }
);

// ---------- Compact Mode Context ----------

const CompactContext = createContext(false);

/**
 * Hook consumed by calculator components to decide whether
 * to render in compact mode (collapsed details / chart).
 */
export function useCompactMode(): boolean {
    return useContext(CompactContext);
}

// ---------- Collapsible Detail Section ----------

interface CollapsibleSectionProps {
    label: string;
    children: ReactNode;
    defaultOpen?: boolean;
}

/**
 * A toggle wrapper for calculator sub-sections (Pro Tips, charts, insights).
 * In compact mode these default to collapsed; on standalone pages they
 * render as normal (non-collapsible) content.
 */
export function CollapsibleSection({ label, children, defaultOpen = false }: CollapsibleSectionProps) {
    const isCompact = useCompactMode();
    const [isOpen, setIsOpen] = useState(defaultOpen);

    // In standalone (non-compact), always render expanded without toggle
    if (!isCompact) {
        return <>{children}</>;
    }

    return (
        <div className="border border-border rounded-lg overflow-hidden">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-expanded={isOpen}
            >
                {label}
                <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>
            {isOpen && (
                <div className="px-0 pb-0">
                    {children}
                </div>
            )}
        </div>
    );
}

// ---------- Calculator Wrapper ----------

interface CalculatorWrapperProps {
    /** The calculator slug used to look up recommendation rules */
    calculatorSlug: string;
    /**
     * Result data from the calculator, used to evaluate recommendation
     * conditions. Pass `null` before the user has interacted.
     */
    resultData: Record<string, unknown> | null;
    /**
     * When true, auxiliary sections (charts, pro tips, insights) render
     * inside collapsible toggles, collapsed by default.
     * Set by ArticleRenderer when the calculator is inline.
     */
    compact?: boolean;
    /** The calculator UI itself */
    children: ReactNode;
}

/**
 * Wraps any calculator component with:
 * 1. Tool Discovery Drawer (triggered once per session)
 * 2. Contextual Recommendations (conditional on result data)
 * 3. Compact mode context for inline article usage
 *
 * Usage:
 * ```tsx
 * <CalculatorWrapper calculatorSlug="debt-payoff-strategist" resultData={{ months: 52 }}>
 *   <DebtPayoffCalculator />
 * </CalculatorWrapper>
 * ```
 */
export default function CalculatorWrapper({
    calculatorSlug,
    resultData,
    compact: compactProp = false,
    children,
}: CalculatorWrapperProps) {
    const inlineCompact = useInlineCompact();
    const compact = compactProp || inlineCompact;
    const { isOpen, triggerDrawer, closeDrawer } = useToolDrawer();
    const hasTriggered = useRef(false);

    // Trigger the drawer when resultData becomes non-null (i.e. calculator rendered results)
    useEffect(() => {
        if (resultData && !hasTriggered.current) {
            hasTriggered.current = true;
            triggerDrawer();
        }
    }, [resultData, triggerDrawer]);

    return (
        <CompactContext.Provider value={compact}>
            {children}

            {resultData && (
                <ContextualRecommendations
                    calculatorSlug={calculatorSlug}
                    resultData={resultData}
                />
            )}

            <ToolDrawer isOpen={isOpen} onClose={closeDrawer} />
        </CompactContext.Provider>
    );
}

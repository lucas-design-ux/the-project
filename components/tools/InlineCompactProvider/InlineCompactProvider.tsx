"use client";

import { createContext, useContext, ReactNode } from "react";

/**
 * Context to signal that a calculator is rendering in compact/inline mode
 * within an article body. When true, CalculatorWrapper passes compact=true
 * to its descendants, causing auxiliary sections to collapse by default.
 */
const InlineCompactContext = createContext(false);

export function useInlineCompact(): boolean {
    return useContext(InlineCompactContext);
}

export default function InlineCompactProvider({ children }: { children: ReactNode }) {
    return (
        <InlineCompactContext.Provider value={true}>
            {children}
        </InlineCompactContext.Provider>
    );
}

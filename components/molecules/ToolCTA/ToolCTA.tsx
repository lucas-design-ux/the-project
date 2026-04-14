import React from "react";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";

interface ToolCTAProps {
    componentSlug: string;
}

const TOOL_CONTENT: Record<string, { name: string; description: string }> = {
    "savings-goal-calculator": {
        name: "Savings Goal Calculator",
        description: "Figure out how long it'll take to reach your savings goal with our free interactive calculator.",
    },
    "wealth-growth-simulator": {
        name: "Wealth Growth Simulator",
        description: "Watch your money multiply through the power of compound interest. Try our free simulator.",
    },
    "debt-payoff-strategist": {
        name: "Debt Payoff Strategist",
        description: "Compare Avalanche vs Snowball with your real numbers to find the fastest path to becoming debt-free.",
    },
    "freedom-fund-calculator": {
        name: "Freedom Fund Calculator",
        description: "Calculate your Financial Independence number and discover when you can retire on your own terms.",
    },
};

export const ToolCTA: React.FC<ToolCTAProps> = ({ componentSlug }) => {
    // Fallback if the slug doesn't perfectly match
    const content = TOOL_CONTENT[componentSlug] || {
        name: "Interactive Financial Tool",
        description: "Put this into practice with our free interactive calculator to see how the math applies to you.",
    };

    return (
        <aside className="my-10 overflow-hidden rounded-xl border border-border bg-muted/40 p-6 shadow-sm sm:p-8 relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
            
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-3 max-w-xl">
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                        <Calculator className="h-4 w-4" />
                        <span>Put This Into Practice</span>
                    </div>
                    
                    <h4 className="text-xl font-medium text-foreground m-0">
                        {content.name}
                    </h4>
                    
                    <p className="text-muted-foreground m-0 leading-relaxed">
                        {content.description}
                    </p>
                </div>
                
                <div className="pt-2 sm:pt-0 shrink-0">
                    <Link 
                        href={`/tools/${componentSlug}`}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 py-2 w-full sm:w-auto mt-2"
                    >
                        Try the Free Tool
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </aside>
    );
};

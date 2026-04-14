'use client';

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ToolCard } from "@/components/molecules/ToolCard/ToolCard";
import { Section } from "@/components/organisms/Section/Section";

const tools = [
    {
        slug: "savings-goal-calculator",
        name: "Savings Goal Calculator",
        description: "Figure out how long it'll take to reach your savings goal. Play with the numbers and see compound interest in action.",
    },
    {
        slug: "wealth-growth-simulator",
        name: "Wealth Growth Simulator",
        description: "Watch your money multiply through the power of compound interest. Visualize decades of growth in seconds.",
    },
    {
        slug: "debt-payoff-strategist",
        name: "Debt Payoff Strategist",
        description: "Compare Avalanche vs. Snowball methods and discover the fastest path to becoming debt-free.",
    },
    {
        slug: "freedom-fund-calculator",
        name: "Freedom Fund Calculator",
        description: "Calculate your Financial Independence number and discover when you can retire on your own terms.",
    },
];

export default function ToolsPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Hero animation
        const heroElements = heroRef.current?.querySelectorAll('.tools-hero-item');
        if (heroElements && heroElements.length) {
            gsap.fromTo(
                heroElements,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
            );
        }

        // Tool cards stagger
        const toolCards = gridRef.current?.querySelectorAll('.tool-card');
        if (toolCards && toolCards.length) {
            gsap.fromTo(
                toolCards,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out', delay: 0.3 }
            );
        }

        // CTA animation
        const ctaElements = ctaRef.current?.querySelectorAll('.cta-item');
        if (ctaElements && ctaElements.length) {
            gsap.fromTo(
                ctaElements,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.6 }
            );
        }
    }, []);

    return (
        <main className="flex flex-col">
            <Section>
                <div ref={heroRef} className="max-w-3xl">
                    <div className="tools-hero-item inline-block border-2 border-border bg-muted/50 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-6">
                        Financial Tools
                    </div>
                    <h1 className="tools-hero-item font-serif text-5xl md:text-7xl font-normal mb-6 tracking-tight leading-[0.9]">
                        Master Your Money
                    </h1>
                    <p className="tools-hero-item text-xl text-muted-foreground leading-relaxed">
                        Interactive calculators that transform abstract financial concepts into clear, actionable insights.
                        No spreadsheets required.
                    </p>
                </div>
            </Section>

            {/* Tools Grid */}
            <Section id="tools-grid" className="pt-0">
                <div ref={gridRef} className="grid gap-8 sm:gap-10 md:grid-cols-2">
                    {tools.map((tool, index) => (
                        <ToolCard key={tool.slug} tool={tool} index={index} />
                    ))}
                </div>
            </Section>

            {/* Educational CTA */}
            <Section className="border-t border-border text-center">
                <div ref={ctaRef} className="max-w-2xl mx-auto">
                    <p className="cta-item text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-6">
                        Understanding is Power
                    </p>
                    <h2 className="cta-item font-serif text-3xl md:text-4xl font-normal mb-6 leading-tight">
                        Learn as You Calculate
                    </h2>
                    <p className="cta-item text-lg text-muted-foreground leading-relaxed">
                        Each tool includes contextual insights and links to in-depth articles.
                        Because the best financial decisions are informed decisions.
                    </p>
                </div>
            </Section>
        </main>
    );
}

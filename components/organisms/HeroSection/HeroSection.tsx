'use client';

import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/cms/interface";
import { Container } from "@/components/atoms/Container/Container";
import { cn } from '@/lib/utils';

export interface HeroSectionProps {
    mainArticles: Article[];
    sliderArticles: Article[]; // Kept so we don't break HeroSectionAsync, but unused
    className?: string;
}

// These arrays map exactly to the reference image provided by the user.
// The image features a strict 4-column layout that spans multiple rows natively.
const BENTO_CLASSES = [
    "bento-wide", // Card 0: Wide, top-left
    "bento-tall", // Card 1: Tall, top-right 1
    "bento-tall", // Card 2: Tall, top-right 2
    "bento-tall", // Card 3: Tall, bottom-left 1
    "bento-tall", // Card 4: Tall, bottom-left 2
    "bento-wide", // Card 5: Wide, bottom-right
];

export default function HeroSection({ mainArticles, className }: HeroSectionProps) {
    // We exactly need 6 articles for this layout to match the reference.
    const bentoArticles = mainArticles.slice(0, 6);

    if (!bentoArticles || bentoArticles.length === 0) return null;

    return (
        <section className={cn("py-8 sm:py-16 lg:py-20 bg-background", className)}>
            <Container>
                {/* Header matching the reference image */}
                <div className="mb-6 sm:mb-10 lg:mb-12 max-w-2xl px-2 lg:px-0">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight text-foreground mb-2 sm:mb-4">
                        Legacy.
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                        Building a fortress around your future. Because what you earn deserves to be protected.
                    </p>
                </div>


                {/* Hardcoded scoped CSS to guarantee Grid layout engine without global bleed */}
                <style dangerouslySetInnerHTML={{__html: `
                    .bento-wrapper { display: grid; gap: 0.5rem; grid-template-columns: repeat(2, 1fr); }
                    .bento-wrapper > *:first-child { grid-column: 1 / -1; }
                    .bento-wrapper > * { grid-column: var(--mobile-col); grid-row: var(--mobile-row); }
                    @media (min-width: 640px) { .bento-wrapper { gap: 0.75rem; } }
                    @media (min-width: 1024px) {
                        .bento-wrapper { grid-template-columns: repeat(4, minmax(0, 1fr)); grid-auto-rows: 130px; gap: 1.5rem; grid-auto-flow: row dense; }
                        .bento-wrapper > *:first-child { grid-column: auto; }
                        .bento-wrapper > * { grid-column: var(--desktop-col) !important; grid-row: var(--desktop-row) !important; height: 100% !important; border-radius: 0 !important; }
                    }
                `}} />

                {/* The 4x5 Bento Grid */}
                <div className="bento-wrapper">
                    {bentoArticles.map((article, index) => {
                        const tileClass = BENTO_CLASSES[index] || "bento-tall";
                        const isWide = BENTO_CLASSES[index]?.includes('wide');

                        return (
                            <Link
                                key={article.id}
                                href={`/article/${article.slug}`}
                                className={cn(
                                    "relative overflow-hidden flex flex-col group",
                                    "shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-border/40",
                                    "bento-card",
                                    tileClass
                                )}
                                style={
                                    {
                                        '--desktop-col': isWide ? 'span 2' : 'span 1',
                                        '--desktop-row': isWide ? 'span 2' : 'span 3',
                                        '--mobile-col': index === 0 ? 'span 2' : 'span 1',
                                        '--mobile-row': 'span 1',
                                    } as React.CSSProperties
                                }
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0 bg-muted">
                                    <Image
                                        src={article.coverImage}
                                        alt={article.title}
                                        fill
                                        priority={index < 3}
                                        sizes={isWide ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 25vw"}
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* Overlay to guarantee text readability without losing image impact */}
                                <div className="absolute inset-0 z-10 bg-black/70 transition-colors duration-300 group-hover:bg-black/80" />

                                {/* Content Wrapper */}
                                <div className="relative z-20 flex flex-col h-full p-3 sm:p-6 lg:p-7 justify-end">
                                    {/* Top Section: Tag + Title */}
                                    <div className="flex flex-col gap-1 sm:gap-3 lg:gap-4">
                                        <span className="hidden sm:block text-[10px] sm:text-[11px] font-bold text-white/90 uppercase tracking-[0.15em] drop-shadow-sm">
                                            {article.category.name}
                                        </span>
                                        <h3 className={cn(
                                            "font-sans font-bold text-white leading-[1.15] drop-shadow-md",
                                            isWide ? "text-[28px] sm:text-3xl lg:text-[38px] xl:text-[42px] max-w-[85%]" : "text-2xl sm:text-[26px] lg:text-[30px] pr-2"
                                        )}>
                                            {article.title}
                                        </h3>
                                    </div>

                                    {/* Bottom Section: Clean button — hidden on mobile to save space */}
                                    <div className="mt-auto hidden sm:flex">
                                        <span className="inline-flex items-center justify-center border-2 border-white bg-transparent text-white px-4 lg:px-5 py-2 rounded-none text-[13px] font-bold transition-all group-hover:bg-white group-hover:text-black group-hover:scale-105 shadow-[0_4px_12px_rgba(0,0,0,0.15)] drop-shadow-sm">
                                            Read Article
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}

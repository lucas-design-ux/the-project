import { Container } from "@/components/atoms/Container/Container";
import { cn } from "@/lib/utils";
import SkeletonLoader from "@/components/atoms/SkeletonLoader/SkeletonLoader";

// These map exactly to HeroSection.tsx layout
const BENTO_CLASSES = [
    "bento-wide", // Card 0: Wide, top-left
    "bento-tall", // Card 1: Tall, top-right 1
    "bento-tall", // Card 2: Tall, top-right 2
    "bento-tall", // Card 3: Tall, bottom-left 1
    "bento-tall", // Card 4: Tall, bottom-left 2
    "bento-wide", // Card 5: Wide, bottom-right
];

export default function HeroSectionSkeleton() {
    return (
        <section className="py-8 sm:py-16 lg:py-20 bg-background" aria-busy="true">
            <Container>
                {/* Header Skeleton */}
                <div className="mb-6 sm:mb-10 lg:mb-12 max-w-2xl px-2 lg:px-0">
                    <SkeletonLoader className="mb-2 sm:mb-4" width="w-[200px]" height="h-[32px] sm:h-[40px] md:h-[48px] lg:h-[56px]" />
                    <SkeletonLoader width="w-[80%]" height="h-[20px] sm:h-[24px] md:h-[28px]" />
                </div>

                {/* Hardcoded scoped CSS to guarantee Grid layout engine without global bleed */}
                <style dangerouslySetInnerHTML={{__html: `
                    .bento-wrapper { display: flex; flex-direction: column; gap: 0.5rem; }
                    @media (min-width: 640px) { .bento-wrapper { gap: 0.75rem; } }
                    @media (min-width: 1024px) {
                        .bento-wrapper { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); grid-auto-rows: 130px; gap: 1.5rem; grid-auto-flow: row dense; }
                        .bento-wrapper > * { grid-column: var(--desktop-col) !important; grid-row: var(--desktop-row) !important; height: 100% !important; border-radius: 0 !important; }
                    }
                `}} />

                {/* The Bento Grid Skeleton */}
                <div className="bento-wrapper">
                    {BENTO_CLASSES.map((tileClass, index) => {
                        const isWide = BENTO_CLASSES[index]?.includes('wide');
                        return (
                            <div
                                key={index}
                                className={cn(
                                    "relative overflow-hidden flex flex-col bg-muted/50 animate-pulse border border-border/20",
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
                                <div className="absolute inset-0 z-10 bg-black/5" />
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}

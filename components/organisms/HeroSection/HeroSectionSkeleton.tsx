import { Container } from "@/components/atoms/Container/Container";
import { cn } from "@/lib/utils";
import SkeletonLoader from "@/components/atoms/SkeletonLoader/SkeletonLoader";

const BENTO_CLASSES = [
    "lg:col-span-2 lg:row-span-2", // Card 0: Wide, top-left
    "lg:col-span-1 lg:row-span-3", // Card 1: Tall, top-right 1
    "lg:col-span-1 lg:row-span-3", // Card 2: Tall, top-right 2
    "lg:col-span-1 lg:row-span-3", // Card 3: Tall, bottom-left 1
    "lg:col-span-1 lg:row-span-3", // Card 4: Tall, bottom-left 2
    "lg:col-span-2 lg:row-span-2", // Card 5: Wide, bottom-right
];

export default function HeroSectionSkeleton() {
    return (
        <section className="py-12 sm:py-16 bg-background" aria-busy="true">
            <Container>
                {/* Header Skeleton */}
                <div className="mb-10 lg:mb-12 max-w-2xl px-2 lg:px-0">
                    <SkeletonLoader className="mb-4" width="w-[200px]" height="h-12 md:h-14 lg:h-[56px]" />
                    <SkeletonLoader width="w-[80%]" height="h-5 md:h-[22px]" />
                </div>

                {/* 4x5 Bento Grid Skeleton */}
                <div className="flex flex-col lg:grid lg:grid-cols-4 lg:auto-rows-[130px] gap-4 lg:gap-6 mb-8">
                    {BENTO_CLASSES.map((tileClass, index) => (
                        <div
                            key={index}
                            className={cn(
                                "relative rounded-xl overflow-hidden flex flex-col bg-muted/50 animate-pulse border border-border/20",
                                "h-[320px] sm:h-[380px] lg:h-auto",
                                tileClass
                            )}
                        >
                            <div className="absolute inset-0 z-10 bg-black/20" />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

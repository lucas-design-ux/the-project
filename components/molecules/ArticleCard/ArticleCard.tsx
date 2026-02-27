'use client';

import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/cms/interface";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Card } from "@/components/atoms/Card/Card";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const articleCardVariants = cva("group flex overflow-hidden transition-all duration-300 hover:border-foreground/20", {
    variants: {
        variant: {
            default: "flex-col",
            featured: "flex-col lg:flex-row lg:items-center gap-8 lg:gap-12",
            compact: "flex-col",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

const imageContainerVariants = cva("relative overflow-hidden bg-muted border-b border-border/50", {
    variants: {
        variant: {
            default: "aspect-[4/3] w-full border-b-2",
            featured: "aspect-[4/3] w-full lg:w-1/2 lg:aspect-[4/3] border-b-2 lg:border-b-0 lg:border-r-2",
            compact: "aspect-[3/2] w-full border-b",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

const contentVariants = cva("flex flex-col", {
    variants: {
        variant: {
            default: "p-6 space-y-4",
            featured: "p-6 lg:p-0 lg:w-1/2 space-y-6",
            compact: "p-4 space-y-2",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

interface ArticleCardProps extends VariantProps<typeof articleCardVariants> {
    article: Article;
    className?: string;
    imgHeight?: number; // Kept for backward compatibility but unused in new design
}

export default function ArticleCard({ article, className, variant = "default" }: ArticleCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const image = imageRef.current?.querySelector('img');

        if (!card || !image) return;

        const handleMouseEnter = () => {
            gsap.to(card, {
                y: -4,
                duration: 0.3,
                ease: 'power2.out',
            });

            gsap.to(image, {
                scale: 1.05,
                duration: 0.6,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.in',
            });

            gsap.to(image, {
                scale: 1,
                duration: 0.6,
                ease: 'power2.out',
            });
        };

        // Only apply hover effect if not featured, or apply subtly
        if (variant !== 'featured') {
            card.addEventListener('mouseenter', handleMouseEnter);
            card.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (variant !== 'featured') {
                card.removeEventListener('mouseenter', handleMouseEnter);
                card.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [variant]);

    return (
        <Card ref={cardRef} className={cn(articleCardVariants({ variant }), className)}>
            <Link href={`/article/${article.slug}`} className={cn(imageContainerVariants({ variant }))}>
                <div ref={imageRef} className="h-full w-full relative">
                    <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes={variant === 'featured' ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                    />
                </div>
            </Link>

            <div className={cn(contentVariants({ variant }))}>
                <div className="space-y-2">
                    <Link
                        href={`/category/${article.category.slug}`}
                        className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {article.category.name}
                    </Link>

                    <Link href={`/article/${article.slug}`}>
                        <h3
                            className={cn(
                                "font-serif font-normal leading-tight tracking-tight text-foreground group-hover:opacity-70 transition-opacity",
                            )}
                            style={{
                                fontSize: variant === 'featured'
                                    ? 'clamp(2rem, 1.5vw + 1.5rem, 2.75rem)'
                                    : variant === 'compact'
                                        ? '1.25rem'
                                        : 'clamp(1.5rem, 1.25vw + 1.25rem, 2.25rem)',
                            }}
                            title={article.title}
                        >
                            {article.title}
                        </h3>
                    </Link>
                </div>

                {variant !== 'compact' && (
                    <p className="line-clamp-3 text-base leading-relaxed text-muted-foreground">
                        {article.excerpt}
                    </p>
                )}

                <div className={cn(
                    "flex flex-wrap items-center gap-3 text-sm text-muted-foreground",
                    variant === 'compact' ? "pt-2" : "pt-4 border-t border-border/50 mt-auto"
                )}>
                    <span className="font-semibold text-foreground">{article.author.name}</span>
                    <span>·</span>
                    <time dateTime={article.publishedAt}>
                        {new Date(article.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </time>
                </div>
            </div>
        </Card>
    );
}

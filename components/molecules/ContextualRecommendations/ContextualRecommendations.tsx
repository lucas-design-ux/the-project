"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
    calculatorRecommendations,
    RecommendedArticle,
} from "@/config/calculatorRecommendations";

interface ContextualRecommendationsProps {
    calculatorSlug: string;
    resultData: Record<string, unknown>;
}

export default function ContextualRecommendations({
    calculatorSlug,
    resultData,
}: ContextualRecommendationsProps) {
    const rules = calculatorRecommendations[calculatorSlug];
    if (!rules) return null;

    // Collect articles from ALL matching rules (there could be multiple)
    const matchedArticles: RecommendedArticle[] = [];
    for (const rule of rules) {
        if (rule.condition(resultData)) {
            matchedArticles.push(...rule.articles);
        }
    }

    // De-dupe and limit to 3
    const uniqueArticles = matchedArticles
        .filter(
            (a, i, arr) => arr.findIndex((b) => b.slug === a.slug) === i
        )
        .slice(0, 3);

    if (uniqueArticles.length === 0) return null;

    return (
        <div className="mt-10 border border-border bg-muted/20 p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-5">
                Based on your result, you may also need:
            </p>
            <div className="grid gap-3">
                {uniqueArticles.map((article) => (
                    <Link
                        key={article.slug}
                        href={`/article/${article.slug}`}
                        className="group flex items-center justify-between gap-4 border border-border bg-background p-4 md:p-5 transition-all hover:border-foreground/30 hover:bg-muted/30"
                    >
                        <div className="min-w-0">
                            <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-1">
                                {article.category}
                            </span>
                            <span className="block font-medium text-sm md:text-base text-foreground leading-snug">
                                {article.title}
                            </span>
                        </div>
                        <ArrowRight
                            size={16}
                            className="shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-foreground"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

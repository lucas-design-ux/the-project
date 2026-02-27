'use client';

import { Container } from "@/components/atoms/Container/Container";
import ArticleCard from "@/components/molecules/ArticleCard/ArticleCard";
import { ToolCard } from "@/components/molecules/ToolCard/ToolCard";
import { Article } from "@/lib/cms/interface";

const mockArticle: Article = {
    id: "1",
    slug: "example-article",
    title: "The Power of Compound Interest",
    excerpt: "Discover how small, consistent investments can grow into significant wealth over time through the magic of compounding.",
    content: "",
    coverImage: "/images/hero-image.jpg", // Ensure this path exists or use a placeholder if unsure, but this is mock
    category: { id: "1", name: "Investments", slug: "investments", description: "" },
    author: { id: "1", name: "Alex Morgan", slug: "alex-morgan", avatar: "/avatars/alex.jpg", bio: "" },
    publishedAt: new Date().toISOString(),
    readingTime: 5,
    featured: false,
    articleType: "guide",
    keyTakeaways: ["Start early", "Invest consistently"],
};

const mockTool = {
    slug: "example-tool",
    name: "Savings Calculator",
    description: "Calculate your savings growth over time with this interactive tool.",
};

export default function CardsShowcasePage() {
    return (
        <Container className="py-24 space-y-24">
            <div className="space-y-8">
                <h1 className="text-4xl font-bold">Card System Showcase</h1>
                <p className="text-muted-foreground">This page demonstrates the unified Card system across different variants.</p>
            </div>

            <section className="space-y-8">
                <h2 className="text-2xl font-semibold border-b pb-2">ArticleCard - Featured Variant</h2>
                <div className="max-w-4xl">
                    <ArticleCard article={mockArticle} variant="featured" />
                </div>
            </section>

            <section className="space-y-8">
                <h2 className="text-2xl font-semibold border-b pb-2">ArticleCard - Default Variant</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ArticleCard article={mockArticle} variant="default" />
                    <ArticleCard article={mockArticle} variant="default" />
                    <ArticleCard article={mockArticle} variant="default" />
                </div>
            </section>

            <section className="space-y-8">
                <h2 className="text-2xl font-semibold border-b pb-2">ArticleCard - Compact Variant</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ArticleCard article={mockArticle} variant="compact" />
                    <ArticleCard article={mockArticle} variant="compact" />
                    <ArticleCard article={mockArticle} variant="compact" />
                </div>
            </section>

            <section className="space-y-8">
                <h2 className="text-2xl font-semibold border-b pb-2">ToolCard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ToolCard tool={mockTool} index={0} />
                    <ToolCard tool={mockTool} index={1} />
                </div>
            </section>
        </Container>
    );
}

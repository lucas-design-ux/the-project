import ArticleCardSkeleton from "@/components/molecules/ArticleCard/ArticleCardSkeleton";

export default function FeaturedArticlesGridSkeleton() {
    return (
        <section className="bg-muted/30 py-24 md:py-40" aria-busy="true">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    {/* Section title skeleton */}
                    <div className="w-48 h-8 animate-pulse bg-muted rounded-sm" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    <ArticleCardSkeleton />
                    <ArticleCardSkeleton />
                    <ArticleCardSkeleton />
                </div>
            </div>
        </section>
    );
}

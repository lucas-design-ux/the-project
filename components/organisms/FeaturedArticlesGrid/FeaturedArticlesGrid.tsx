import { Article } from "@/lib/cms/interface";
import ArticleCard from "@/components/molecules/ArticleCard/ArticleCard";

interface FeaturedArticlesGridProps {
    articles: Article[];
}

export default function FeaturedArticlesGrid({ articles }: FeaturedArticlesGridProps) {
    if (!articles || articles.length === 0) return null;

    const [hero, ...rest] = articles;

    return (
        <div className="space-y-6 sm:space-y-8">
            {/* Hero pillar — featured card, more compact on mobile */}
            <ArticleCard article={hero} variant="featured" />

            {/* Remaining pillars — responsive grid */}
            {rest.length > 0 && (
                <div className="grid grid-cols-1 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {rest.map((article) => (
                        <ArticleCard key={article.id} article={article} variant="compact" />
                    ))}
                </div>
            )}
        </div>
    );
}

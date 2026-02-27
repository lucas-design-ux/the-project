import { Article } from "@/lib/cms/interface";
import ArticleCard from "@/components/molecules/ArticleCard/ArticleCard";

interface FeaturedArticlesGridProps {
    articles: Article[];
}

export default function FeaturedArticlesGrid({ articles }: FeaturedArticlesGridProps) {
    if (!articles || articles.length === 0) return null;

    return (
        <div className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
}

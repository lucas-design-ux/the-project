import { Article } from "@/lib/cms/interface";
import ArticleCard from "@/components/molecules/ArticleCard/ArticleCard";

interface ArticleGridProps {
    articles: Article[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
    if (!articles || articles.length === 0) {
        return (
            <div className="py-24 text-center text-muted-foreground">
                No articles found in this category.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
}

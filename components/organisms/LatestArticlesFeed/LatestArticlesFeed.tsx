import { Article } from "@/lib/cms/interface";
import ArticleCard from "@/components/molecules/ArticleCard/ArticleCard";

interface LatestArticlesFeedProps {
    articles: Article[];
}

export default function LatestArticlesFeed({ articles }: LatestArticlesFeedProps) {
    return (
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} variant="compact" />
            ))}
        </div>
    );
}

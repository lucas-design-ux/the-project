import { Article } from "@/lib/cms/interface";
import ArticleCard from "@/components/molecules/ArticleCard/ArticleCard";

interface RelatedArticlesProps {
    articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
    if (!articles || articles.length === 0) return null;

    return (
        <div>
            <h2 className="mb-10 text-3xl font-bold font-serif tracking-tight">Read Next</h2>
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
            </div>
        </div>
    );
}

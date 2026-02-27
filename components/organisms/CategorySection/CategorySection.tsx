import Link from 'next/link';
import { Article } from '@/lib/cms/interface';
import ArticleCard from '@/components/molecules/ArticleCard/ArticleCard';
import CompactArticleRow from '@/components/molecules/CompactArticleRow/CompactArticleRow';
import ToolSuggestionBanner from '@/components/molecules/ToolSuggestionBanner/ToolSuggestionBanner';
import MiniArticleCard from '@/components/molecules/MiniArticleCard/MiniArticleCard';

interface CategorySectionProps {
    categoryName: string;
    categorySlug: string;
    featuredArticle: Article;
    compactArticles: Article[];
    miniArticles?: Article[];
    tool?: { name: string; slug: string };
}

export default function CategorySection({ categoryName, categorySlug, featuredArticle, compactArticles, miniArticles, tool }: CategorySectionProps) {
    return (
        <section className="flex flex-col h-full gap-8" data-testid="category-section">
            <Link href={`/category/${categorySlug}`} className="group flex items-center justify-between border-b-[3px] border-foreground pb-2">
                <h2 className="font-serif font-normal group-hover:opacity-70 transition-opacity tracking-tight" style={{ fontSize: '1.5rem' }}>
                    {categoryName}
                </h2>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold uppercase tracking-widest text-muted-foreground shrink-0 ml-2">
                    View All →
                </div>
            </Link>

            {miniArticles && miniArticles.length > 0 && (
                <div>
                    {miniArticles.slice(0, 3).map((article) => (
                        <MiniArticleCard key={article.id} article={article} />
                    ))}
                </div>
            )}

            <div>
                <ArticleCard article={featuredArticle} variant="compact" />
            </div>

            {compactArticles.length > 0 && (
                <div className="flex flex-col flex-1 border-t border-border pt-2">
                    {compactArticles.map((article) => (
                        <CompactArticleRow key={article.id} article={article} />
                    ))}
                </div>
            )}

            {tool && (
                <div className="mt-auto border-t border-border pt-4" style={{ paddingBottom: '1rem' }}>
                    <ToolSuggestionBanner toolName={tool.name} toolSlug={tool.slug} />
                </div>
            )}
        </section>
    );
}

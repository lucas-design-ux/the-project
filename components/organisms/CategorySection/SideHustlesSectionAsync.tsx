import { cms } from "@/lib/cms/adapters/mock";
import ArticleCard from "@/components/molecules/ArticleCard/ArticleCard";
import ToolSuggestionBanner from "@/components/molecules/ToolSuggestionBanner/ToolSuggestionBanner";
import Link from "next/link";

export default async function SideHustlesSectionAsync() {
    const { articles } = await cms.getArticlesByCategory('side-hustles', { page: 1, limit: 4 });

    if (!articles || articles.length === 0) return null;

    return (
        <section className="flex flex-col">
            <Link href="/category/side-hustles" className="group mb-8 flex items-center justify-between border-b-[3px] border-foreground pb-2">
                <h2 className="font-serif text-xl md:text-2xl lg:text-3xl font-normal group-hover:opacity-70 transition-opacity tracking-tight">
                    Side Hustles
                </h2>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold uppercase tracking-widest text-muted-foreground shrink-0 ml-2">
                    View All →
                </div>
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
            </div>

            <div className="max-w-2xl mx-auto w-full">
                <ToolSuggestionBanner
                    toolName="Freedom Fund Calculator"
                    toolSlug="freedom-fund-calculator"
                    description="See how your side hustle income accelerates your path to financial independence."
                />
            </div>
        </section>
    );
}

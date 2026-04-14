import { cms } from "@/lib/cms";
import CategorySection from "@/components/organisms/CategorySection/CategorySection";

const CATEGORY_CONFIGS = [
    { slug: 'legal-finance', name: 'Legal Finance', tool: { name: 'Freedom Fund Calculator', slug: 'freedom-fund-calculator' } },
    { slug: 'insurance-and-protection', name: 'Insurance & Protection' },
    { slug: 'auto-and-transport', name: 'Auto & Transport' },
    { slug: 'real-estate-and-mortgages', name: 'Real Estate & Mortgages', tool: { name: 'Savings Goal Calculator', slug: 'savings-goal-calculator' } },
    { slug: 'taxes', name: 'Taxes', tool: { name: 'Freedom Fund Calculator', slug: 'freedom-fund-calculator' } },
    { slug: 'investing-and-wealth', name: 'Investing & Wealth', tool: { name: 'Wealth Growth Simulator', slug: 'wealth-growth-simulator' } },
    { slug: 'budgeting-and-debt', name: 'Budgeting & Debt', tool: { name: 'Debt Payoff Strategist', slug: 'debt-payoff-strategist' } },
    { slug: 'side-hustles-and-fintech', name: 'Side Hustles & Fintech', tool: { name: 'Freedom Fund Calculator', slug: 'freedom-fund-calculator' } },
];

const COLS = 3;

export default async function CategorySectionsGridAsync() {
    const slugs = CATEGORY_CONFIGS.map(c => c.slug);
    const articlesMap = await cms.getArticlesByCategorySlugs(slugs, 6);

    // Filter out categories with no articles
    const validConfigs = CATEGORY_CONFIGS.filter(c => {
        const articles = articlesMap[c.slug] || [];
        return articles.length > 0;
    });

    // Split into complete rows and remainder
    const fullRowCount = Math.floor(validConfigs.length / COLS) * COLS;
    const fullRowConfigs = validConfigs.slice(0, fullRowCount);
    const remainderConfigs = validConfigs.slice(fullRowCount);

    return (
        <div className="flex flex-col gap-y-12">
            {/* Full rows: standard 3-column grid */}
            {fullRowConfigs.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-12 lg:gap-y-12">
                    {fullRowConfigs.map(config => {
                        const articles = articlesMap[config.slug] || [];
                        return (
                            <CategorySection
                                key={config.slug}
                                categoryName={config.name}
                                categorySlug={config.slug}
                                featuredArticle={articles[0]}
                                compactArticles={articles.slice(1, 3)}
                                miniArticles={articles.slice(3, 6)}
                                tool={config.tool}
                            />
                        );
                    })}
                </div>
            )}

            {/* Remainder row: adaptive columns (2-col if 2 items, full-width if 1) */}
            {remainderConfigs.length > 0 && (
                <div
                    className={
                        remainderConfigs.length === 2
                            ? "grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-12"
                            : remainderConfigs.length === 1
                                ? "grid grid-cols-1 max-w-2xl"
                                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-12 lg:gap-y-12"
                    }
                >
                    {remainderConfigs.map(config => {
                        const articles = articlesMap[config.slug] || [];
                        return (
                            <CategorySection
                                key={config.slug}
                                categoryName={config.name}
                                categorySlug={config.slug}
                                featuredArticle={articles[0]}
                                compactArticles={articles.slice(1, 3)}
                                miniArticles={articles.slice(3, 6)}
                                tool={config.tool}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

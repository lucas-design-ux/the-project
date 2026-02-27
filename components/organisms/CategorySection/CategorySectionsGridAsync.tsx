import { cms } from "@/lib/cms/adapters/mock";
import CategorySection from "@/components/organisms/CategorySection/CategorySection";

const CATEGORY_CONFIGS = [
    { slug: 'budgeting-and-debt', name: 'Budgeting & Debt', tool: { name: 'Debt Payoff Strategist', slug: 'debt-payoff-strategist' } },
    { slug: 'investing-101', name: 'Investing 101', tool: { name: 'Savings Goal Calculator', slug: 'savings-goal-calculator' } },
    { slug: 'investing-strategies', name: 'Investing Strategies', tool: { name: 'Wealth Growth Simulator', slug: 'wealth-growth-simulator' } },
    { slug: 'real-estate', name: 'Real Estate', tool: { name: 'Savings Goal Calculator', slug: 'savings-goal-calculator' } },
    { slug: 'taxes', name: 'Taxes', tool: { name: 'Freedom Fund Calculator', slug: 'freedom-fund-calculator' } },
    { slug: 'fintech-and-apps', name: 'Fintech & Apps' },
];

export default async function CategorySectionsGridAsync() {
    const slugs = CATEGORY_CONFIGS.map(c => c.slug);
    const articlesMap = await cms.getArticlesByCategorySlugs(slugs, 6);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-12 lg:gap-y-12">
            {CATEGORY_CONFIGS.map(config => {
                const articles = articlesMap[config.slug] || [];
                if (articles.length === 0) return null;

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
    );
}

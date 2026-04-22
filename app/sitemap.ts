import { MetadataRoute } from 'next';
import { cms } from '@/lib/cms';
import type { Article } from '@/lib/cms/interface';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wealthlogik.com';

/**
 * Hub-and-Spoke Sitemap Index Architecture
 * ─────────────────────────────────────────
 * Generates a Sitemap Index with dedicated sub-sitemaps per topic hub.
 * Each sub-sitemap groups a category landing (hub), its pillar article,
 * and all spoke articles — communicating topical authority to Google.
 *
 * Resulting structure:
 *   /sitemap.xml                         → Sitemap Index (auto-generated)
 *   /sitemap/0.xml                       → Static pages
 *   /sitemap/1.xml                       → Tools
 *   /sitemap/2.xml ... /sitemap/N.xml    → One per hub/category (sorted A-Z)
 *
 * ┌──────────────────┬───────────────────────────────────────────────────┬──────────┐
 * │ Article Role     │ spoke_meta value                                 │ Priority │
 * ├──────────────────┼───────────────────────────────────────────────────┼──────────┤
 * │ Hub (Pillar)     │ null — article IS the topical authority           │   0.85   │
 * │ Spoke            │ { parent_pillar_slug, parent_pillar_title, ... } │   0.70   │
 * └──────────────────┴───────────────────────────────────────────────────┴──────────┘
 *
 * Scalability: new articles published via the Strapi pipeline are
 * automatically included in their hub's sub-sitemap on the next ISR
 * revalidation cycle. New categories create new sub-sitemaps automatically.
 */

// Re-generate sitemaps every hour to pick up new pipeline-published articles
export const revalidate = 3600;

// ── Reserved sub-sitemap indices ────────────────────────────────────────
const STATIC_INDEX = 0;
const TOOLS_INDEX = 1;
const CATEGORY_OFFSET = 2;

/**
 * Returns a stable, alphabetically-sorted list of all categories.
 * Sorting guarantees deterministic ID↔category mapping across builds
 * and ISR revalidation cycles.
 */
async function getSortedCategories() {
    const categories = await cms.getAllCategories();
    return categories.sort((a, b) => a.slug.localeCompare(b.slug));
}

// ─────────────────────────────────────────────────────────────────────────
// generateSitemaps — tells Next.js how many sub-sitemaps to create
// ─────────────────────────────────────────────────────────────────────────

export async function generateSitemaps() {
    const categories = await getSortedCategories();

    return [
        { id: STATIC_INDEX },
        { id: TOOLS_INDEX },
        ...categories.map((_, i) => ({ id: i + CATEGORY_OFFSET })),
    ];
}

// ─────────────────────────────────────────────────────────────────────────
// sitemap — generates the content of each individual sub-sitemap
// Next.js 16: id is passed as Promise<string> and must be awaited
// ─────────────────────────────────────────────────────────────────────────

export default async function sitemap(props: {
    id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
    const rawId = await props.id;
    const id = Number(rawId);

    // ── Sub-sitemap 0: Static pages ─────────────────────────────────────
    if (id === STATIC_INDEX) {
        return [
            { url: `${SITE_URL}/`,                   changeFrequency: 'daily',   priority: 1.0 },
            { url: `${SITE_URL}/about`,              changeFrequency: 'monthly', priority: 0.6 },
            { url: `${SITE_URL}/contact`,            changeFrequency: 'yearly',  priority: 0.4 },
            { url: `${SITE_URL}/editorial-policy`,   changeFrequency: 'yearly',  priority: 0.3 },
            { url: `${SITE_URL}/policy-and-privacy`, changeFrequency: 'yearly',  priority: 0.3 },
        ];
    }

    // ── Sub-sitemap 1: Tools ────────────────────────────────────────────
    if (id === TOOLS_INDEX) {
        const toolSlugs = [
            'savings-goal-calculator',
            'wealth-growth-simulator',
            'debt-payoff-strategist',
            'freedom-fund-calculator',
        ];
        return [
            { url: `${SITE_URL}/tools`, changeFrequency: 'weekly', priority: 0.9 },
            ...toolSlugs.map((slug) => ({
                url: `${SITE_URL}/tools/${slug}`,
                changeFrequency: 'monthly' as const,
                priority: 0.8,
            })),
        ];
    }

    // ── Sub-sitemap 2+: Hub category (hub page → pillar → spokes) ───────
    const categories = await getSortedCategories();
    const categoryIndex = id - CATEGORY_OFFSET;
    const category = categories[categoryIndex];

    if (!category) {
        return []; // Safety fallback — should never happen
    }

    // Fetch ALL articles in this category (paginated for Strapi limits)
    const allArticles: Article[] = [];
    let page = 1;
    const pageSize = 50;

    while (true) {
        const { articles } = await cms.getArticlesByCategory(category.slug, {
            page,
            limit: pageSize,
        });
        allArticles.push(...articles);
        if (articles.length < pageSize) break;
        page++;
    }

    // 1) Category landing page (hub) — highest priority in this group
    const entries: MetadataRoute.Sitemap = [
        {
            url: `${SITE_URL}/category/${category.slug}`,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
    ];

    // 2) Articles — pillar vs spoke differentiation
    //    Hub/Pillar: spoke_meta is null  → priority 0.85
    //    Spoke:      spoke_meta present  → priority 0.70
    for (const article of allArticles) {
        const isPillar = !article.spokeMeta;
        entries.push({
            url: `${SITE_URL}/article/${article.slug}`,
            lastModified: new Date(article.publishedAt),
            changeFrequency: 'monthly',
            priority: isPillar ? 0.85 : 0.7,
        });
    }

    return entries;
}

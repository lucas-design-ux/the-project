import { cms } from '@/lib/cms';
import type { Article } from '@/lib/cms/interface';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wealthlogik.com';

/**
 * Hub-and-Spoke Sitemap Architecture
 * ─────────────────────────────────────────
 * Generates sub-sitemaps per topic hub via Route Handlers for full
 * control over response headers (Content-Type, Cache-Control, no Vary).
 *
 * Resulting structure:
 *   /sitemap-index.xml                   → Sitemap Index (route handler)
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
 */

// ── Reserved sub-sitemap indices ────────────────────────────────────────
const STATIC_INDEX = 0;
const TOOLS_INDEX = 1;
const CATEGORY_OFFSET = 2;

// ── Types ───────────────────────────────────────────────────────────────

interface SitemapEntry {
    url: string;
    lastModified?: Date;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
}

// ── Helpers ─────────────────────────────────────────────────────────────

/**
 * Returns a stable, alphabetically-sorted list of all categories.
 * Sorting guarantees deterministic ID↔category mapping across builds
 * and ISR revalidation cycles.
 */
async function getSortedCategories() {
    const categories = await cms.getAllCategories();
    return categories.sort((a, b) => a.slug.localeCompare(b.slug));
}

/**
 * Escapes special XML characters in a string.
 */
function escapeXml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// ── Public API ──────────────────────────────────────────────────────────

/**
 * Returns the total number of sub-sitemaps.
 */
export async function getSitemapCount(): Promise<number> {
    const categories = await getSortedCategories();
    return CATEGORY_OFFSET + categories.length;
}

/**
 * Generates the XML for a specific sub-sitemap by its numeric ID.
 */
export async function generateSubSitemapXml(id: number): Promise<string | null> {
    const entries = await generateEntries(id);
    if (entries === null) return null;
    return entriesToXml(entries);
}

/**
 * Generates the sitemap index XML listing all sub-sitemaps.
 */
export async function generateSitemapIndexXml(): Promise<string> {
    const count = await getSitemapCount();
    const locs = Array.from({ length: count }, (_, i) =>
        `  <sitemap>\n    <loc>${escapeXml(`${SITE_URL}/sitemap/${i}.xml`)}</loc>\n  </sitemap>`
    );

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...locs,
        '</sitemapindex>',
    ].join('\n');
}

// ── Internals ───────────────────────────────────────────────────────────

async function generateEntries(id: number): Promise<SitemapEntry[] | null> {
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
        return null; // Invalid ID
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
    const entries: SitemapEntry[] = [
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

function entriesToXml(entries: SitemapEntry[]): string {
    const urlBlocks = entries.map((entry) => {
        const parts = [`    <loc>${escapeXml(entry.url)}</loc>`];
        if (entry.lastModified) {
            parts.push(`    <lastmod>${entry.lastModified.toISOString()}</lastmod>`);
        }
        if (entry.changeFrequency) {
            parts.push(`    <changefreq>${entry.changeFrequency}</changefreq>`);
        }
        if (entry.priority !== undefined) {
            parts.push(`    <priority>${entry.priority}</priority>`);
        }
        return `  <url>\n${parts.join('\n')}\n  </url>`;
    });

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urlBlocks,
        '</urlset>',
    ].join('\n');
}

import {
    CMSAdapter,
    Article,
    Category,
    Author,
    ArticleType,
    FAQItem,
    SpokeMapping,
    SpokeMeta,
    InjectedTool,
} from "../interface";

// ---------------------------------------------------------------------------
// Environment validation (server-only — never import this file in client code)
// ---------------------------------------------------------------------------
const STRAPI_API_URL = process.env.STRAPI_API_URL;
const STRAPI_TOKEN = process.env.STRAPI_READ_ONLY_TOKEN;

if (!STRAPI_API_URL) {
    console.warn(
        "[StrapiCMS] STRAPI_API_URL is not set. Strapi adapter will fail at runtime."
    );
}
if (!STRAPI_TOKEN) {
    console.warn(
        "[StrapiCMS] STRAPI_READ_ONLY_TOKEN is not set. Strapi adapter will fail at runtime."
    );
}

// ---------------------------------------------------------------------------
// Default author used when the pipeline does not provide one
// ---------------------------------------------------------------------------
const DEFAULT_AUTHOR: Author = {
    id: "editorial",
    name: "WealthLogik Editorial",
    slug: "wealthlogik-editorial",
    avatar: "https://api.wealthlogik.com/uploads/Logo_Icon_011c57d67c.svg",
    bio: "The WealthLogik editorial team delivers data-driven financial analysis for the next generation.",
};

// ---------------------------------------------------------------------------
// Strapi raw response types
// ---------------------------------------------------------------------------

/** Represents a single item inside `data` coming from Strapi v4/v5 REST API. */
interface StrapiArticleAttributes {
    title: string;
    slug: string;
    meta_description?: string;
    category?: string;
    tags?: string[];
    publish_date?: string;
    featured_image_url?: string;
    content_html?: string;
    key_takeaways?: string[];
    faq_section?: FAQItem[];
    schema_json_ld?: Record<string, unknown>[];
    cms_spoke_mappings?: SpokeMapping[];
    tools?: InjectedTool[];
    spoke_meta?: SpokeMeta | null;
}

interface StrapiItem<T> {
    id: number;
    attributes?: T; // Strapi v4 nested
    [key: string]: unknown; // Strapi v5 flat (fields at root)
}

interface StrapiPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

interface StrapiListResponse<T> {
    data: StrapiItem<T>[];
    meta?: { pagination?: StrapiPagination };
}

interface StrapiSingleResponse<T> {
    data: StrapiItem<T> | null;
}

// ---------------------------------------------------------------------------
// Generic fetch helper (server-side only, ISR-cached)
// ---------------------------------------------------------------------------

async function strapiFetch<T>(
    path: string,
    params?: Record<string, string>
): Promise<T> {
    const url = new URL(path, STRAPI_API_URL);
    // Always populate all relations/fields so JSON columns are included
    url.searchParams.set("populate", "*");
    if (params) {
        Object.entries(params).forEach(([k, v]) =>
            url.searchParams.set(k, v)
        );
    }

    const res = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${STRAPI_TOKEN}`,
            "Content-Type": "application/json",
            // Optional: Cloudflare Zero Trust access headers
            ...(process.env.CF_ACCESS_CLIENT_ID && { "CF-Access-Client-Id": process.env.CF_ACCESS_CLIENT_ID }),
            ...(process.env.CF_ACCESS_CLIENT_SECRET && { "CF-Access-Client-Secret": process.env.CF_ACCESS_CLIENT_SECRET }),
            // Optional: Custom header for WAF bypass rule
            ...(process.env.CF_BYPASS_TOKEN && { "x-vercel-bypass": process.env.CF_BYPASS_TOKEN }),
        },
        cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
        next: process.env.NODE_ENV === "development" ? undefined : { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error(
            `[StrapiCMS] Fetch failed: ${res.status} ${res.statusText} — ${url.toString()}`
        );
    }

    return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Helpers: build Strapi REST filter query params
// ---------------------------------------------------------------------------

function paginationParams(
    page: number,
    pageSize: number
): Record<string, string> {
    return {
        "pagination[page]": String(page),
        "pagination[pageSize]": String(pageSize),
    };
}

function sortDesc(): Record<string, string> {
    return { sort: "publish_date:desc" };
}

// ---------------------------------------------------------------------------
// Mappers: Strapi → front-end types
// ---------------------------------------------------------------------------

/** Helper to slugify a category name string, e.g. "Real Estate & Mortgages" → "real-estate-and-mortgages" */
function slugifyCategory(name: string): string {
    return name
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

/** Compute reading time from HTML content (~200 words per minute). */
function computeReadingTime(html: string): number {
    const text = html.replace(/<[^>]*>/g, "");
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
}

/**
 * Resolves image URLs from Strapi.
 * Handles absolute URLs (returned as-is) and relative paths (prefixed with STRAPI_API_URL).
 */
function resolveImageUrl(raw: string | undefined): string {
    if (!raw) return "";
    if (raw.startsWith("http")) return raw;
    // Relative path like /uploads/image.png → prepend Strapi base URL
    return `${STRAPI_API_URL}${raw}`;
}

/**
 * Extracts the flat attributes from a Strapi item, handling both
 * v4 nested (`data.attributes`) and v5 flat (`data.field`) shapes.
 */
function extractAttributes<T>(item: StrapiItem<T>): T & { id: number } {
    if (item.attributes) {
        // Strapi v4 shape
        return { ...item.attributes, id: item.id };
    }
    // Strapi v5 flat shape — everything is at the root
    return item as unknown as T & { id: number };
}

/** Helper to dynamically enforce the WealthLogik editorial identity on injected JSON-LD schema */
function enforceEditorialSchema(schemaArray: Record<string, unknown>[] | undefined): Record<string, unknown>[] | undefined {
    if (!schemaArray || !Array.isArray(schemaArray)) return schemaArray;
    return schemaArray.map(schema => {
        if (schema['@type'] === 'Article' || schema['@type'] === 'NewsArticle' || schema['@type'] === 'BlogPosting') {
            return {
                ...schema,
                author: {
                    "@type": "Organization",
                    "name": "WealthLogik Editorial Team",
                    "url": "https://wealthlogik.com/about/"
                },
                editor: {
                    "@type": "Person",
                    "name": "Lucas Melo",
                    "url": "https://wealthlogik.com/about/",
                    "sameAs": "https://www.linkedin.com/in/melofrp/"
                },
                publisher: {
                    "@type": "Organization",
                    "name": "WealthLogik",
                    "url": "https://wealthlogik.com",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://api.wealthlogik.com/uploads/Logo_Icon_011c57d67c.svg"
                    }
                }
            };
        }
        return schema;
    });
}

/** Maps a raw Strapi article record to our front-end Article type. */
function strapiToArticle(raw: StrapiItem<StrapiArticleAttributes>): Article {
    const attrs = extractAttributes<StrapiArticleAttributes>(raw);

    const contentHtml = attrs.content_html ?? "";
    const categoryName = attrs.category ?? "Uncategorized";

    return {
        // Core fields
        id: String(attrs.id),
        title: attrs.title,
        slug: attrs.slug,
        excerpt: attrs.meta_description ?? "",
        content: contentHtml,
        coverImage: resolveImageUrl(attrs.featured_image_url),
        publishedAt: attrs.publish_date ?? new Date().toISOString(),
        keyTakeaways: attrs.key_takeaways ?? [],

        // Derived / default fields
        readingTime: computeReadingTime(contentHtml),
        featured: false,
        articleType: "guide" as ArticleType,
        author: DEFAULT_AUTHOR,
        category: {
            id: slugifyCategory(categoryName),
            name: categoryName,
            slug: slugifyCategory(categoryName),
        },

        // Pipeline-enriched optional fields
        metaDescription: attrs.meta_description,
        tags: attrs.tags,
        faqSection: attrs.faq_section,
        schemaJsonLd: enforceEditorialSchema(attrs.schema_json_ld),
        cmsSpokeMapping: attrs.cms_spoke_mappings,
        tools: attrs.tools,
        spokeMeta: attrs.spoke_meta ?? undefined,
    };
}

// ---------------------------------------------------------------------------
// StrapiCMSAdapter — implements CMSAdapter
// ---------------------------------------------------------------------------

export class StrapiCMSAdapter implements CMSAdapter {
    // -----------------------------------------------------------------------
    // getFeaturedArticle — returns the most recent article (no `featured`
    // field in the pipeline; falls back to latest by publish_date)
    // -----------------------------------------------------------------------
    async getFeaturedArticle(): Promise<Article | null> {
        const res = await strapiFetch<StrapiListResponse<StrapiArticleAttributes>>(
            "/api/articles",
            {
                ...sortDesc(),
                "pagination[limit]": "1",
            }
        );
        return res.data.length > 0 ? strapiToArticle(res.data[0]) : null;
    }

    // -----------------------------------------------------------------------
    // getHeroArticles
    // -----------------------------------------------------------------------
    async getHeroArticles(limit: number): Promise<Article[]> {
        const res = await strapiFetch<StrapiListResponse<StrapiArticleAttributes>>(
            "/api/articles",
            {
                ...sortDesc(),
                "pagination[limit]": String(limit),
            }
        );
        return res.data.map(strapiToArticle);
    }

    // -----------------------------------------------------------------------
    // getCuratedArticles — latest 3 articles
    // -----------------------------------------------------------------------
    async getCuratedArticles(): Promise<Article[]> {
        const res = await strapiFetch<StrapiListResponse<StrapiArticleAttributes>>(
            "/api/articles",
            {
                ...sortDesc(),
                "pagination[limit]": "3",
            }
        );
        return res.data.map(strapiToArticle);
    }

    // -----------------------------------------------------------------------
    // getLatestArticles (paginated)
    // -----------------------------------------------------------------------
    async getLatestArticles({
        page,
        limit,
    }: {
        page: number;
        limit: number;
    }): Promise<Article[]> {
        const res = await strapiFetch<StrapiListResponse<StrapiArticleAttributes>>(
            "/api/articles",
            {
                ...sortDesc(),
                ...paginationParams(page, limit),
            }
        );
        return res.data.map(strapiToArticle);
    }

    // -----------------------------------------------------------------------
    // getArticleBySlug
    // -----------------------------------------------------------------------
    async getArticleBySlug(slug: string): Promise<Article | null> {
        const res = await strapiFetch<StrapiListResponse<StrapiArticleAttributes>>(
            "/api/articles",
            {
                "filters[slug][$eq]": slug,
            }
        );
        return res.data.length > 0 ? strapiToArticle(res.data[0]) : null;
    }

    // -----------------------------------------------------------------------
    // getArticlesByCategory (paginated, returns totalPages)
    // -----------------------------------------------------------------------
    async getArticlesByCategory(
        categorySlug: string,
        { page, limit }: { page: number; limit: number }
    ): Promise<{ articles: Article[]; totalPages: number }> {
        // The pipeline stores `category` as a plain string like "Real Estate & Mortgages".
        // We need to search using $containsi so the slug-based lookup works loosely,
        // or we can fetch all and filter. Using Strapi filtering on the string field:
        // We'll use $containsi with a de-slugified version.
        const categoryName = categorySlug
            .replace(/-/g, " ")
            .replace(/\band\b/g, "&");

        const res = await strapiFetch<StrapiListResponse<StrapiArticleAttributes>>(
            "/api/articles",
            {
                "filters[category][$containsi]": categoryName,
                ...sortDesc(),
                ...paginationParams(page, limit),
            }
        );

        const totalPages = res.meta?.pagination?.pageCount ?? 1;
        return {
            articles: res.data.map(strapiToArticle),
            totalPages,
        };
    }

    // -----------------------------------------------------------------------
    // getArticlesByCategorySlugs — one query per slug
    // -----------------------------------------------------------------------
    async getArticlesByCategorySlugs(
        slugs: string[],
        limit: number
    ): Promise<Record<string, Article[]>> {
        const result: Record<string, Article[]> = {};

        await Promise.all(
            slugs.map(async (slug) => {
                const { articles } = await this.getArticlesByCategory(slug, {
                    page: 1,
                    limit,
                });
                result[slug] = articles;
            })
        );

        return result;
    }

    // -----------------------------------------------------------------------
    // getAllCategories — derives unique categories from all articles
    // -----------------------------------------------------------------------
    async getAllCategories(): Promise<Category[]> {
        // Strapi has no separate "categories" collection in this schema;
        // categories are plain strings on articles. We fetch all and dedupe.
        const res = await strapiFetch<StrapiListResponse<StrapiArticleAttributes>>(
            "/api/articles",
            {
                "pagination[limit]": "1000",
                "fields[0]": "category",
            }
        );

        const seen = new Map<string, Category>();
        for (const item of res.data) {
            const attrs = extractAttributes<StrapiArticleAttributes>(item);
            const name = attrs.category ?? "Uncategorized";
            const slug = slugifyCategory(name);
            if (!seen.has(slug)) {
                seen.set(slug, {
                    id: slug,
                    name,
                    slug,
                });
            }
        }

        return Array.from(seen.values());
    }

    // -----------------------------------------------------------------------
    // getRelatedArticles — same category, excluding current article
    // -----------------------------------------------------------------------
    async getRelatedArticles(currentArticleId: string): Promise<Article[]> {
        const res = await strapiFetch<StrapiListResponse<StrapiArticleAttributes>>(
            "/api/articles",
            {
                "filters[id][$ne]": currentArticleId,
                ...sortDesc(),
                "pagination[limit]": "3",
            }
        );
        return res.data.map(strapiToArticle);
    }

    // -----------------------------------------------------------------------
    // searchArticles — full-text search on title and meta_description
    // -----------------------------------------------------------------------
    async searchArticles(query: string): Promise<Article[]> {
        const res = await strapiFetch<StrapiListResponse<StrapiArticleAttributes>>(
            "/api/articles",
            {
                "filters[$or][0][title][$containsi]": query,
                "filters[$or][1][meta_description][$containsi]": query,
            }
        );
        return res.data.map(strapiToArticle);
    }

    // -----------------------------------------------------------------------
    // getPillarArticles — articles where spoke_meta is null (pillar posts)
    // -----------------------------------------------------------------------
    async getPillarArticles(): Promise<Article[]> {
        const res = await strapiFetch<StrapiListResponse<StrapiArticleAttributes>>(
            "/api/articles",
            {
                "filters[spoke_meta][$null]": "true",
                ...sortDesc(),
                "pagination[limit]": "50",
            }
        );
        return res.data.map(strapiToArticle);
    }

    // -----------------------------------------------------------------------
    // getSiblingSpokes — spokes sharing the same parent_pillar_slug,
    // excluding the current article
    // -----------------------------------------------------------------------
    async getSiblingSpokes(
        parentPillarSlug: string,
        currentArticleSlug: string,
        limit: number
    ): Promise<Article[]> {
        const res = await strapiFetch<StrapiListResponse<StrapiArticleAttributes>>(
            "/api/articles",
            {
                "filters[spoke_meta][parent_pillar_slug][$eq]": parentPillarSlug,
                "filters[slug][$ne]": currentArticleSlug,
                ...sortDesc(),
                "pagination[limit]": String(limit),
            }
        );
        return res.data.map(strapiToArticle);
    }

    // -----------------------------------------------------------------------
    // getAllSlugs — lightweight fetch of all article slugs for link validation
    // -----------------------------------------------------------------------
    async getAllSlugs(): Promise<Set<string>> {
        const res = await strapiFetch<StrapiListResponse<{ slug: string }>>(
            "/api/articles",
            {
                "fields[0]": "slug",
                "pagination[pageSize]": "200",
            }
        );
        return new Set(res.data.map((d) => (d as any).slug ?? (d as any).attributes?.slug));
    }
}

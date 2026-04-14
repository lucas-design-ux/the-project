export type ArticleType = 'guide' | 'story' | 'news';

export interface RelatedTool {
    name: string;
    slug: string;
}

export interface SocialLinks {
    twitter?: string;
    linkedin?: string;
}

export interface Author {
    id: string;
    name: string;
    avatar: string;
    slug: string;
    bio?: string;
    socialLinks?: SocialLinks;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface SpokeMapping {
    h2_referenced: string;
    spoke_cms_id: string;
    suggested_topic: string;
    inserted_url: string;
}

export interface SpokeMeta {
    parent_pillar_slug: string;
    parent_pillar_title: string;
    parent_pillar_url?: string;
    spoke_cms_id?: string;
    original_h2?: string;
    editorial_angle?: string;
    target_reader?: string;
    spoke_url?: string;
}

export type ToolFormat = 'inline' | 'cta';

export interface InjectedTool {
    position: string;
    component: string;
    format: ToolFormat;
}

export interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string; // HTML content
    coverImage: string;
    publishedAt: string;
    author: Author;
    category: Category;
    readingTime: number; // in minutes
    featured: boolean;
    articleType: ArticleType;
    keyTakeaways: string[];
    relatedTool?: RelatedTool;
    // Pipeline-enriched fields (optional for backward compatibility)
    metaDescription?: string;
    tags?: string[];
    faqSection?: FAQItem[];
    schemaJsonLd?: Record<string, unknown>[];
    cmsSpokeMapping?: SpokeMapping[];
    tools?: InjectedTool[];
    spokeMeta?: SpokeMeta;
}

export interface CMSAdapter {
    getFeaturedArticle(): Promise<Article | null>;
    getHeroArticles(limit: number): Promise<Article[]>;
    getCuratedArticles(): Promise<Article[]>;
    getLatestArticles(params: { page: number; limit: number }): Promise<Article[]>;
    getArticleBySlug(slug: string): Promise<Article | null>;
    getArticlesByCategory(categorySlug: string, params: { page: number; limit: number }): Promise<{ articles: Article[]; totalPages: number }>;
    getArticlesByCategorySlugs(slugs: string[], limit: number): Promise<Record<string, Article[]>>;
    getAllCategories(): Promise<Category[]>;
    getRelatedArticles(currentArticleId: string): Promise<Article[]>;
    searchArticles(query: string): Promise<Article[]>;
    getPillarArticles(): Promise<Article[]>;
    getSiblingSpokes(parentPillarSlug: string, currentArticleSlug: string, limit: number): Promise<Article[]>;
}

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
}

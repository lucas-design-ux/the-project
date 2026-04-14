import { MetadataRoute } from 'next';
import { cms } from '@/lib/cms';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wealthlogik.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 1. Static Routes
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
        { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${SITE_URL}/tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
        { url: `${SITE_URL}/editorial-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
        { url: `${SITE_URL}/policy-and-privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    ];

    // 2. Tools Routes
    const toolRoutes: MetadataRoute.Sitemap = [
        'savings-goal-calculator',
        'wealth-growth-simulator',
        'debt-payoff-strategist',
        'freedom-fund-calculator'
    ].map(slug => ({
        url: `${SITE_URL}/tools/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
    }));

    // 3. Dynamic Categories
    const categories = await cms.getAllCategories();
    const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
        url: `${SITE_URL}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // 4. Dynamic Articles (Iteratively fetch to handle Strapi pagination limits)
    let allArticles = [];
    let page = 1;
    const limit = 50; // Use 50 to safely stay under Strapi's default limit of 100
    
    while (true) {
        const batch = await cms.getLatestArticles({ page, limit });
        allArticles.push(...batch);
        
        // If we received fewer articles than requested, we've reached the end
        if (batch.length < limit) {
            break;
        }
        page++;
    }

    const articleRoutes: MetadataRoute.Sitemap = allArticles.map((article) => ({
        url: `${SITE_URL}/${article.slug}`,
        lastModified: new Date(article.publishedAt || new Date()),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // Combine all routes
    return [...staticRoutes, ...toolRoutes, ...categoryRoutes, ...articleRoutes];
}

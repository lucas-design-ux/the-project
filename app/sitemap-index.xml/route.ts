import { NextResponse } from 'next/server';
import { cms } from '@/lib/cms';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wealthlogik.com';

/**
 * Sitemap Index — /sitemap-index.xml
 * ───────────────────────────────────
 * Generates the root sitemap index that references all sub-sitemaps.
 * Google crawls this file first, then follows each <sitemap> entry
 * to discover the hub-grouped URLs.
 *
 * Structure:
 *   /sitemap-index.xml          ← THIS FILE (index)
 *   /sitemap/0.xml              ← Static pages
 *   /sitemap/1.xml              ← Tools
 *   /sitemap/2.xml ... N.xml    ← One per hub/category
 */
export async function GET() {
    const categories = await cms.getAllCategories();
    const sortedCategories = categories.sort((a, b) => a.slug.localeCompare(b.slug));

    // Total sub-sitemaps: static (0) + tools (1) + categories (2..N)
    const totalSitemaps = 2 + sortedCategories.length;

    const sitemapEntries = Array.from({ length: totalSitemaps }, (_, i) => {
        return `  <sitemap>
    <loc>${SITE_URL}/sitemap/${i}.xml</loc>
  </sitemap>`;
    }).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}

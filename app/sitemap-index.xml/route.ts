import { NextResponse } from 'next/server';
import { generateSitemapIndexXml } from '@/lib/sitemap/generate';

/**
 * Re-generate the sitemap index every hour.
 */
export const revalidate = 3600;

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
    const xml = await generateSitemapIndexXml();

    return new NextResponse(xml, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}

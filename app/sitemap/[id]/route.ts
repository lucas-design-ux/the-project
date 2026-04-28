import { NextRequest, NextResponse } from 'next/server';
import { generateSubSitemapXml, getSitemapCount } from '@/lib/sitemap/generate';

/**
 * Re-generate sitemaps every hour to pick up new pipeline-published articles.
 * Next.js will serve the cached version and revalidate in the background.
 */
export const revalidate = 3600;

/**
 * Pre-render all sub-sitemap routes at build time so they are served
 * instantly from the CDN as static files.
 */
export async function generateStaticParams() {
    const count = await getSitemapCount();
    return Array.from({ length: count }, (_, i) => ({
        id: `${i}.xml`,
    }));
}

/**
 * GET /sitemap/[id].xml
 *
 * Returns a sub-sitemap as clean XML with explicit Content-Type and
 * Cache-Control headers. No Vary/RSC headers — Google can cache and
 * parse this reliably.
 */
export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: rawId } = await params;

    // Strip ".xml" suffix if present (route is /sitemap/[id] catching "0.xml")
    const numericId = Number(rawId.replace(/\.xml$/, ''));

    if (isNaN(numericId)) {
        return new NextResponse('Not Found', { status: 404 });
    }

    const xml = await generateSubSitemapXml(numericId);

    if (xml === null) {
        return new NextResponse('Not Found', { status: 404 });
    }

    return new NextResponse(xml, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
            'Vary': 'Accept-Encoding',
            'X-Robots-Tag': 'noindex',
        },
    });
}

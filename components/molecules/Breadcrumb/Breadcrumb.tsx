import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
    hubName: string;
    hubUrl: string;
    articleTitle: string;
    parentPillar?: {
        title: string;
        url: string;
    };
}

/**
 * Visual breadcrumb for spoke and pillar pages.
 *
 * Renders:  Home › [Hub Name] › ([Parent Pillar] ›) [Article Title]
 *
 * Also injects a `BreadcrumbList` JSON-LD schema for SEO.
 */
export default function Breadcrumb({ hubName, hubUrl, articleTitle, parentPillar }: BreadcrumbProps) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wealthlogik.com";

    const itemListElement = [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
        },
        {
            "@type": "ListItem",
            position: 2,
            name: hubName,
            item: hubUrl.startsWith("http") ? hubUrl : `${siteUrl}${hubUrl}`,
        },
    ];

    if (parentPillar) {
        itemListElement.push({
            "@type": "ListItem",
            position: 3,
            name: parentPillar.title,
            item: parentPillar.url.startsWith("http") ? parentPillar.url : `${siteUrl}${parentPillar.url}`,
        });
        itemListElement.push({
            "@type": "ListItem",
            position: 4,
            name: articleTitle,
            item: undefined as any, // Only URL is needed for intermediate, but omitted for current page
        });
    } else {
        itemListElement.push({
            "@type": "ListItem",
            position: 3,
            name: articleTitle,
            item: undefined as any,
        });
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: itemListElement.filter((i) => i.name),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                    <li>
                        <Link href="/" className="hover:text-foreground transition-colors">
                            Home
                        </Link>
                    </li>
                    <li aria-hidden="true">
                        <ChevronRight size={12} className="text-muted-foreground/50" />
                    </li>
                    <li className="max-w-[200px] sm:max-w-none">
                        <Link
                            href={hubUrl}
                            className="hover:text-foreground transition-colors truncate block"
                        >
                            {hubName}
                        </Link>
                    </li>
                    <li aria-hidden="true">
                        <ChevronRight size={12} className="text-muted-foreground/50" />
                    </li>

                    {parentPillar && (
                        <>
                            <li className="max-w-[200px] sm:max-w-none">
                                <Link
                                    href={parentPillar.url}
                                    className="hover:text-foreground transition-colors truncate block"
                                >
                                    {parentPillar.title}
                                </Link>
                            </li>
                            <li aria-hidden="true">
                                <ChevronRight size={12} className="text-muted-foreground/50" />
                            </li>
                        </>
                    )}

                    <li>
                        <span className="text-foreground/70 line-clamp-1" aria-current="page">
                            {articleTitle}
                        </span>
                    </li>
                </ol>
            </nav>
        </>
    );
}

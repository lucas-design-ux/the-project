import React from "react";

interface ArticleSchemaProps {
  title: string;
  slug: string;
  description: string;
  publishDate: string;
  modifiedDate: string;
  category: string;
  parentPillarTitle?: string;
  parentPillarUrl?: string;
}

export default function ArticleSchema({
  title,
  slug,
  description,
  publishDate,
  modifiedDate,
  category,
  parentPillarTitle,
  parentPillarUrl,
}: ArticleSchemaProps) {
  const articleUrl = `https://wealthlogik.com/article/${slug}`;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description: description,
          url: articleUrl,
          datePublished: publishDate,
          dateModified: modifiedDate,
          author: {
            "@type": "Organization",
            name: "WealthLogik Editorial Team",
            url: "https://wealthlogik.com/about",
            sameAs: [
              "https://www.linkedin.com/company/wealthlogik/",
              "https://x.com/wealthlogik"
            ]
          },
          editor: {
            "@type": "Person",
            name: "Lucas Melo",
            url: "https://wealthlogik.com/about",
            sameAs: "https://www.linkedin.com/in/melofrp/"
          },
          publisher: {
            "@type": "Organization",
            name: "WealthLogik",
            logo: {
              "@type": "ImageObject",
              url: "https://api.wealthlogik.com/uploads/Logo_Icon_011c57d67c.svg",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": articleUrl,
          },
          articleSection: category,
          isPartOf: parentPillarUrl
            ? {
                "@type": "WebPage",
                name: parentPillarTitle,
                url: parentPillarUrl,
              }
            : undefined,
        }),
      }}
    />
  );
}

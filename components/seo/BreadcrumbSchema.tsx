import React from "react";

interface BreadcrumbSchemaProps {
  hubTitle: string;
  hubUrl: string;
  articleTitle: string;
  articleUrl: string;
}

export default function BreadcrumbSchema({
  hubTitle,
  hubUrl,
  articleTitle,
  articleUrl,
}: BreadcrumbSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://wealthlogik.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: hubTitle,
              item: hubUrl,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: articleTitle,
              item: articleUrl,
            },
          ],
        }),
      }}
    />
  );
}

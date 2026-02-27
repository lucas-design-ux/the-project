import { Suspense } from "react";
import HeroSectionAsync from "@/components/organisms/HeroSection/HeroSectionAsync";
import HeroSectionSkeleton from "@/components/organisms/HeroSection/HeroSectionSkeleton";
import FeaturedArticlesGridAsync from "@/components/organisms/FeaturedArticlesGrid/FeaturedArticlesGridAsync";
import FeaturedArticlesGridSkeleton from "@/components/organisms/FeaturedArticlesGrid/FeaturedArticlesGridSkeleton";
import CategorySectionsGridAsync from "@/components/organisms/CategorySection/CategorySectionsGridAsync";
import CategorySectionsGridSkeleton from "@/components/organisms/CategorySection/CategorySectionsGridSkeleton";
import SideHustlesSectionAsync from "@/components/organisms/CategorySection/SideHustlesSectionAsync";
import SideHustlesSectionSkeleton from "@/components/organisms/CategorySection/SideHustlesSectionSkeleton";
import LatestArticlesFeedAsync from "@/components/organisms/LatestArticlesFeed/LatestArticlesFeedAsync";
import LatestArticlesFeedSkeleton from "@/components/organisms/LatestArticlesFeed/LatestArticlesFeedSkeleton";
import { Section } from "@/components/organisms/Section/Section";

export const revalidate = 3600; // Revalidate every hour

export default function Home() {
  return (
    <main className="flex flex-col">
      <Suspense fallback={<HeroSectionSkeleton />}>
        <HeroSectionAsync />
      </Suspense>

      <Section
        title="Editor's Picks"
        subtitle="Curated insights and analysis"
        className="border-t border-border"
      >
        <Suspense fallback={<FeaturedArticlesGridSkeleton />}>
          <FeaturedArticlesGridAsync />
        </Suspense>
      </Section>

      <Section className="border-t border-border pt-16 sm:pt-20">
        <Suspense fallback={<CategorySectionsGridSkeleton />}>
          <CategorySectionsGridAsync />
        </Suspense>
      </Section>

      <Section className="border-t border-border bg-muted/20">
        <Suspense fallback={<SideHustlesSectionSkeleton />}>
          <SideHustlesSectionAsync />
        </Suspense>
      </Section>

      <Section
        title="Latest Updates"
        subtitle="Fresh perspectives on personal finance"
        className="border-t border-border"
      >
        <Suspense fallback={<LatestArticlesFeedSkeleton />}>
          <LatestArticlesFeedAsync />
        </Suspense>
      </Section>
    </main>
  );
}

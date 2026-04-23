import { cms } from "@/lib/cms";
import FeaturedArticlesGrid from "@/components/organisms/FeaturedArticlesGrid/FeaturedArticlesGrid";

export default async function FeaturedArticlesGridAsync() {
    let pillarArticles;
    try {
        pillarArticles = await cms.getPillarArticles();
    } catch (error) {
        console.error("[FeaturedArticlesGridAsync] Failed to fetch pillar articles:", error);
        return null;
    }

    return <FeaturedArticlesGrid articles={pillarArticles} />;
}

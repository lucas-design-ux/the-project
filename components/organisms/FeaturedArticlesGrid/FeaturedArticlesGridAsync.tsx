import { cms } from "@/lib/cms";
import FeaturedArticlesGrid from "@/components/organisms/FeaturedArticlesGrid/FeaturedArticlesGrid";

export default async function FeaturedArticlesGridAsync() {
    const pillarArticles = await cms.getPillarArticles();

    return <FeaturedArticlesGrid articles={pillarArticles} />;
}

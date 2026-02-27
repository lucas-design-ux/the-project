import { cms } from "@/lib/cms/adapters/mock";
import FeaturedArticlesGrid from "@/components/organisms/FeaturedArticlesGrid/FeaturedArticlesGrid";

export default async function FeaturedArticlesGridAsync() {
    const curatedArticles = await cms.getCuratedArticles();

    return <FeaturedArticlesGrid articles={curatedArticles} />;
}

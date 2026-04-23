import { cms } from "@/lib/cms";
import LatestArticlesFeed from "@/components/organisms/LatestArticlesFeed/LatestArticlesFeed";

export default async function LatestArticlesFeedAsync() {
    let latestArticles;
    try {
        latestArticles = await cms.getLatestArticles({ page: 1, limit: 12 });
    } catch (error) {
        console.error("[LatestArticlesFeedAsync] Failed to fetch latest articles:", error);
        return null;
    }

    return <LatestArticlesFeed articles={latestArticles} />;
}

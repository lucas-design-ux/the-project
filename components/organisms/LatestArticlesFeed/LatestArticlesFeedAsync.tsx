import { cms } from "@/lib/cms";
import LatestArticlesFeed from "@/components/organisms/LatestArticlesFeed/LatestArticlesFeed";

export default async function LatestArticlesFeedAsync() {
    const latestArticles = await cms.getLatestArticles({ page: 1, limit: 12 });

    return <LatestArticlesFeed articles={latestArticles} />;
}

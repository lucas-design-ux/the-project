import { cms } from "@/lib/cms";
import HeroSection from "@/components/organisms/HeroSection/HeroSection";

export default async function HeroSectionAsync() {
    let heroArticles;
    try {
        heroArticles = await cms.getHeroArticles(10);
    } catch (error) {
        console.error("[HeroSectionAsync] Failed to fetch hero articles:", error);
        return null;
    }

    if (!heroArticles || heroArticles.length === 0) {
        return null;
    }

    const mainArticles = heroArticles.slice(0, 6);
    const sliderArticles = heroArticles.slice(6, 10);

    return <HeroSection mainArticles={mainArticles} sliderArticles={sliderArticles} />;
}

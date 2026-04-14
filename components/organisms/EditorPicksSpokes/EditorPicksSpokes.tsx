import { cms } from "@/lib/cms";
import ArticleCard from "@/components/molecules/ArticleCard/ArticleCard";

interface EditorPicksSpokesProps {
    parentPillarSlug: string;
    currentArticleSlug: string;
}

export default async function EditorPicksSpokes({
    parentPillarSlug,
    currentArticleSlug,
}: EditorPicksSpokesProps) {
    const siblingSpokes = await cms.getSiblingSpokes(
        parentPillarSlug,
        currentArticleSlug,
        4
    );

    if (!siblingSpokes || siblingSpokes.length === 0) return null;

    return (
        <section className="border-t border-border py-12 sm:py-16">
            <div className="editorial-container">
                <div className="mb-12">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">
                        Editor&apos;s Picks
                    </p>
                    <h2 className="text-3xl font-bold font-serif tracking-tight">
                        More From This Series
                    </h2>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {siblingSpokes.map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            variant="compact"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { cms } from "@/lib/cms/adapters/mock";
import ArticleHeader from "@/components/organisms/ArticleHeader/ArticleHeader";
import ArticleHeaderSkeleton from "@/components/organisms/ArticleHeader/ArticleHeaderSkeleton";
import ArticleBody from "@/components/organisms/ArticleBody/ArticleBody";
import KeyTakeawaysBox from "@/components/molecules/KeyTakeawaysBox/KeyTakeawaysBox";
import KeyTakeawaysBoxSkeleton from "@/components/molecules/KeyTakeawaysBox/KeyTakeawaysBoxSkeleton";
import AuthorBio from "@/components/organisms/AuthorBio/AuthorBio";
import NextStepsSection from "@/components/organisms/NextStepsSection/NextStepsSection";
import RelatedArticles from "@/components/organisms/RelatedArticles/RelatedArticles";
import { Container } from "@/components/atoms/Container/Container";

export const revalidate = 3600;

type ArticlePageParams = Promise<{ slug: string }>;

interface ArticlePageProps {
    params: ArticlePageParams;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await cms.getArticleBySlug(slug);

    if (!article) {
        return {
            title: "Article Not Found",
        };
    }

    return {
        title: `${article.title} | MoneyHub`,
        description: article.excerpt,
        openGraph: {
            images: [article.coverImage],
        },
    };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;
    const article = await cms.getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    const relatedArticles = await cms.getRelatedArticles(article.id);

    return (
        <article className="min-h-screen">
            <Container className="py-16 lg:py-32">
                <div className="mx-auto max-w-5xl"> {/* Keep inner constraint for reading width */}
                    <Suspense fallback={<ArticleHeaderSkeleton />}>
                        <ArticleHeader article={article} />
                    </Suspense>

                    <div className="mx-auto max-w-3xl mt-24">
                        <Suspense fallback={<KeyTakeawaysBoxSkeleton />}>
                            <KeyTakeawaysBox takeaways={article.keyTakeaways} />
                        </Suspense>

                        <div className="mt-24">
                            <ArticleBody rawHtmlContent={article.content} />
                        </div>

                        <div className="mt-24">
                            <NextStepsSection relatedTool={article.relatedTool} />
                        </div>

                        <div className="mt-24 border-t border-border pt-16">
                            <AuthorBio author={article.author} />
                        </div>
                    </div>
                </div>
            </Container>

            <section className="border-t border-border bg-muted/30 py-24">
                <Container>
                    <RelatedArticles articles={relatedArticles} />
                </Container>
            </section>
        </article>
    );
}

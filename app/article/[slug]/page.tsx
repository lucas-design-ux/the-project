import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { cms } from "@/lib/cms";
import ArticleHeader from "@/components/organisms/ArticleHeader/ArticleHeader";
import ArticleHeaderSkeleton from "@/components/organisms/ArticleHeader/ArticleHeaderSkeleton";
import { ArticleRenderer } from "@/components/organisms/ArticleRenderer/ArticleRenderer";
import Breadcrumb from "@/components/molecules/Breadcrumb/Breadcrumb";
import ExecutiveSummary from "@/components/molecules/ExecutiveSummary/ExecutiveSummary";
import AuthorBio from "@/components/organisms/AuthorBio/AuthorBio";
import NextStepsSection from "@/components/organisms/NextStepsSection/NextStepsSection";
import RelatedArticles from "@/components/organisms/RelatedArticles/RelatedArticles";
import EditorPicksSpokes from "@/components/organisms/EditorPicksSpokes/EditorPicksSpokes";
import { Container } from "@/components/atoms/Container/Container";
import ReadingProgressBar from "@/components/atoms/ReadingProgressBar/ReadingProgressBar";
import AdSlot from "@/components/atoms/AdSlot/AdSlot";
import PushNotificationBannerClient from "@/components/molecules/PushNotificationBanner/PushNotificationBannerClient";
import ArticleSchema from "@/components/seo/ArticleSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import RelatedLinkBanner from "@/components/molecules/RelatedLinkBanner/RelatedLinkBanner";

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
        title: `${article.title} | Wealth Logik`,
        description: article.metaDescription ?? article.excerpt,
        openGraph: {
            title: article.title,
            description: article.metaDescription ?? article.excerpt,
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
            <ReadingProgressBar />

            {/* Local Module JSON-LD Schemas */}
            <ArticleSchema
                title={article.title}
                slug={article.slug}
                description={article.metaDescription ?? article.excerpt}
                publishDate={article.publishedAt}
                modifiedDate={article.publishedAt}
                category={article.category.name}
                parentPillarTitle={article.spokeMeta?.parent_pillar_title}
                parentPillarUrl={article.spokeMeta?.parent_pillar_url}
            />

            {article.faqSection && <FAQSchema faqs={article.faqSection} />}

            <Container className="py-16 lg:py-32">
                <div className="mx-auto max-w-5xl">
                    {/* Breadcrumb — show category path */}
                    <Breadcrumb
                        hubName={article.category.name}
                        hubUrl={`/category/${article.category.slug}`}
                        articleTitle={article.title}
                        parentPillar={
                            article.spokeMeta?.parent_pillar_title && article.spokeMeta?.parent_pillar_url
                                ? {
                                      title: article.spokeMeta.parent_pillar_title,
                                      url: article.spokeMeta.parent_pillar_url,
                                  }
                                : undefined
                        }
                    />

                    <Suspense fallback={<ArticleHeaderSkeleton />}>
                        <ArticleHeader article={article} />
                    </Suspense>

                    {/* Executive Summary — "In 30 seconds:" */}
                    <ExecutiveSummary takeaways={article.keyTakeaways} />

                    {article.spokeMeta?.parent_pillar_url && article.spokeMeta?.parent_pillar_title && (
                        <RelatedLinkBanner
                            url={article.spokeMeta.parent_pillar_url}
                            title={article.spokeMeta.parent_pillar_title}
                            label="Part of our comprehensive guide on"
                        />
                    )}

                    {/* Leaderboard ad — below summary, above content */}
                    <div className="mt-8">
                        <AdSlot variant="leaderboard" />
                    </div>

                    {/* Two-column layout: content + sidebar */}
                    <div className="mt-16 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
                        {/* Main content column */}
                        <div className="min-w-0">
                            <ArticleRenderer
                                content_html={article.content}
                                tools={article.tools}
                                cmsSpokeMapping={article.cmsSpokeMapping}
                            />

                            <div className="mt-10">
                                <NextStepsSection relatedTool={article.relatedTool} />
                            </div>

                            <div className="mt-10 border-t border-border pt-8">
                                <AuthorBio author={article.author} />
                            </div>
                        </div>

                        {/* Sidebar — visible on lg+ screens */}
                        <aside className="hidden lg:block" aria-label="Sidebar">
                            <div className="sticky top-24 space-y-8">
                                <AdSlot variant="rectangle" />
                                <AdSlot variant="skyscraper" />
                            </div>
                        </aside>
                    </div>
                </div>
            </Container>

            <section className="border-t border-border bg-muted/30 py-12 sm:py-16">
                <Container>
                    <RelatedArticles articles={relatedArticles} />
                </Container>
            </section>

            {/* Editor's Picks: sibling spokes from the same pillar series */}
            {article.spokeMeta?.parent_pillar_slug && (
                <EditorPicksSpokes
                    parentPillarSlug={article.spokeMeta.parent_pillar_slug}
                    currentArticleSlug={article.slug}
                />
            )}

            {/* Web Push Notification — lazy loaded, appears at 85% scroll */}
            <PushNotificationBannerClient />
        </article>
    );
}

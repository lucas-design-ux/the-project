import Link from "next/link";
import { Metadata } from "next";
import { cms } from "@/lib/cms/adapters/mock";
import ArticleGrid from "@/components/organisms/ArticleGrid/ArticleGrid";
import { Container } from "@/components/atoms/Container/Container";
import { Section } from "@/components/organisms/Section/Section";

type SearchPageSearchParams = Promise<{ q?: string }>;

interface SearchPageProps {
    searchParams: SearchPageSearchParams;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
    const { q } = await searchParams;
    return {
        title: `Search Results for "${q || ''}" | MoneyHub`,
        description: `Search results for ${q}`,
    };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q } = await searchParams;
    const query = q || '';
    const articles = query ? await cms.searchArticles(query) : [];

    return (
        <Container className="py-32 md:py-48 lg:py-64">
            <div className="mb-24 space-y-6 text-center">
                <h1 className="font-serif text-4xl font-normal tracking-tight md:text-5xl lg:text-6xl">
                    {query ? (
                        <>
                            Results for <span className="italic text-muted-foreground">"{query}"</span>
                        </>
                    ) : (
                        "Search"
                    )}
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                    {articles.length} {articles.length === 1 ? 'result' : 'results'} found
                </p>
            </div>

            {articles.length > 0 ? (
                <ArticleGrid articles={articles} />
            ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <p className="text-lg text-muted-foreground">
                        We couldn't find any articles matching your search.
                    </p>
                    <Link href="/" className="mt-8 text-sm font-medium underline underline-offset-4 hover:text-primary">
                        Return Home
                    </Link>
                </div>
            )}
        </Container>
    );
}

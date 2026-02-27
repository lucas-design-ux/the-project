import { notFound } from "next/navigation";
import { Metadata } from "next";
import { cms } from "@/lib/cms/adapters/mock";
import CategoryHeader from "@/components/organisms/CategoryHeader/CategoryHeader";
import ArticleGrid from "@/components/organisms/ArticleGrid/ArticleGrid";
import Pagination from "@/components/molecules/Pagination/Pagination";
import { Container } from "@/components/atoms/Container/Container";

export const revalidate = 3600;

type CategoryPageParams = Promise<{ slug: string }>;
type CategoryPageSearchParams = Promise<{ page?: string }>;

interface CategoryPageProps {
    params: CategoryPageParams;
    searchParams: CategoryPageSearchParams;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { slug } = await params;
    const categories = await cms.getAllCategories();
    const category = categories.find((c) => c.slug === slug);

    if (!category) {
        return {
            title: "Category Not Found",
        };
    }

    return {
        title: `${category.name} | Master Template`,
        description: category.description,
    };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { slug } = await params;
    const { page: pageParam } = await searchParams;
    const categories = await cms.getAllCategories();
    const category = categories.find((c) => c.slug === slug);

    if (!category) {
        notFound();
    }

    const page = Number(pageParam) || 1;
    const limit = 1;

    // Updated CMS call with destructuring
    const { articles, totalPages } = await cms.getArticlesByCategory(slug, { page, limit });

    return (
        <Container className="py-16 sm:py-20">
            <CategoryHeader category={category} />
            <div className="mt-12">
                <ArticleGrid articles={articles} />
                <Pagination currentPage={page} totalPages={totalPages} basePath={`/category/${slug}`} />
            </div>
        </Container>
    );
}

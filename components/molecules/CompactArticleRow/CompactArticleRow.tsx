import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/cms/interface";

interface CompactArticleRowProps {
    article: Article;
}

export default function CompactArticleRow({ article }: CompactArticleRowProps) {
    return (
        <article className="group flex gap-4 py-4 border-b border-border border-dashed last:border-0" data-testid="compact-article-row">
            <Link href={`/article/${article.slug}`} className="relative h-20 w-24 shrink-0 overflow-hidden bg-muted">
                <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100px, 120px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </Link>
            <div className="flex flex-col grow justify-center">
                <Link href={`/category/${article.category.slug}`} className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
                    {article.category.name}
                </Link>
                <Link href={`/article/${article.slug}`}>
                    <h3 className="font-serif font-normal text-foreground group-hover:opacity-70 transition-opacity leading-snug" style={{ fontSize: '1.1rem' }}>
                        {article.title}
                    </h3>
                </Link>
            </div>
        </article>
    );
}

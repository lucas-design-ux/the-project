import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/cms/interface";

interface ArticleHeaderProps {
    article: Article;
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
    return (
        <header className="space-y-10 pb-0">
            <div className="space-y-8">
                <Link
                    href={`/category/${article.category.slug}`}
                    className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
                >
                    {article.category.name}
                </Link>
                <h1 className="font-serif text-5xl font-normal leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                    {article.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-6 border-t border-border/50">
                    <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                            {article.author.name === "WealthLogik Editorial" ? (
                                <div className="flex h-full w-full items-center justify-center bg-foreground text-background font-serif font-bold tracking-widest text-sm">
                                    WL
                                </div>
                            ) : (
                                <Image
                                    src={article.author.avatar}
                                    alt={article.author.name}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-medium text-foreground">{article.author.name}</span>
                            <div className="flex items-center gap-2 text-xs">
                                <time dateTime={article.publishedAt}>
                                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </time>
                                <span>·</span>
                                <span>{article.readingTime} min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <figure className="relative aspect-[16/9] w-full overflow-hidden bg-muted rounded-sm">
                <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                />
            </figure>
        </header>
    );
}

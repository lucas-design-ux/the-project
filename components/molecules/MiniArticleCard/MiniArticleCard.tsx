import Link from 'next/link';
import { Article } from '@/lib/cms/interface';

interface MiniArticleCardProps {
    article: Article;
}

export default function MiniArticleCard({ article }: MiniArticleCardProps) {
    const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <Link
            href={`/article/${article.slug}`}
            className="group flex flex-col gap-1 py-2.5 border-b border-border/60 last:border-b-0 hover:opacity-70 transition-opacity"
        >
            <span className="font-serif text-foreground leading-snug" style={{ fontSize: '0.9rem' }}>
                {article.title}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                {formattedDate}
            </span>
        </Link>
    );
}

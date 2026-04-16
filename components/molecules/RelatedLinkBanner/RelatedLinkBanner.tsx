import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedLinkBannerProps {
    url: string;
    title: string;
    label?: string;
    className?: string;
}

export default function RelatedLinkBanner({
    url,
    title,
    label = "Read also",
    className = "",
}: RelatedLinkBannerProps) {
    return (
        <Link
            href={url}
            className={`group block w-full p-[20px] border border-black dark:border-white rounded-none bg-transparent hover:bg-muted/50 transition-colors my-8 ${className}`}
        >
            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                        {label}
                    </span>
                    <span className="text-xl font-serif font-medium leading-tight text-foreground">
                        {title}
                    </span>
                </div>
                <div className="shrink-0">
                    <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    );
}

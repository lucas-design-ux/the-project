import Link from "next/link";

interface ToolSuggestionBannerProps {
    toolName: string;
    toolSlug: string;
    description?: string;
}

export default function ToolSuggestionBanner({ toolName, toolSlug, description }: ToolSuggestionBannerProps) {
    return (
        <Link href={`/tools/${toolSlug}`} className="block group" data-testid="tool-suggestion-banner">
            <div className="bg-muted/50 p-4 rounded-lg border border-border transition-colors hover:border-foreground/30 flex items-center justify-between gap-4">
                <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">
                        Try our Tool
                    </div>
                    <div className="font-serif text-lg font-normal text-foreground group-hover:opacity-80 transition-opacity">
                        {toolName}
                    </div>
                    {description && (
                        <p className="text-[13px] text-muted-foreground mt-1 max-w-sm">{description}</p>
                    )}
                </div>
                <div className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors hidden sm:block">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                    </svg>
                </div>
            </div>
        </Link>
    );
}

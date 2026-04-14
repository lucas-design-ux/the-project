import Link from "next/link";
import { RelatedTool } from "@/lib/cms/interface";

interface NextStepsSectionProps {
    relatedTool?: RelatedTool;
}

export default function NextStepsSection({ relatedTool }: NextStepsSectionProps) {
    return (
        <div className="my-16 rounded-lg border-2 border-primary/15 bg-card p-10 md:p-12 shadow-sm">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label="rocket">🚀</span>
                    <h3 className="text-3xl font-bold font-serif">What to Do Now</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Reading is great, but action is what creates change. Here&apos;s your next move:
                </p>
                <div className="space-y-4">
                    {relatedTool ? (
                        <Link
                            href={`/tools/${relatedTool.slug}`}
                            className="group flex items-center justify-between rounded-lg border border-primary/20 bg-background p-6 md:p-8 transition-all hover:bg-primary/5 hover:border-primary/40 hover:shadow-md"
                        >
                            <div className="flex items-center gap-5">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl transition-transform group-hover:scale-110">
                                    📊
                                </div>
                                <div>
                                    <p className="font-semibold text-xl font-serif">Try the {relatedTool.name}</p>
                                    <p className="text-muted-foreground mt-1">Put these numbers to work for you</p>
                                </div>
                            </div>
                            <span className="shrink-0 rounded-none bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all group-hover:bg-primary/90 group-hover:shadow-lg">
                                Start Now →
                            </span>
                        </Link>
                    ) : (
                        <div className="space-y-4">
                            <div className="rounded-lg border border-border bg-background p-6 md:p-8">
                                <p className="text-lg text-muted-foreground">
                                    Start by taking one small action from this article today. That&apos;s how momentum builds.
                                </p>
                            </div>
                            <Link
                                href="/tools"
                                className="group inline-flex items-center gap-2 rounded-none bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
                            >
                                Explore Our Free Tools
                                <span className="transition-transform group-hover:translate-x-1">→</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

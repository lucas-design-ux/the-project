import Link from "next/link";
import { RelatedTool } from "@/lib/cms/interface";

interface NextStepsSectionProps {
    relatedTool?: RelatedTool;
}

export default function NextStepsSection({ relatedTool }: NextStepsSectionProps) {
    return (
        <div className="my-16 rounded-lg border-2 border-accent/20 bg-accent/5 p-12">
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <h3 className="text-3xl font-bold font-serif">What to Do Now</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Reading is great, but action is what creates change. Here's your next move:
                </p>
                <div className="space-y-4">
                    {relatedTool ? (
                        <Link
                            href={`/tools/${relatedTool.slug}`}
                            className="flex items-center justify-between rounded-lg border border-accent/30 bg-background p-8 transition-colors hover:bg-accent/10"
                        >
                            <div className="flex items-center gap-6">
                                <div>
                                    <p className="font-semibold text-xl font-serif">Try the {relatedTool.name}</p>
                                    <p className="text-muted-foreground">Put these numbers to work for you</p>
                                </div>
                            </div>
                            <div className="text-sm font-bold uppercase tracking-widest text-accent">
                                Start Now
                            </div>
                        </Link>
                    ) : (
                        <div className="rounded-lg border border-border bg-background p-8">
                            <p className="text-lg text-muted-foreground">
                                Start by taking one small action from this article today. That's how momentum builds.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

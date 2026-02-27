export default function CategorySectionSkeleton() {
    return (
        <section className="flex flex-col h-full animate-pulse" data-testid="category-section-skeleton">
            <div className="mb-6 border-b-[3px] border-border pb-2 flex justify-between">
                <div className="h-8 w-1/2 bg-muted rounded"></div>
            </div>

            <div className="mb-4 space-y-3">
                <div className="aspect-video w-full bg-muted rounded"></div>
                <div className="h-4 w-1/4 bg-muted rounded"></div>
                <div className="h-6 w-full bg-muted rounded"></div>
                <div className="h-6 w-3/4 bg-muted rounded"></div>
            </div>

            <div className="flex flex-col flex-1 border-t border-border mt-2 pt-2">
                {[1, 2].map((i) => (
                    <div key={i} className="flex gap-4 py-4 border-b border-border border-dashed last:border-0">
                        <div className="h-20 w-24 shrink-0 bg-muted rounded"></div>
                        <div className="flex flex-col justify-center grow space-y-2">
                            <div className="h-3 w-1/4 bg-muted rounded"></div>
                            <div className="h-4 w-full bg-muted rounded"></div>
                            <div className="h-4 w-3/4 bg-muted rounded"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-auto pt-4 border-t border-border">
                <div className="h-[74px] w-full bg-muted rounded-lg border border-border"></div>
            </div>
        </section>
    );
}

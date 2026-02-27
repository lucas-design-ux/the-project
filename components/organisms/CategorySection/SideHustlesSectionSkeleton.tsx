// Use a simple markup since ArticleCardSkeleton might not support variant prop or might not be easily imported here
export default function SideHustlesSectionSkeleton() {
    return (
        <section className="flex flex-col animate-pulse" data-testid="side-hustles-skeleton">
            <div className="mb-8 border-b-[3px] border-border pb-2 flex justify-between">
                <div className="h-10 w-48 bg-muted rounded"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col gap-3">
                        <div className="aspect-video w-full bg-muted rounded"></div>
                        <div className="h-4 w-1/3 bg-muted rounded"></div>
                        <div className="h-6 w-full bg-muted rounded"></div>
                        <div className="h-6 w-5/6 bg-muted rounded"></div>
                    </div>
                ))}
            </div>

            <div className="max-w-2xl mx-auto w-full">
                <div className="h-[90px] w-full bg-muted rounded-lg border border-border"></div>
            </div>
        </section>
    );
}

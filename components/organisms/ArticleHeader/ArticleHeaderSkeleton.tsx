import SkeletonLoader from "@/components/atoms/SkeletonLoader/SkeletonLoader";

export default function ArticleHeaderSkeleton() {
    return (
        <header className="mx-auto max-w-3xl space-y-10 pb-12" aria-busy="true">
            <div className="space-y-8">
                {/* Category label */}
                <SkeletonLoader width="w-24" height="h-3" />

                {/* Title - 3 lines, large size */}
                <div className="space-y-4">
                    <SkeletonLoader width="w-full" height="h-16" />
                    <SkeletonLoader width="w-full" height="h-16" />
                    <SkeletonLoader width="w-2/3" height="h-16" />
                </div>

                {/* Author metadata */}
                <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                    <div className="flex items-center gap-3">
                        <SkeletonLoader width="w-12" height="h-12" rounded="full" />
                        <div className="flex flex-col gap-1">
                            <SkeletonLoader width="w-32" height="h-4" />
                            <div className="flex items-center gap-2">
                                <SkeletonLoader width="w-24" height="h-3" />
                                <SkeletonLoader width="w-1" height="h-3" rounded="full" />
                                <SkeletonLoader width="w-16" height="h-3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cover image skeleton */}
            <SkeletonLoader
                className="aspect-[16/9]"
                height="h-auto"
                rounded="sm"
            />
        </header>
    );
}

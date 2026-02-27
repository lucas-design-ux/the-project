import SkeletonLoader from "@/components/atoms/SkeletonLoader/SkeletonLoader";

interface ArticleCardSkeletonProps {
    className?: string;
}

export default function ArticleCardSkeleton({ className = "" }: ArticleCardSkeletonProps) {
    return (
        <article className={`flex flex-col ${className}`} aria-busy="true">
            {/* Image skeleton - matching aspect-[4/3] from ArticleCard */}
            <div className="relative mb-4">
                <SkeletonLoader
                    className="aspect-[4/3]"
                    height="h-auto"
                    rounded="sm"
                />
            </div>

            {/* Content skeleton */}
            <div className="flex flex-col space-y-3">
                {/* Category label */}
                <SkeletonLoader width="w-20" height="h-3" />

                {/* Title - 2 lines */}
                <div className="space-y-2">
                    <SkeletonLoader width="w-full" height="h-7" />
                    <SkeletonLoader width="w-4/5" height="h-7" />
                </div>

                {/* Excerpt - 3 lines */}
                <div className="space-y-2">
                    <SkeletonLoader width="w-full" height="h-4" />
                    <SkeletonLoader width="w-full" height="h-4" />
                    <SkeletonLoader width="w-3/4" height="h-4" />
                </div>

                {/* Meta info */}
                <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <SkeletonLoader width="w-16" height="h-3" />
                    <SkeletonLoader width="w-1" height="h-3" rounded="full" />
                    <SkeletonLoader width="w-20" height="h-3" />
                    <SkeletonLoader width="w-1" height="h-3" rounded="full" />
                    <SkeletonLoader width="w-14" height="h-3" />
                </div>
            </div>
        </article>
    );
}

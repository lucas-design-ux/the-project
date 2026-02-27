import SkeletonLoader from "@/components/atoms/SkeletonLoader/SkeletonLoader";

export default function KeyTakeawaysBoxSkeleton() {
    return (
        <div
            className="border border-border bg-card p-6 space-y-4"
            aria-busy="true"
        >
            {/* Title */}
            <div className="flex items-center gap-2">
                <SkeletonLoader width="w-5" height="h-5" rounded="full" />
                <SkeletonLoader width="w-32" height="h-5" />
            </div>

            {/* List items */}
            <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <SkeletonLoader width="w-6" height="h-6" rounded="full" className="flex-shrink-0" />
                        <SkeletonLoader
                            width={index === 3 ? "w-3/4" : "w-full"}
                            height="h-4"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

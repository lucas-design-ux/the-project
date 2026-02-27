import CategorySectionSkeleton from "./CategorySectionSkeleton";

export default function CategorySectionsGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-12 lg:gap-y-12">
            {[1, 2, 3, 4, 5, 6].map(i => (
                <CategorySectionSkeleton key={i} />
            ))}
        </div>
    );
}

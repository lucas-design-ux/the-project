import { Category } from "@/lib/cms/interface";

interface CategoryHeaderProps {
    category: Category;
}

export default function CategoryHeader({ category }: CategoryHeaderProps) {
    return (
        <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                {category.name}
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                {category.description}
            </p>
        </div>
    );
}

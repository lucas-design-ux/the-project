interface SkeletonLoaderProps {
    className?: string;
    width?: string;
    height?: string;
    rounded?: "none" | "sm" | "md" | "lg" | "full";
}

export default function SkeletonLoader({
    className = "",
    width = "w-full",
    height = "h-4",
    rounded = "sm"
}: SkeletonLoaderProps) {
    const roundedClass = {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
    }[rounded];

    return (
        <div
            className={`animate-pulse bg-muted ${width} ${height} ${roundedClass} ${className}`}
            aria-hidden="true"
        />
    );
}

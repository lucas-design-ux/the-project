import Link from 'next/link';
import { cn } from '@/lib/utils';


interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
    if (totalPages <= 1) return null;

    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    const getPageUrl = (page: number) => {
        // If base path already has query params, append &page=, else ?page=
        const separator = basePath.includes('?') ? '&' : '?';
        return `${basePath}${separator}page=${page}`;
    };

    return (
        <nav className="flex items-center justify-center gap-2 mt-16" aria-label="Pagination">
            {prevPage ? (
                <Link
                    href={getPageUrl(prevPage)}
                    className={cn(
                        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
                        "h-9 px-4 py-2"
                    )}
                >
                    Previous
                </Link>
            ) : (
                <button
                    disabled
                    className={cn(
                        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
                        "h-9 px-4 py-2 opacity-50 cursor-not-allowed"
                    )}
                >
                    Previous
                </button>
            )}

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Basic logic to show current, first, last, and surrounding pages could be added here for large page counts.
                    // For now, listing all since we don't expect hundreds of pages in this demo.
                    const isCurrent = page === currentPage;
                    return (
                        <Link
                            key={page}
                            href={getPageUrl(page)}
                            className={cn(
                                "w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium transition-colors",
                                isCurrent
                                    ? "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
                                    : "hover:bg-accent hover:text-accent-foreground"
                            )}
                            aria-current={isCurrent ? 'page' : undefined}
                        >
                            {page}
                        </Link>
                    );
                })}
            </div>

            {/* Next Button */}
            {nextPage ? (
                <Link
                    href={getPageUrl(nextPage)}
                    className={cn(
                        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
                        "h-9 px-4 py-2"
                    )}
                >
                    Next
                </Link>
            ) : (
                <button
                    disabled
                    className={cn(
                        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
                        "h-9 px-4 py-2 opacity-50 cursor-not-allowed"
                    )}
                >
                    Next
                </button>
            )}
        </nav>
    );
}

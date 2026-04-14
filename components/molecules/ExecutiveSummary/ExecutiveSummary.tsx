interface ExecutiveSummaryProps {
    takeaways: string[];
}

/**
 * "In 30 seconds:" block — a scannable executive summary placed
 * between the article header and the main content.
 *
 * Uses a left accent border + subtle background differentiation
 * to stand out from the body copy without being intrusive.
 */
export default function ExecutiveSummary({ takeaways }: ExecutiveSummaryProps) {
    if (!takeaways || takeaways.length === 0) return null;

    // Take a maximum of 4 bullet points
    const items = takeaways.slice(0, 4);

    return (
        <div className="my-10 border-l-4 border-primary bg-muted/40 px-6 py-6 md:px-8 md:py-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-4">
                In 30 seconds:
            </p>
            <ul className="space-y-3">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                    >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[0.625rem] font-bold text-primary">
                            {index + 1}
                        </span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

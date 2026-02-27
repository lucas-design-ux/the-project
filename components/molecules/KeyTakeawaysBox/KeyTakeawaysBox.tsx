interface KeyTakeawaysBoxProps {
    takeaways: string[];
}

export default function KeyTakeawaysBox({ takeaways }: KeyTakeawaysBoxProps) {
    if (!takeaways || takeaways.length === 0) return null;

    return (
        <div className="my-12 rounded-lg border-2 border-primary/20 bg-primary/5 p-10">
            <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Key Insights</span>
            </div>
            <ul className="space-y-6">
                {takeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-4 text-base leading-relaxed">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {index + 1}
                        </span>
                        <span className="text-foreground">{takeaway}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

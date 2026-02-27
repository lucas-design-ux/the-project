interface ActionStepProps {
    number: number;
    title: string;
    children: React.ReactNode;
}

export default function ActionStep({ number, title, children }: ActionStepProps) {
    return (
        <div className="my-8 flex gap-5 border-t border-border pt-6 first:border-t-0 first:pt-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-primary bg-background text-lg font-bold text-primary">
                {number}
            </div>
            <div className="flex-1 space-y-3">
                <h3 className="font-serif text-xl font-bold text-foreground">{title}</h3>
                <div className="text-muted-foreground leading-relaxed">{children}</div>
            </div>
        </div>
    );
}

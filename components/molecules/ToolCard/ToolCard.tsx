'use client';

import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Card } from "@/components/atoms/Card/Card";

interface Tool {
    slug: string;
    name: string;
    description: string;
}

interface ToolCardProps {
    tool: Tool;
    index: number;
}

export function ToolCard({ tool, index }: ToolCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseEnter = () => {
            gsap.to(card, {
                y: -6,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.in',
            });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <Link href={`/tools/${tool.slug}`} className="block h-full">
            <Card
                ref={cardRef}
                className="tool-card group h-full p-8 md:p-12 transition-colors duration-300 hover:border-foreground/20 flex flex-col"
            >
                <div className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
                    Tool {String(index + 1).padStart(2, '0')}
                </div>
                <h2
                    className="font-serif text-2xl md:text-3xl font-normal mb-4 group-hover:opacity-70 transition-opacity leading-tight"
                    title={tool.name}
                >
                    {tool.name}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-8 grow">
                    {tool.description}
                </p>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground mt-auto">
                    <span>Try it now</span>
                </div>
            </Card>
        </Link>
    );
}

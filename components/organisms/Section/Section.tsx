import { Container } from '@/components/atoms/Container/Container';
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    className?: string;
    id?: string;
}

export function Section({ children, title, subtitle, className = '', id }: SectionProps) {
    return (
        <section id={id} className={cn("py-10 sm:py-16 lg:py-20", className)}>
            <Container>
                {(title || subtitle) && (
                    <div className="mb-6 sm:mb-10 space-y-2 sm:space-y-4">
                        {title && (
                            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="max-w-2xl text-sm sm:text-lg text-muted-foreground">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}
                {children}
            </Container>
        </section>
    );
}

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    function Card({ children, className, ...props }, ref) {
        return (
            <div
                ref={ref}
                className={cn(
                    "bg-white dark:bg-card border border-border rounded-lg shadow-sm overflow-hidden",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

'use client';

import { ButtonHTMLAttributes, forwardRef, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            loading = false,
            disabled,
            children,
            onMouseEnter,
            onMouseLeave,
            ...props
        },
        ref
    ) => {
        const buttonRef = useRef<HTMLButtonElement>(null);

        // GSAP hover animation
        useEffect(() => {
            const button = buttonRef.current;
            if (!button || loading || disabled) return;

            const handleMouseEnter = (e: MouseEvent) => {
                gsap.to(button, {
                    y: -2,
                    duration: 0.2,
                    ease: 'power1.out',
                });

                // Call custom onMouseEnter if provided
                onMouseEnter?.(e as any);
            };

            const handleMouseLeave = (e: MouseEvent) => {
                gsap.to(button, {
                    y: 0,
                    duration: 0.2,
                    ease: 'power1.in',
                });

                // Call custom onMouseLeave if provided
                onMouseLeave?.(e as any);
            };

            button.addEventListener('mouseenter', handleMouseEnter);
            button.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                button.removeEventListener('mouseenter', handleMouseEnter);
                button.removeEventListener('mouseleave', handleMouseLeave);
            };
        }, [loading, disabled, onMouseEnter, onMouseLeave]);

        // Merge refs
        const setRefs = (element: HTMLButtonElement) => {
            buttonRef.current = element;
            if (typeof ref === 'function') {
                ref(element);
            } else if (ref) {
                ref.current = element;
            }
        };

        const baseStyles =
            'inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

        const variantStyles = {
            primary:
                'bg-foreground text-background hover:bg-foreground/90 shadow-[0_4px_0_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_0_0_rgba(0,0,0,0.15)] active:shadow-[0_2px_0_0_rgba(0,0,0,0.1)]',
            secondary:
                'border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background',
            ghost:
                'border-2 border-transparent text-foreground hover:border-border hover:bg-muted/50',
        };

        const sizeStyles = {
            sm: 'px-6 py-3 text-[10px]',
            md: 'px-10 py-4 text-xs',
            lg: 'px-12 py-5 text-sm',
        };

        return (
            <button
                ref={setRefs}
                className={cn(
                    baseStyles,
                    variantStyles[variant],
                    sizeStyles[size],
                    loading && 'cursor-wait',
                    className
                )}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? (
                    <span className="font-semibold uppercase tracking-wider">Loading...</span>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;

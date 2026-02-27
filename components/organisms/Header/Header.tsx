import Link from "next/link";
import { Suspense } from "react";
import { ChevronDown } from "lucide-react";
import HeaderActions from "./HeaderActions";
import SearchBar from "@/components/molecules/SearchBar/SearchBar";
import MobileMenu from "./MobileMenu";

const CATEGORIES = [
    { id: '1', name: 'Budgeting & Debt', slug: 'budgeting-and-debt' },
    { id: '2', name: 'Investing 101', slug: 'investing-101' },
    { id: '3', name: 'Strategies', slug: 'investing-strategies' },
    { id: '4', name: 'Real Estate', slug: 'real-estate' },
    { id: '5', name: 'Taxes', slug: 'taxes' },
    { id: '6', name: 'Fintech', slug: 'fintech-and-apps' },
    { id: '7', name: 'Side Hustles', slug: 'side-hustles' },
];

const TOOLS = [
    { name: 'Debt Payoff Strategist', slug: 'debt-payoff-strategist' },
    { name: 'Savings Goal Calculator', slug: 'savings-goal-calculator' },
    { name: 'Wealth Growth Simulator', slug: 'wealth-growth-simulator' },
    { name: 'Freedom Fund Calculator', slug: 'freedom-fund-calculator' }
];

// Helper component for static text links to maintain DRY
const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <Link
        href={href}
        className="text-[13px] font-medium uppercase tracking-wide transition-colors hover:text-foreground text-muted-foreground relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-foreground after:transition-all hover:after:w-full"
    >
        {children}
    </Link>
);

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex max-w-[1400px] items-center justify-between px-6 sm:px-8 py-5">
                <div className="flex items-center gap-8 lg:gap-12 xl:gap-20 flex-1">
                    <Link href="/" className="flex items-center shrink-0 border-none outline-none">
                        <span className="font-serif text-3xl font-normal tracking-tight text-foreground hover:opacity-70 transition-opacity">
                            MoneyHub
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="desktop-only desktop-nav">
                        {/* Articles Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-wide transition-colors hover:text-foreground text-muted-foreground outline-none py-2">
                                Articles <ChevronDown className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:-rotate-180" />
                            </button>

                            {/* Dropdown Panel */}
                            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform translate-y-2 group-hover:translate-y-0">
                                {/* Hover bridge to prevent losing hover state */}
                                <div className="absolute -top-3 left-0 right-0 h-4 bg-transparent" />

                                <div className="bg-background border border-border/50 shadow-xl rounded-xl py-2 w-[240px] flex flex-col relative overflow-hidden backdrop-blur-xl supports-backdrop-filter:bg-background/90">
                                    {CATEGORIES.map((category) => (
                                        <Link
                                            key={category.id}
                                            href={`/category/${category.slug}`}
                                            className="px-5 py-2.5 text-[13.5px] font-medium transition-colors hover:bg-muted/80 hover:text-foreground text-muted-foreground flex items-center"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tools Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-wide transition-colors hover:text-foreground text-muted-foreground outline-none py-2">
                                Tools <ChevronDown className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:-rotate-180" />
                            </button>

                            {/* Dropdown Panel */}
                            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform translate-y-2 group-hover:translate-y-0">
                                {/* Hover bridge to prevent losing hover state */}
                                <div className="absolute -top-3 left-0 right-0 h-4 bg-transparent" />

                                <div className="bg-background border border-border/50 shadow-xl rounded-xl py-2 w-[260px] flex flex-col relative overflow-hidden backdrop-blur-xl supports-backdrop-filter:bg-background/90">
                                    {TOOLS.map((tool) => (
                                        <Link
                                            key={tool.slug}
                                            href={`/tools/${tool.slug}`}
                                            className="px-5 py-2.5 text-[13.5px] font-medium transition-colors hover:bg-muted/80 hover:text-foreground text-muted-foreground flex items-center"
                                        >
                                            {tool.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Static Links */}
                        <NavLink href="/policy-and-privacy">Policy and Privacy</NavLink>
                        <NavLink href="/about">About</NavLink>
                        <NavLink href="/contact">Contact</NavLink>
                    </nav>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 ml-auto">
                    <div className="desktop-only desktop-actions">
                        <Suspense fallback={<div className="h-9 w-9 md:w-[200px] animate-pulse bg-muted rounded-md" />}>
                            <SearchBar />
                        </Suspense>
                        <HeaderActions />
                    </div>
                    <MobileMenu categories={CATEGORIES} tools={TOOLS} />
                </div>
            </div>
        </header>
    );
}

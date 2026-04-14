import Link from "next/link";
import { Suspense } from "react";
import { ChevronDown } from "lucide-react";
import HeaderActions from "./HeaderActions";
import SearchBar from "@/components/molecules/SearchBar/SearchBar";
import MobileMenu from "./MobileMenu";

const CATEGORIES = [
    { id: '1', name: 'Legal Finance', slug: 'legal-finance' },
    { id: '2', name: 'Insurance & Protection', slug: 'insurance-and-protection' },
    { id: '3', name: 'Auto & Transport', slug: 'auto-and-transport' },
    { id: '4', name: 'Real Estate & Mortgages', slug: 'real-estate-and-mortgages' },
    { id: '5', name: 'Taxes', slug: 'taxes' },
    { id: '6', name: 'Investing & Wealth', slug: 'investing-and-wealth' },
    { id: '7', name: 'Budgeting & Debt', slug: 'budgeting-and-debt' },
    { id: '8', name: 'Side Hustles & Fintech', slug: 'side-hustles-and-fintech' },
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
        className="text-[13px] font-medium uppercase tracking-wide transition-colors hover:text-foreground text-muted-foreground relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-foreground after:transition-all hover:after:w-full inline-flex items-center min-h-[44px]"
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
                            Wealth Logik
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="desktop-only desktop-nav" aria-label="Main navigation">
                        {/* Articles Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-wide transition-colors hover:text-foreground text-muted-foreground outline-none min-h-[44px]" aria-haspopup="true" aria-expanded="false">
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
                                            className="px-5 py-3 text-[13.5px] font-medium transition-colors hover:bg-muted/80 hover:text-foreground text-muted-foreground flex items-center min-h-[44px]"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tools Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-wide transition-colors hover:text-foreground text-muted-foreground outline-none min-h-[44px]" aria-haspopup="true" aria-expanded="false">
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
                                            className="px-5 py-3 text-[13.5px] font-medium transition-colors hover:bg-muted/80 hover:text-foreground text-muted-foreground flex items-center min-h-[44px]"
                                        >
                                            {tool.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Institution Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-wide transition-colors hover:text-foreground text-muted-foreground outline-none min-h-[44px]" aria-haspopup="true" aria-expanded="false">
                                Institution <ChevronDown className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:-rotate-180" />
                            </button>

                            {/* Dropdown Panel */}
                            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform translate-y-2 group-hover:translate-y-0">
                                {/* Hover bridge to prevent losing hover state */}
                                <div className="absolute -top-3 left-0 right-0 h-4 bg-transparent" />

                                <div className="bg-background border border-border/50 shadow-xl rounded-xl py-2 w-[220px] flex flex-col relative overflow-hidden backdrop-blur-xl supports-backdrop-filter:bg-background/90">
                                    <Link href="/about" className="px-5 py-3 text-[13.5px] font-medium transition-colors hover:bg-muted/80 hover:text-foreground text-muted-foreground flex items-center min-h-[44px]">About</Link>
                                    <Link href="/editorial-policy" className="px-5 py-3 text-[13.5px] font-medium transition-colors hover:bg-muted/80 hover:text-foreground text-muted-foreground flex items-center min-h-[44px]">Editorial Policy</Link>
                                    <Link href="/policy-and-privacy" className="px-5 py-3 text-[13.5px] font-medium transition-colors hover:bg-muted/80 hover:text-foreground text-muted-foreground flex items-center min-h-[44px]">Policy and Privacy</Link>
                                </div>
                            </div>
                        </div>

                        {/* Static Links */}
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

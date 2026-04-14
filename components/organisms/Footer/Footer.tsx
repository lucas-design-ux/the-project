import Link from "next/link";

const LINKS = {
    learn: [
        { label: 'Legal Finance', href: '/category/legal-finance' },
        { label: 'Insurance & Protection', href: '/category/insurance-and-protection' },
        { label: 'Auto & Transport', href: '/category/auto-and-transport' },
        { label: 'Real Estate & Mortgages', href: '/category/real-estate-and-mortgages' },
        { label: 'Taxes', href: '/category/taxes' },
        { label: 'Investing & Wealth', href: '/category/investing-and-wealth' },
        { label: 'Budgeting & Debt', href: '/category/budgeting-and-debt' },
        { label: 'Side Hustles & Fintech', href: '/category/side-hustles-and-fintech' },
    ],
    tools: [
        { label: 'All Tools', href: '/tools' },
        { label: 'Savings Calculator', href: '/tools/savings-goal-calculator' },
        { label: 'Wealth Growth', href: '/tools/wealth-growth-simulator' },
        { label: 'Debt Payoff', href: '/tools/debt-payoff-strategist' },
        { label: 'Freedom Fund', href: '/tools/freedom-fund-calculator' },
    ],
    about: [
        { label: 'Our Story', href: '/about' },
        { label: 'Editorial Policy', href: '/editorial-policy' },
        { label: 'Policy & Privacy', href: '/policy-and-privacy' },
        { label: 'Contact', href: '/contact' },
    ],
};

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="editorial-container py-16 sm:py-20">
                <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-8 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-16">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="inline-block mb-5">
                            <span className="font-serif text-4xl font-normal tracking-tight text-foreground">
                                Wealth Logik
                            </span>
                        </Link>
                        <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                            Personal finance for the modern generation. Real talk about money that actually helps.
                        </p>
                    </div>

                    {/* Learn */}
                    <div>
                        <h2 className="mb-8 font-bold uppercase tracking-[0.2em] text-foreground" style={{ fontSize: '1.5rem' }}>Learn</h2>
                        <ul className="space-y-5">
                            {LINKS.learn.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-base text-muted-foreground transition-colors hover:text-foreground inline-flex items-center min-h-[44px]">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tools */}
                    <div>
                        <h2 className="mb-8 font-bold uppercase tracking-[0.2em] text-foreground" style={{ fontSize: '1.5rem' }}>Tools</h2>
                        <ul className="space-y-5">
                            {LINKS.tools.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-base text-muted-foreground transition-colors hover:text-foreground inline-flex items-center min-h-[44px]">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h2 className="mb-8 font-bold uppercase tracking-[0.2em] text-foreground" style={{ fontSize: '1.5rem' }}>About</h2>
                        <ul className="space-y-5">
                            {LINKS.about.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-base text-muted-foreground transition-colors hover:text-foreground inline-flex items-center min-h-[44px]">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                {/* Disclaimer */}
                <div className="mt-12 border-t-2 border-border pt-8">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        <strong className="font-bold text-foreground">Disclaimer:</strong> Wealth Logik provides educational content only.
                        This is not financial advice. Consult with qualified professionals before making investment decisions.
                    </p>
                </div>

                {/* Copyright */}
                <div className="mt-6 text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Wealth Logik. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

import Link from "next/link";

const LINKS = {
    learn: [
        { label: 'Budgeting & Debt', href: '/category/budgeting-and-debt' },
        { label: 'Investing 101', href: '/category/investing-101' },
        { label: 'Investing Strategies', href: '/category/investing-strategies' },
        { label: 'Real Estate', href: '/category/real-estate' },
        { label: 'Taxes', href: '/category/taxes' },
        { label: 'Fintech & Apps', href: '/category/fintech-and-apps' },
        { label: 'Side Hustles', href: '/category/side-hustles' },
    ],
    tools: [
        { label: 'All Tools', href: '/tools' },
        { label: 'Savings Calculator', href: '/tools/savings-goal-calculator' },
    ],
    about: [
        { label: 'Our Story', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ],
};

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="editorial-container py-16 sm:py-20">
                <div className="grid gap-8 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-16">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-block mb-5">
                            <span className="font-serif text-4xl font-normal tracking-tight text-foreground">
                                MoneyHub
                            </span>
                        </Link>
                        <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                            Personal finance for the modern generation. Real talk about money that actually helps.
                        </p>
                    </div>

                    {/* Learn */}
                    <div>
                        <h3 className="mb-8 font-bold uppercase tracking-[0.2em] text-foreground" style={{ fontSize: '1.5rem' }}>Learn</h3>
                        <ul className="space-y-5">
                            {LINKS.learn.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-base text-muted-foreground transition-colors hover:text-foreground">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tools */}
                    <div>
                        <h3 className="mb-8 font-bold uppercase tracking-[0.2em] text-foreground" style={{ fontSize: '1.5rem' }}>Tools</h3>
                        <ul className="space-y-5">
                            {LINKS.tools.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-base text-muted-foreground transition-colors hover:text-foreground">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h3 className="mb-8 font-bold uppercase tracking-[0.2em] text-foreground" style={{ fontSize: '1.5rem' }}>About</h3>
                        <ul className="space-y-5">
                            {LINKS.about.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-base text-muted-foreground transition-colors hover:text-foreground">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-12 border-t-2 border-border pt-8">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        <strong className="font-bold text-foreground">Disclaimer:</strong> MoneyHub provides educational content only.
                        This is not financial advice. Consult with qualified professionals before making investment decisions.
                    </p>
                </div>

                {/* Copyright */}
                <div className="mt-6 text-sm text-muted-foreground">
                    © {new Date().getFullYear()} MoneyHub. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

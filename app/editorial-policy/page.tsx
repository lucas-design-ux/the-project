import { Metadata } from "next";
import { Container } from "@/components/atoms/Container/Container";

export const metadata: Metadata = {
    title: "Editorial Policy | Wealth Logik",
    description:
        "Learn about WealthLogik's AI-assisted editorial process, deep financial research methodology, editorial team, and commitment to transparency.",
};

export default function EditorialPolicyPage() {
    return (
        <Container className="py-16 sm:py-20">
            <div className="max-w-3xl mx-auto prose-custom">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
                    Editorial Policy & Process
                </h1>
                <p className="text-sm text-muted-foreground mb-12">
                    Last updated: April 23, 2026
                </p>

                {/* Section 1 */}
                <section className="mb-16">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                        1. Our Editorial Mission
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
                        <p>
                            WealthLogik exists to provide specific, actionable, and verifiable financial information to American consumers. We believe that financial literacy is a public good, and that most people deserve better than vague advice that avoids the actual numbers.
                        </p>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="mb-16">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                        2. How We Produce Our Content
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
                        <p>
                            WealthLogik uses an AI-assisted editorial pipeline to research, structure, and draft our articles. Here is exactly how it works:
                        </p>

                        <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">
                            Step 1 — Topic Selection
                        </h3>
                        <p>
                            Our editorial team identifies topics based on keyword research, regulatory changes, and gaps in existing financial coverage.
                        </p>

                        <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">
                            Step 2 — Primary Source Research
                        </h3>
                        <p>
                            Before any content is written, we compile a research dossier from primary sources. Primary sources used by WealthLogik include: IRS publications and rulings, CFPB guidelines, Federal Reserve data, Bureau of Labor Statistics, Social Security Administration guidelines, state tax authority publications, federal and state court rulings, and peer-reviewed financial research. AI models do not generate our source material — they help us organize and apply it.
                        </p>

                        <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">
                            Step 3 — AI-Assisted Drafting
                        </h3>
                        <p>
                            We use Claude (Anthropic) to structure and draft articles based on our research dossiers. The AI follows strict editorial guidelines: every claim must reference a verifiable source, every dollar figure must come from primary documentation, and no speculative content is permitted.
                        </p>

                        <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">
                            Step 4 — Editorial Review
                        </h3>
                        <p>
                            Every article is reviewed before publication to verify source accuracy, check for outdated information, and ensure compliance with our financial disclaimer policy.
                        </p>

                        <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">
                            Step 5 — Ongoing Maintenance
                        </h3>
                        <p>
                            We monitor our content for regulatory changes and update articles when laws or thresholds change.
                        </p>
                    </div>
                </section>

                {/* Section 3 */}
                <section className="mb-16">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                        3. Editorial Independence & Commercial Relationships
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
                        <p>
                            WealthLogik earns revenue through display advertising (Google AdSense) and affiliate partnerships with financial institutions and services.
                        </p>
                        <p>
                            Our editorial content is never influenced by these commercial relationships. We may recommend, criticize, or decline to mention any product or service regardless of whether a commercial relationship exists. Affiliate links are clearly disclosed at the article level.
                        </p>
                        <p>
                            Editorial decisions — including topic selection, recommendations, and conclusions — are made independently of our advertising and affiliate partners.
                        </p>
                    </div>
                </section>

                {/* Section 4 */}
                <section className="mb-16">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                        4. Our Editorial Team
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
                        <p>
                            WealthLogik content is produced by the WealthLogik Editorial Team under the supervision of our Publisher and Editor-in-Chief. Our team follows a structured editorial process combining primary source research with AI-assisted drafting and human review before publication.
                        </p>
                        <p>
                            All financial claims are verified against primary government and regulatory sources before publication. Dollar figures and percentages are reviewed against source documentation and updated when regulatory changes occur.
                        </p>
                    </div>
                </section>

                {/* Section 5 */}
                <section className="mb-16">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                        5. Our Disclaimer Policy
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
                        <p>
                            Every article on WealthLogik includes a financial disclaimer because we believe you deserve to know the limits of what you&apos;re reading.
                        </p>
                        <p>
                            WealthLogik provides general financial information for educational purposes only. Nothing on this site constitutes financial, tax, legal, or investment advice. Always consult a qualified professional before making financial decisions.
                        </p>
                        <p>
                            We are not a registered investment advisor, tax professional, or licensed financial planner.
                        </p>
                    </div>
                </section>

                {/* Section 6 */}
                <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                        6. Corrections & Updates
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
                        <p>
                            If you find an error in our content, please contact us at <a href="mailto:contact@wealthlogik.com" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">contact@wealthlogik.com</a>. We take factual accuracy seriously and will investigate and correct errors within 48 hours of notification.
                        </p>
                        <p>
                            Articles are dated by their most recent review date, not only their original publication date.
                        </p>
                    </div>
                </section>
            </div>
        </Container>
    );
}

import { Metadata } from "next";
import { Container } from "@/components/atoms/Container/Container";

export const metadata: Metadata = {
    title: "Privacy Policy & Affiliate Disclosure | Wealth Logik",
    description:
        "Learn how Wealth Logik collects, uses, and protects your personal data. Read our full privacy policy including affiliate disclosure.",
};

export default function PolicyAndPrivacyPage() {
    return (
        <Container className="py-16 sm:py-20">
            <div className="max-w-3xl mx-auto prose-custom">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
                    Privacy Policy &amp; Affiliate Disclosure
                </h1>
                <p className="text-sm text-muted-foreground mb-12">
                    Last updated: April 23, 2026
                </p>

                <section className="mb-16">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                        Affiliate Disclosure
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
                        <p>
                            WealthLogik participates in affiliate marketing programs. Some links on this site are affiliate links — if you click and make a purchase or open an account, we may earn a commission at no additional cost to you. This never influences our editorial content or recommendations. All opinions are our own.
                        </p>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                        1. Information We Collect
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
                        <p>WealthLogik collects:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Anonymous usage data via Google Analytics</li>
                            <li>Advertising interaction data via Google AdSense</li>
                            <li>Email addresses if you voluntarily subscribe to our newsletter</li>
                            <li>Web push notification tokens if you opt in to browser notifications</li>
                        </ul>
                        <p>We do not sell your personal data to third parties.</p>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                        2. How Long We Retain Data
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
                        <p>
                            Analytics data is retained for 26 months per Google Analytics default settings. Email addresses are retained until you unsubscribe. Push notification tokens are retained until you revoke permission in your browser.
                        </p>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                        3. Cookies
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
                        <p>This site uses cookies for:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Analytics (Google Analytics)</li>
                            <li>Advertising (Google AdSense)</li>
                            <li>Functional purposes (site preferences)</li>
                        </ul>
                        <p>
                            You can opt out of analytics cookies at any time via your browser settings or Google&apos;s opt-out tool.
                        </p>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                        4. Google AdSense
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
                        <p>
                            WealthLogik uses Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalized advertising at Google&apos;s Ads Settings page:{" "}
                            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                                https://adssettings.google.com
                            </a>
                        </p>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                        5. Third Party Links
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
                        <p>
                            This site contains links to external websites including financial institutions, tax services, and insurance providers. WealthLogik is not responsible for the privacy practices or content of these third-party sites. We encourage you to review their privacy policies before providing any personal information.
                        </p>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                        6. Children&apos;s Privacy (COPPA)
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
                        <p>
                            WealthLogik is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us and we will delete it immediately.
                        </p>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                        7. California Residents (CCPA)
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
                        <p>If you are a California resident, you have the right to:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Know what personal data we collect</li>
                            <li>Request deletion of your data</li>
                            <li>Opt out of the sale of personal data</li>
                        </ul>
                        <p>
                            WealthLogik does not sell personal data. To exercise your rights, contact us at:{" "}
                            <a href="mailto:contact@wealthlogik.com" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                                contact@wealthlogik.com
                            </a>
                        </p>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                        8. European Users (GDPR)
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
                        <p>
                            If you are located in the European Economic Area, you have rights regarding your personal data including access, correction, and deletion. Contact us at{" "}
                            <a href="mailto:contact@wealthlogik.com" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                                contact@wealthlogik.com
                            </a>{" "}
                            to exercise these rights.
                        </p>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                        9. Changes To This Policy
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
                        <p>
                            We may update this policy periodically. The &quot;Last updated&quot; date at the top reflects the most recent revision. Continued use of the site after changes constitutes acceptance of the updated policy.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                        10. Contact
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
                        <p>
                            For privacy-related questions or requests:
                            <br />
                            Email:{" "}
                            <a href="mailto:contact@wealthlogik.com" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                                contact@wealthlogik.com
                            </a>
                        </p>
                    </div>
                </section>
            </div>
        </Container>
    );
}

import { Metadata } from "next";
import { Container } from "@/components/atoms/Container/Container";

export const metadata: Metadata = {
    title: "Contact Us | Wealth Logik",
    description:
        "Get in touch with the Wealth Logik team. We'd love to hear from you.",
};

export default function ContactPage() {
    return (
        <Container className="py-16 sm:py-20">
            <div className="max-w-2xl mx-auto">
                <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
                    Contact Us
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                    Have a question, suggestion, or partnership inquiry? We&apos;d love to
                    hear from you. Fill out the form below and our team will get back to
                    you within 48 hours.
                </p>

                <form className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label
                                htmlFor="contact-name"
                                className="text-sm font-semibold uppercase tracking-wider text-foreground"
                            >
                                Name
                            </label>
                            <input
                                id="contact-name"
                                type="text"
                                placeholder="Your full name"
                                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="contact-email"
                                className="text-sm font-semibold uppercase tracking-wider text-foreground"
                            >
                                Email
                            </label>
                            <input
                                id="contact-email"
                                type="email"
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="contact-subject"
                            className="text-sm font-semibold uppercase tracking-wider text-foreground"
                        >
                            Subject
                        </label>
                        <select
                            id="contact-subject"
                            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                        >
                            <option value="">Select a topic</option>
                            <option value="general">General Inquiry</option>
                            <option value="partnership">Partnership / Sponsorship</option>
                            <option value="correction">Content Correction</option>
                            <option value="feedback">Feedback</option>
                            <option value="press">Press / Media</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="contact-message"
                            className="text-sm font-semibold uppercase tracking-wider text-foreground"
                        >
                            Message
                        </label>
                        <textarea
                            id="contact-message"
                            rows={6}
                            placeholder="How can we help you?"
                            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3 rounded-lg bg-foreground text-background text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
                    >
                        Send Message
                    </button>
                </form>

                <div className="mt-16 pt-12 border-t border-border">
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                        Other Ways to Reach Us
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
                                Email
                            </h3>
                            <p className="text-muted-foreground">
                                contact@wealthlogik.com
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
                                Social Media
                            </h3>
                            <p className="text-muted-foreground">
                                Follow us on X (Twitter) and LinkedIn for the latest insights.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

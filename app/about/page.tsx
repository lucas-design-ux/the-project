'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Section } from '@/components/organisms/Section/Section';
import './about.css';

export default function AboutPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const teamRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);
    const trustRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Hero entrance
        const heroItems = heroRef.current?.querySelectorAll('.about-animate-item');
        if (heroItems?.length) {
            gsap.fromTo(
                heroItems,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out' }
            );
        }

        // Team section
        const teamItems = teamRef.current?.querySelectorAll('.about-animate-item');
        if (teamItems?.length) {
            gsap.fromTo(
                teamItems,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', delay: 0.3 }
            );
        }

        // Step cards
        const stepCards = stepsRef.current?.querySelectorAll('.about-step-card');
        const stepIntro = stepsRef.current?.querySelectorAll('.about-animate-item');
        if (stepIntro?.length) {
            gsap.fromTo(
                stepIntro,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', delay: 0.2 }
            );
        }
        if (stepCards?.length) {
            gsap.fromTo(
                stepCards,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out', delay: 0.4 }
            );
        }

        // Trust section
        const trustItems = trustRef.current?.querySelectorAll('.about-animate-item');
        if (trustItems?.length) {
            gsap.fromTo(
                trustItems,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.5 }
            );
        }
    }, []);

    return (
        <main className="flex flex-col">
            {/* ─── Section 1: Hero & Mission ─── */}
            <Section>
                <div ref={heroRef} className="flex flex-col lg:flex-row lg:items-center lg:gap-16 xl:gap-20">
                    {/* Text Column */}
                    <div className="flex-1 min-w-0">
                        <div className="about-animate-item inline-block border-2 border-border bg-muted/50 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-foreground mb-6">
                            About WealthLogik
                        </div>

                        <h1 className="about-animate-item font-serif text-4xl md:text-6xl font-normal mb-8 tracking-tight leading-[1]">
                            Data-Driven Independence
                        </h1>

                        <p className="about-animate-item text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                            WealthLogik is an independent financial editorial publication focused on helping American Millennials and Gen Z navigate the real cost of money decisions in 2026 and beyond.
                        </p>

                        <div className="about-animate-item about-divider mb-8" />

                        <p className="about-animate-item text-lg text-muted-foreground leading-relaxed">
                            We cover taxes, insurance, real estate, auto financing, investing, debt strategy, and the gig economy — with a focus on the specific law changes, income thresholds, and dollar-level calculations that most financial blogs summarize without depth.
                        </p>
                    </div>

                    {/* Image Column */}
                    <div className="about-animate-item hidden lg:block flex-shrink-0 w-[380px] xl:w-[440px]">
                        <div className="relative aspect-square overflow-hidden border border-border">
                            <Image
                                src="/about-hero.png"
                                alt="Abstract financial data visualization representing market analysis and growth trends"
                                fill
                                className="object-cover"
                                sizes="(min-width: 1280px) 440px, 380px"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </Section>

            {/* ─── Section 2: Who We Are ─── */}
            <Section className="border-t border-border bg-muted/20">
                <div ref={teamRef} className="flex flex-col lg:flex-row-reverse lg:items-center lg:gap-16 xl:gap-20">
                    {/* Text Column */}
                    <div className="flex-1 min-w-0">
                        <p className="about-animate-item text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-6">
                            The Editor
                        </p>

                        <h2 className="about-animate-item font-serif text-3xl md:text-5xl font-normal mb-8 tracking-tight leading-tight">
                            Meet Lucas Melo
                        </h2>

                        <div className="about-animate-item about-divider mb-8" />

                        <p className="about-animate-item text-lg text-muted-foreground leading-relaxed">
                            Lucas Melo is a full-stack developer and digital publisher who built WealthLogik to make complex financial information accessible and specific for everyday Americans.
                        </p>

                        <p className="about-animate-item text-lg text-muted-foreground leading-relaxed mt-6">
                            Lucas created WealthLogik to fill a specific gap: most personal finance content for Americans is written at a surface level, avoiding the exact numbers, law sections, and income thresholds that actually determine whether a strategy works for your situation.
                        </p>
                        
                        <div className="about-animate-item mt-10 flex gap-4">
                            <a href="mailto:contact@wealthlogik.com" className="text-foreground transition-colors underline underline-offset-4 hover:opacity-70 font-serif text-xl">
                                contact@wealthlogik.com
                            </a>
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className="about-animate-item hidden lg:block flex-shrink-0 w-[380px] xl:w-[440px]">
                        <div className="relative aspect-square overflow-hidden border border-border">
                            <Image
                                src="https://api.wealthlogik.com/uploads/loxt_Tbm9feemucnbd_Z_Qw_u_QV_4lwg2_eb23df0a22.png"
                                alt="Lucas Melo, Founder and Editor-in-Chief of WealthLogik"
                                fill
                                className="object-cover"
                                sizes="(min-width: 1280px) 440px, 380px"
                            />
                        </div>
                    </div>
                </div>
            </Section>

            {/* ─── Section 3: Editorial Guidelines ─── */}
            <Section className="border-t border-border">
                <div ref={stepsRef}>
                    <div className="max-w-3xl mb-8 md:mb-10">
                        <p className="about-animate-item text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-6">
                            Our Process
                        </p>

                        <h2 className="about-animate-item font-serif text-3xl md:text-5xl font-normal mb-8 tracking-tight leading-tight">
                            Our Editorial Guidelines &amp; Process
                        </h2>

                        <div className="about-animate-item about-divider mb-8" />

                        <p className="about-animate-item text-lg text-muted-foreground leading-relaxed">
                            Finance is a serious subject (What the industry calls <em>Your Money or Your Life</em> topics).
                            We treat your financial decisions with the ultimate respect. To ensure the highest level of accuracy,
                            objectivity, and reliability, the Logik Editorial Team adheres to a strict, multi-step editorial
                            methodology before any word is published on our site:
                        </p>
                    </div>

                    {/* Step Cards Grid */}
                    <div className="grid gap-6 md:gap-8 md:grid-cols-2">
                        {/* Step 1 */}
                        <div className="about-step-card">
                            <div className="about-step-number mb-4">01</div>
                            <h3 className="font-serif text-xl md:text-2xl font-normal mb-4 tracking-tight">
                                Research-First
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                We source directly from the IRS, CFPB, SSA, and other primary government and regulatory sources before writing a single word.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="about-step-card">
                            <div className="about-step-number mb-4">02</div>
                            <h3 className="font-serif text-xl md:text-2xl font-normal mb-4 tracking-tight">
                                AI-Assisted
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                We use AI-assisted drafting tools to structure, draft, and quality-check our content at scale. This allows us to cover more topics with more depth than a traditional editorial team our size could produce.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="about-step-card">
                            <div className="about-step-number mb-4">03</div>
                            <h3 className="font-serif text-xl md:text-2xl font-normal mb-4 tracking-tight">
                                Human-Reviewed
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Every article is reviewed by our editorial team before publication for accuracy, tone, and compliance with our financial disclaimer policy.
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div className="about-step-card">
                            <div className="about-step-number mb-4">04</div>
                            <h3 className="font-serif text-xl md:text-2xl font-normal mb-4 tracking-tight">
                                Independently Funded
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                WealthLogik operates on advertising revenue. We do not accept sponsored content or paid placements. No advertiser influences our editorial positions.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* ─── Section 4: Transparency & Trust ─── */}
            <Section className="border-t border-border bg-muted/20">
                <div ref={trustRef} className="flex flex-col lg:flex-row lg:items-center lg:gap-16 xl:gap-20">
                    {/* Text Column */}
                    <div className="flex-1 min-w-0">
                        <p className="about-animate-item text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-6">
                            Trust
                        </p>

                        <h2 className="about-animate-item font-serif text-3xl md:text-5xl font-normal mb-8 tracking-tight leading-tight">
                            Editorial Independence &amp; Transparency
                        </h2>

                        <div className="about-animate-item about-divider mb-8" />

                        <p className="about-animate-item text-lg text-muted-foreground leading-relaxed mb-10">
                            WealthLogik is fiercely independent. While we may earn a commission from some of the affiliate partners
                            featured on our site, these partnerships never influence our editorial process, product evaluations, or the
                            financial strategies we recommend. Our primary loyalty is to you, the reader.
                        </p>

                        {/* Disclaimer */}
                        <div className="about-animate-item about-disclaimer">
                            <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4">
                                Disclaimer
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                The content provided by WealthLogik is for educational and informational purposes only and does not
                                constitute certified financial, legal, or tax advice. Always consult with a licensed professional
                                regarding your specific situation.
                            </p>
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className="about-animate-item hidden lg:block flex-shrink-0 w-[380px] xl:w-[440px]">
                        <div className="relative aspect-square overflow-hidden border border-border">
                            <Image
                                src="/about-trust.png"
                                alt="Abstract geometric scales representing balance, fairness, and editorial transparency"
                                fill
                                className="object-cover"
                                sizes="(min-width: 1280px) 440px, 380px"
                            />
                        </div>
                    </div>
                </div>
            </Section>
        </main>
    );
}

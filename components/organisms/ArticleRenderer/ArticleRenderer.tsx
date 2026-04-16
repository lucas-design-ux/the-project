"use client";

import React from "react";
import dynamic from "next/dynamic";
import parse, { Element, domToReact, HTMLReactParserOptions, DOMNode } from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import { InjectedTool } from "@/lib/cms/interface";
import { ToolCTA } from "@/components/molecules/ToolCTA/ToolCTA";
import InlineCompactProvider from "@/components/tools/InlineCompactProvider/InlineCompactProvider";
import { Loader2 } from "lucide-react";

interface ArticleRendererProps {
    content_html: string;
    tools?: InjectedTool[];
    validSlugs?: string[];
}

const ToolSkeleton = () => (
    <div className="flex h-[400px] w-full items-center justify-center rounded-xl border border-border bg-card shadow-sm my-8">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm">Loading interactive tool...</p>
        </div>
    </div>
);

// Map the dynamic tools
const TOOL_MAP: Record<string, React.ComponentType | null> = {
    "savings-goal-calculator": dynamic(
        () => import("@/components/tools/SavingsGoalCalculator/SavingsGoalCalculator"),
        { ssr: false, loading: () => <ToolSkeleton /> }
    ),
    "wealth-growth-simulator": dynamic(
        () => import("@/components/tools/CompoundInterestCalculator/CompoundInterestCalculator"),
        { ssr: false, loading: () => <ToolSkeleton /> }
    ),
    "debt-payoff-strategist": dynamic(
        () => import("@/components/tools/DebtPayoffCalculator/DebtPayoffCalculator"),
        { ssr: false, loading: () => <ToolSkeleton /> }
    ),
    "freedom-fund-calculator": dynamic(
        () => import("@/components/tools/FinancialIndependenceCalculator/FinancialIndependenceCalculator"),
        { ssr: false, loading: () => <ToolSkeleton /> }
    ),
};

// Helper component to render the appropriate tool format
const ToolInjector: React.FC<{ tool: InjectedTool }> = ({ tool }) => {
    if (tool.format === "cta") {
        return <ToolCTA componentSlug={tool.component} />;
    }

    if (tool.format === "inline") {
        const ToolComponent = TOOL_MAP[tool.component];
        if (!ToolComponent) return null;

        return (
            <div className="my-12">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="m-0 text-2xl font-semibold tracking-tight">Calculate Yours</h3>
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        Interactive
                    </div>
                </div>
                <div className="overflow-hidden rounded-xl border border-border shadow-sm">
                    <div className="bg-card p-6 sm:p-8">
                        <InlineCompactProvider>
                            <ToolComponent />
                        </InlineCompactProvider>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

// Extractor helper to get pure text from nested AST nodes (e.g. if H2 has spans/links)
const getTextContent = (node: any): string => {
    if (node.type === "text") return node.data || "";
    if (node.children) return node.children.map(getTextContent).join("");
    return "";
};

export const ArticleRenderer: React.FC<ArticleRendererProps> = ({ content_html, tools, validSlugs }) => {
    const sanitizedContent = DOMPurify.sanitize(content_html);

    // Build a Set for O(1) slug lookups
    const validSlugSet = validSlugs ? new Set(validSlugs) : null;

    // Pre-extract real spoke slugs from the bunched <p class="spoke-link"> blocks
    // These were appended by update_pillar_with_spoke_url and contain the REAL slugs
    const realSpokeSlugs: string[] = [];
    const spokeRegex = /class="spoke-link"[^>]*>.*?href="https?:\/\/(?:www\.)?wealthlogik\.com\/([^"\/]+)\/?"/g;
    let spokeMatch;
    while ((spokeMatch = spokeRegex.exec(sanitizedContent)) !== null) {
        realSpokeSlugs.push(spokeMatch[1]);
    }

    // Counter to map each aside (in order) to the corresponding real spoke slug
    let asideCounter = 0;

    // Track usage to enforce max 1 inline, 1 CTA
    let injectedInlineCount = 0;
    let injectedCTACount = 0;
    let h2Counter = 0;

    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof Element) {

                // --- Aside spoke teaser: fix the fake slug with the real one ---
                if (domNode.tagName === "aside" && domNode.attribs?.["data-cms-spoke"]) {
                    const currentIndex = asideCounter++;
                    const realSlug = realSpokeSlugs[currentIndex];

                    // Extract link text from the original aside
                    const findLinkText = (node: any): string => {
                        if (node.tagName === "a") return getTextContent(node);
                        if (node.children) {
                            for (const child of node.children) {
                                const found = findLinkText(child);
                                if (found) return found;
                            }
                        }
                        return "";
                    };
                    const originalLinkText = findLinkText(domNode);

                    if (realSlug && validSlugSet?.has(realSlug)) {
                        return (
                            <aside className="wealthlogik-spoke-teaser my-8 rounded-lg border-l-4 border-primary/30 bg-primary/5 p-4">
                                <p className="m-0">
                                    <strong>
                                        For a complete breakdown of this topic, read our deep dive guide on{" "}
                                        <a href={`/article/${realSlug}`} className="text-primary underline font-semibold">
                                            {originalLinkText}
                                        </a>.
                                    </strong>
                                </p>
                            </aside>
                        );
                    }

                    // No real slug available — render as plain text
                    return (
                        <aside className="wealthlogik-spoke-teaser my-8 rounded-lg border-l-4 border-primary/30 bg-primary/5 p-4">
                            <p className="m-0">
                                {domToReact(domNode.children as DOMNode[], options)}
                            </p>
                        </aside>
                    );
                }

                // --- Remove bunched spoke-link paragraphs (duplicates) ---
                if (domNode.tagName === "p" && domNode.attribs?.class?.includes("spoke-link")) {
                    return <></>;
                }

                // Fix internal links: rewrite absolute wealthlogik.com URLs to /article/ path
                if (domNode.tagName === "a") {
                    const href = (domNode.attribs?.href || "").trim();

                    // 1. Rewrite absolute internal URLs: https://wealthlogik.com/{slug} → /article/{slug}
                    //    Only rewrite if the slug exists in Strapi (prevents fake placeholder links)
                    if (href.includes("wealthlogik.com/") && !href.includes("/article/")) {
                        try {
                            const url = new URL(href);
                            const slug = url.pathname.replace(/^\/|\/$/g, ""); // strip leading/trailing slashes
                            if (slug && !slug.includes("/")) {
                                // Validate: only link to slugs that actually exist
                                if (validSlugSet && validSlugSet.has(slug)) {
                                    return (
                                        <a href={`/article/${slug}`}>
                                            {domToReact(domNode.children as DOMNode[], options)}
                                        </a>
                                    );
                                }
                                // Slug doesn't exist — render as plain text
                                return <span>{domToReact(domNode.children as DOMNode[], options)}</span>;
                            }
                        } catch {
                            // Invalid URL, fall through to default rendering
                        }
                    }

                    // 2. Kill broken href="#" links — render as plain text to prevent scroll-to-top
                    if (href === "#" || href === "") {
                        return <span>{domToReact(domNode.children as DOMNode[], options)}</span>;
                    }
                }

                // Handle H2 injections for interactive tools
                if (domNode.tagName === "h2") {
                    h2Counter++;

                    const textContent = getTextContent(domNode).trim();
                    const matchedTools: InjectedTool[] = [];

                    if (tools && tools.length > 0) {
                        // Check if there are any tools matching this position
                        tools.forEach((t) => {
                            let shouldInject = false;

                            if (t.position === `after_h2_${h2Counter}`) {
                                shouldInject = true;
                            } else if (
                                t.position === "after_conclusion" &&
                                textContent.toLowerCase() === "the bottom line"
                            ) {
                                shouldInject = true;
                            }

                            if (shouldInject) {
                                // Enforce limits: 1 inline, 1 CTA
                                if (t.format === "inline" && injectedInlineCount >= 1) return;
                                if (t.format === "cta" && injectedCTACount >= 1) return;

                                if (t.format === "inline") injectedInlineCount++;
                                if (t.format === "cta") injectedCTACount++;

                                matchedTools.push(t);
                            }
                        });
                    }

                    if (matchedTools.length > 0) {
                        // Inject tools immediately following the matched H2
                        return (
                            <React.Fragment key={`h2-${h2Counter}`}>
                                <h2>{domToReact(domNode.children as DOMNode[], options)}</h2>
                                {matchedTools.map((t, idx) => (
                                    <ToolInjector key={`tool-${h2Counter}-${idx}`} tool={t} />
                                ))}
                            </React.Fragment>
                        );
                    }
                }
            }
        },
    };

    const parsedHTML = parse(sanitizedContent, options);

    return (
        <div className="prose prose-lg dark:prose-invert prose-headings:my-10 prose-p:my-8 prose-table:my-8 max-w-none">
            {parsedHTML}
        </div>
    );
};

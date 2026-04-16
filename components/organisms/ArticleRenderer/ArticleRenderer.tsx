"use client";

import React from "react";
import dynamic from "next/dynamic";
import parse, { Element, domToReact, HTMLReactParserOptions, DOMNode } from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import { InjectedTool, SpokeMapping } from "@/lib/cms/interface";
import { ToolCTA } from "@/components/molecules/ToolCTA/ToolCTA";
import InlineCompactProvider from "@/components/tools/InlineCompactProvider/InlineCompactProvider";
import { Loader2 } from "lucide-react";
import RelatedLinkBanner from "@/components/molecules/RelatedLinkBanner/RelatedLinkBanner";

interface ArticleRendererProps {
    content_html: string;
    tools?: InjectedTool[];
    cmsSpokeMapping?: SpokeMapping[];
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



// Helper to determine the ratio of topic words present in the source text
const getWordMatchRatio = (sourceText: string, targetTopic: string): number => {
    const sourceWords = sourceText.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
    const targetWords = targetTopic.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);

    if (targetWords.length === 0) return 0;

    let matchCount = 0;
    targetWords.forEach(word => {
        if (sourceWords.includes(word)) {
            matchCount++;
        }
    });

    return matchCount / targetWords.length;
};

export const ArticleRenderer: React.FC<ArticleRendererProps> = ({ content_html, tools, cmsSpokeMapping }) => {
    const sanitizedContent = DOMPurify.sanitize(content_html);

    // Track usage to enforce max 1 inline, 1 CTA
    let injectedInlineCount = 0;
    let injectedCTACount = 0;
    let h2Counter = 0;
    
    // Deterministic Spoke Tracking state
    let activeSpoke: SpokeMapping | null = null;

    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof Element) {
                // Intercept in case the structure is actually <aside>
                if (domNode.tagName === "aside") {
                    const hasDataAttr = domNode.attribs && domNode.attribs['data-cms-spoke'] !== undefined;
                    const hasClass = domNode.attribs && domNode.attribs.class && domNode.attribs.class.includes('wealthlogik-spoke-teaser');

                    if (hasDataAttr || hasClass) {
                        let originalHref = "";
                        let anchorText = "";

                        const findAnchorInAside = (node: any): boolean => {
                            if (node.type === "tag" && node.name === "a") {
                                originalHref = node.attribs?.href || "";
                                anchorText = getTextContent(node).trim();
                                return true;
                            }
                            if (node.children && Array.isArray(node.children)) {
                                return node.children.some(findAnchorInAside);
                            }
                            return false;
                        };
                        findAnchorInAside(domNode);

                        if (originalHref && originalHref !== "#") {
                            return (
                                <RelatedLinkBanner
                                    url={originalHref}
                                    title={anchorText || "Read More"}
                                    label="Deep Dive"
                                />
                            );
                        }
                    }
                }

                // Intercept the entire <p> that houses the fake link to prevent hydration errors!
                if (domNode.tagName === "p") {
                    let hasFakeLink = false;
                    
                    const findFakeAnchor = (node: any): boolean => {
                        if (node.type === "tag" && node.name === "a") {
                            const href = node.attribs?.href || "";
                            if (href === "#" || href === "") {
                                hasFakeLink = true;
                                return true;
                            }
                        }
                        if (node.children && Array.isArray(node.children)) {
                            return node.children.some(findFakeAnchor);
                        }
                        return false;
                    }
                    findFakeAnchor(domNode);

                    // If this exact Paragraph contains an <a href="#"> inside it
                    if (hasFakeLink) {
                        if (activeSpoke && activeSpoke.inserted_url) {
                            const banner = (
                                <RelatedLinkBanner
                                    url={activeSpoke.inserted_url}
                                    title={activeSpoke.suggested_topic}
                                    label="Deep Dive"
                                />
                            );
                            
                            // Consume to prevent bleeding into next block
                            activeSpoke = null;
                            return banner;
                        }
                        
                        // Devour the broken fake link block if there's no data
                        return <React.Fragment />;
                    }
                }

                // Handle H2 injections for interactive tools & Track Spoke Blocks
                if (domNode.tagName === "h2") {
                    h2Counter++;

                    const textContent = getTextContent(domNode).trim();
                    const matchedTools: InjectedTool[] = [];
                    
                    // Rastreio determinístico: Qual Spoke pertence a este H2 lido?
                    if (cmsSpokeMapping && cmsSpokeMapping.length > 0) {
                        activeSpoke = cmsSpokeMapping.find(s => {
                            if (!s.h2_referenced) return false;
                            
                            const refLower = s.h2_referenced.trim().toLowerCase();
                            const currentH2Lower = textContent.toLowerCase();
                            
                            return currentH2Lower === refLower || currentH2Lower.includes(refLower);
                        }) || null;
                    }

                    if (tools && tools.length > 0) {
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
                                if (t.format === "inline" && injectedInlineCount >= 1) return;
                                if (t.format === "cta" && injectedCTACount >= 1) return;

                                if (t.format === "inline") injectedInlineCount++;
                                if (t.format === "cta") injectedCTACount++;

                                matchedTools.push(t);
                            }
                        });
                    }

                    if (matchedTools.length > 0) {
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

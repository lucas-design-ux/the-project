/**
 * Contextual recommendation rules for each calculator.
 *
 * Each calculator slug maps to an array of rules.  Every rule has:
 * - `condition` — receives the calculator's result data and returns true
 *   when the recommendation should be shown.
 * - `articles` — the cards to render when the condition matches.
 *
 * Add new calculators by simply appending an entry here — no code
 * changes in the component are needed.
 */

export interface RecommendedArticle {
    title: string;
    slug: string;
    category: string;
}

export interface RecommendationRule {
    /** Human-readable label for the condition (used for debugging). */
    label: string;
    /**
     * Evaluate the condition against the calculator result.
     * `data` is an untyped record — each calculator passes its specific
     * shape via `ContextualRecommendations`.
     */
    condition: (data: Record<string, unknown>) => boolean;
    articles: RecommendedArticle[];
}

export const calculatorRecommendations: Record<string, RecommendationRule[]> = {
    /* -----------------------------------------------------------------
     * Debt Payoff Strategist
     * Condition: payoff takes more than 48 months
     * ----------------------------------------------------------------- */
    "debt-payoff-strategist": [
        {
            label: "payoff > 48 months",
            condition: (data) => {
                const months = Number(data.months ?? 0);
                return months > 48;
            },
            articles: [
                {
                    title: "Avalanche vs. Snowball: Which Debt Strategy Actually Wins?",
                    slug: "avalanche-vs-snowball-debt-strategy",
                    category: "Debt Management",
                },
                {
                    title: "Best Budget Apps to Accelerate Your Debt Payoff",
                    slug: "best-budget-apps-comparison",
                    category: "Tools & Apps",
                },
                {
                    title: "How to Build a Debt Payoff Plan That Sticks",
                    slug: "debt-payoff-strategy-guide",
                    category: "Debt Management",
                },
            ],
        },
    ],

    /* -----------------------------------------------------------------
     * Savings Goal Calculator
     * Condition: savings timeline > 36 months (proxy for thin emergency fund)
     * ----------------------------------------------------------------- */
    "savings-goal-calculator": [
        {
            label: "timeline > 36 months",
            condition: (data) => {
                const months = Number(data.months ?? 0);
                return months > 36;
            },
            articles: [
                {
                    title: "The Emergency Fund Math Nobody Talks About",
                    slug: "emergency-fund-math",
                    category: "Savings",
                },
                {
                    title: "Gig Income Buffer: How Freelancers Should Save Differently",
                    slug: "gig-income-emergency-fund",
                    category: "Side Hustles",
                },
            ],
        },
    ],

    /* -----------------------------------------------------------------
     * Wealth Growth Simulator (Compound Interest)
     * Condition: final interest earned > total contributed (compound lift)
     * ----------------------------------------------------------------- */
    "wealth-growth-simulator": [
        {
            label: "interest > contributions",
            condition: (data) => {
                const interest = Number(data.interestEarned ?? 0);
                const contributed = Number(data.totalContributed ?? 0);
                return interest > contributed;
            },
            articles: [
                {
                    title: "Index Funds vs. ETFs: A Beginner's Complete Guide",
                    slug: "index-funds-vs-etfs",
                    category: "Investing",
                },
                {
                    title: "How to Start Investing With Just $100",
                    slug: "start-investing-with-100",
                    category: "Investing",
                },
            ],
        },
    ],

    /* -----------------------------------------------------------------
     * Freedom Fund Calculator (Financial Independence)
     * Condition: required monthly savings > $2,000
     * ----------------------------------------------------------------- */
    "freedom-fund-calculator": [
        {
            label: "required savings > $2k/mo",
            condition: (data) => {
                const required = Number(data.requiredMonthlySavings ?? 0);
                return required > 2000;
            },
            articles: [
                {
                    title: "FIRE Movement: A Realistic Roadmap to Early Retirement",
                    slug: "fire-movement-guide",
                    category: "Financial Independence",
                },
                {
                    title: "Side Hustles That Actually Accelerate Your FI Date",
                    slug: "side-hustles-for-financial-independence",
                    category: "Side Hustles",
                },
            ],
        },
    ],

    /* -----------------------------------------------------------------
     * DTI Calculator (future — placeholder)
     * ----------------------------------------------------------------- */
    "dti-calculator": [
        {
            label: "DTI > 43%",
            condition: (data) => {
                const dtiRatio = Number(data.dtiRatio ?? 0);
                return dtiRatio > 43;
            },
            articles: [
                {
                    title: "Auto Loan DTI Ratio: What Lenders Really Look At",
                    slug: "auto-loan-dti-ratio",
                    category: "Loans",
                },
                {
                    title: "How to Lower Your DTI Before Applying for a Mortgage",
                    slug: "lower-dti-before-mortgage",
                    category: "Real Estate",
                },
            ],
        },
    ],
};

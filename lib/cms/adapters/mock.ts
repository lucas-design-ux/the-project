import { CMSAdapter, Article, Category, Author } from "../interface";

const mockAuthors: Author[] = [
    {
        id: "1",
        name: "Jordan Martinez",
        slug: "jordan-martinez",
        avatar: "https://i.pravatar.cc/150?u=jordan",
        bio: "Former broke millennial turned personal finance enthusiast. I learned money the hard way so you don't have to.",
        socialLinks: { twitter: "https://twitter.com/jordanmoney", linkedin: "https://linkedin.com/in/jordanmartinez" },
    },
    {
        id: "2",
        name: "Taylor Kim",
        slug: "taylor-kim",
        avatar: "https://i.pravatar.cc/150?u=taylor",
        bio: "Gen Z money coach on a mission to make investing less scary. Started investing at 19 with $50.",
        socialLinks: { twitter: "https://twitter.com/taylorinvests" },
    },
    {
        id: "3",
        name: "Alex Rivera",
        slug: "alex-rivera",
        avatar: "https://i.pravatar.cc/150?u=alexr",
        bio: "Certified Financial Planner focusing on real estate and tax strategies.",
        socialLinks: { linkedin: "https://linkedin.com/in/arivera" },
    }
];

export const mockCategories: Category[] = [
    { id: "1", name: "Budgeting & Debt", slug: "budgeting-and-debt", description: "Master your cash flow and crush debt faster." },
    { id: "2", name: "Investing 101", slug: "investing-101", description: "Start your investing journey with confidence." },
    { id: "3", name: "Investing Strategies", slug: "investing-strategies", description: "Advanced tactics to grow your portfolio." },
    { id: "4", name: "Real Estate", slug: "real-estate", description: "Navigate buying, selling, and financing property." },
    { id: "5", name: "Taxes", slug: "taxes", description: "Maximize deductions and stay compliant." },
    { id: "6", name: "Fintech & Apps", slug: "fintech-and-apps", description: "Technology that powers modern money management." },
    { id: "7", name: "Side Hustles", slug: "side-hustles", description: "Boost your income with practical ideas." },
];

export const mockArticles: Article[] = [
    // --- BUDGETING & DEBT ---
    {
        id: "bd-1",
        title: "How to Justify Small Luxuries on a Budget",
        slug: "justify-small-luxuries-budget",
        excerpt: "Budgeting shouldn't mean misery. Here is how to build guilt-free spending into your financial plan.",
        content: `<h2>The Joy of Small Luxuries</h2><p>We often think of budgeting as restriction. But true financial wellness includes allowing yourself small joys without derailing your goals.</p><p>By intentionally setting aside 5-10% of your income for 'fun money', you prevent budget fatigue.</p>`,
        coverImage: "https://picsum.photos/seed/mock1/800/600",
        publishedAt: "2024-02-15T10:00:00Z",
        author: mockAuthors[0],
        category: mockCategories[0],
        readingTime: 4,
        featured: true,
        articleType: "story",
        keyTakeaways: ["Budgeting is about allocation, not restriction", "Set aside 5-10% for guilt-free spending", "Small joys prevent budget burnout"],
        relatedTool: { name: "Debt Payoff Strategist", slug: "debt-payoff-strategist" },
    },
    {
        id: "bd-2",
        title: "Debt Avalanche vs Snowball Method: Which is Faster?",
        slug: "debt-avalanche-vs-snowball",
        excerpt: "Compare the two most popular debt payoff strategies to find out which one saves you the most money.",
        content: `<h2>Avalanche vs Snowball</h2><p>The debt avalanche targets high-interest debt first, saving you money mathematically. The snowball targets small balances first, giving you psychological wins.</p>`,
        coverImage: "https://picsum.photos/seed/mock2/800/600",
        publishedAt: "2024-02-12T10:00:00Z",
        author: mockAuthors[0],
        category: mockCategories[0],
        readingTime: 6,
        featured: false,
        articleType: "guide",
        keyTakeaways: ["Avalanche saves the most money", "Snowball builds momentum faster", "Choose the one you will actually stick to"],
        relatedTool: { name: "Debt Payoff Strategist", slug: "debt-payoff-strategist" },
    },
    {
        id: "bd-3",
        title: "\"Loud Budgeting\" Phrases You Need to Start Using",
        slug: "loud-budgeting-phrases",
        excerpt: "Stop feeling awkward about turning down expensive plans. Use these scripts to protect your peace and your wallet.",
        content: `<h2>What is Loud Budgeting?</h2><p>Loud budgeting is the act of confidently stating your financial boundaries out loud. Instead of making excuses, you simply state your priorities.</p>`,
        coverImage: "https://picsum.photos/seed/mock3/800/600",
        publishedAt: "2024-02-05T10:00:00Z",
        author: mockAuthors[1],
        category: mockCategories[0],
        readingTime: 3,
        featured: false,
        articleType: "guide",
        keyTakeaways: ["Own your financial choices", "True friends respect your boundaries", "A simple 'that's not in my budget' is a complete sentence"],
        relatedTool: { name: "Debt Payoff Strategist", slug: "debt-payoff-strategist" },
    },

    // --- INVESTING 101 ---
    {
        id: "inv1-1",
        title: "Roth IRA vs Traditional IRA Explained in Simple English",
        slug: "roth-ira-vs-traditional-ira",
        excerpt: "Taxes now or taxes later? We break down exactly which retirement account makes the most sense for your current salary.",
        content: `<h2>The Great Tax Debate</h2><p>A Traditional IRA gives you a tax break today. A Roth IRA gives you tax-free money in retirement. Which is better? It depends on your current tax bracket vs your expected future tax bracket.</p>`,
        coverImage: "https://picsum.photos/seed/mock4/800/600",
        publishedAt: "2024-02-14T10:00:00Z",
        author: mockAuthors[2],
        category: mockCategories[1],
        readingTime: 7,
        featured: true,
        articleType: "guide",
        keyTakeaways: ["Roth = pay taxes now", "Traditional = pay taxes later", "Young earners usually benefit more from a Roth"],
        relatedTool: { name: "Savings Goal Calculator", slug: "savings-goal-calculator" },
    },
    {
        id: "inv1-2",
        title: "How to Start Investing with Little Money",
        slug: "start-investing-little-money",
        excerpt: "You don't need thousands to start. Here is how to begin your investing journey with just $50.",
        content: `<h2>Fractional Shares are Your Best Friend</h2><p>Gone are the days of needing $3,000 to open a mutual fund. Today, you can buy pieces of companies for as little as $1.</p>`,
        coverImage: "https://picsum.photos/seed/mock5/800/600",
        publishedAt: "2024-02-08T10:00:00Z",
        author: mockAuthors[1],
        category: mockCategories[1],
        readingTime: 5,
        featured: false,
        articleType: "guide",
        keyTakeaways: ["Use zero-fee brokerages", "Buy fractional shares of index funds", "Automate your investments"],
        relatedTool: { name: "Savings Goal Calculator", slug: "savings-goal-calculator" },
    },
    {
        id: "inv1-3",
        title: "Child Accounts vs 529 Plans: What Parents Need to Know",
        slug: "child-accounts-vs-529-plans",
        excerpt: "Saving for your kid's future? Understand the tax implications and flexibility of different account types.",
        content: `<h2>Education vs Flexibility</h2><p>A 529 plan offers great tax benefits if the money is used for education. But what if they don't go to college? A custodial UTMA/UGMA account might offer more flexibility.</p>`,
        coverImage: "https://picsum.photos/seed/mock6/800/600",
        publishedAt: "2024-02-01T10:00:00Z",
        author: mockAuthors[2],
        category: mockCategories[1],
        readingTime: 6,
        featured: false,
        articleType: "guide",
        keyTakeaways: ["529s are highly tax-advantaged for education", "Custodial accounts offer maximum flexibility", "New rules allow rolling unused 529 funds into a Roth IRA"],
        relatedTool: { name: "Savings Goal Calculator", slug: "savings-goal-calculator" },
    },

    // --- INVESTING STRATEGIES ---
    {
        id: "inv2-1",
        title: "Active Cash Management: Bond Ladders vs CDs",
        slug: "bond-ladders-vs-cds",
        excerpt: "Stop leaving large cash balances in standard savings. Here is how to actively manage your liquid net worth.",
        content: `<h2>Maximizing Yield on Cash</h2><p>When interest rates are high, leaving money in a 0.01% checking account is a mistake. Consider building a Treasury bill ladder or using staggered certificates of deposit to lock in yields.</p>`,
        coverImage: "https://picsum.photos/seed/mock7/800/600",
        publishedAt: "2024-02-18T10:00:00Z",
        author: mockAuthors[2],
        category: mockCategories[2],
        readingTime: 8,
        featured: true,
        articleType: "guide",
        keyTakeaways: ["T-bills often beat CDs and are state-tax exempt", "Ladders provide liquidity and yield", "Match durations to your cash flow needs"],
        relatedTool: { name: "Wealth Growth Simulator", slug: "wealth-growth-simulator" },
    },
    {
        id: "inv2-2",
        title: "Investing in Fractional Real Estate in 2026",
        slug: "fractional-real-estate-2026",
        excerpt: "How platforms are dividing commercial and residential properties into tradeable shares, and if it's worth your money.",
        content: `<h2>Real Estate for the Masses</h2><p>Crowdfunding platforms allow you to buy shares of an apartment building or commercial space. But beware of the fees and lack of liquidity.</p>`,
        coverImage: "https://picsum.photos/seed/mock8/800/600",
        publishedAt: "2024-02-10T10:00:00Z",
        author: mockAuthors[1],
        category: mockCategories[2],
        readingTime: 7,
        featured: false,
        articleType: "news",
        keyTakeaways: ["Lower barrier to entry for real estate", "Watch out for platform fees", "Investments are often highly illiquid"],
        relatedTool: { name: "Wealth Growth Simulator", slug: "wealth-growth-simulator" },
    },
    {
        id: "inv2-3",
        title: "Tokenized Real-World Assets Explained",
        slug: "tokenized-real-world-assets",
        excerpt: "Blockchain meets traditional finance: how tokenized treasuries and commodities are changing the investing landscape.",
        content: `<h2>Blockchain Bridges the Gap</h2><p>RWA (Real World Assets) tokenization brings traditional financial instruments like bonds and gold onto the blockchain for faster settlement and transparency.</p>`,
        coverImage: "https://picsum.photos/seed/mock9/800/600",
        publishedAt: "2024-02-03T10:00:00Z",
        author: mockAuthors[0],
        category: mockCategories[2],
        readingTime: 6,
        featured: false,
        articleType: "news",
        keyTakeaways: ["Brings 24/7 trading to traditional assets", "Increases transparency via blockchain", "Regulatory landscape is still evolving"],
        relatedTool: { name: "Wealth Growth Simulator", slug: "wealth-growth-simulator" },
    },

    // --- REAL ESTATE ---
    {
        id: "re-1",
        title: "The Psychology of the 5.9% Mortgage Rate Threshold",
        slug: "mortgage-rate-threshold-psychology",
        excerpt: "Why homebuyer demand skyrockets when rates dip below 6%, and what it means for your home search.",
        content: `<h2>The Magic Number</h2><p>Historically, the 6% mark acts as a psychological barrier for homebuyers. When rates dip into the 5s, sidelined buyers flood back into the market, driving up competition and prices.</p>`,
        coverImage: "https://picsum.photos/seed/mock10/800/600",
        publishedAt: "2024-02-16T10:00:00Z",
        author: mockAuthors[2],
        category: mockCategories[3],
        readingTime: 5,
        featured: true,
        articleType: "story",
        keyTakeaways: ["Rates below 6% trigger bidding wars", "Buying slightly higher rates with less competition can sometimes be cheaper", "You can date the rate but you marry the price"],
        relatedTool: { name: "Savings Goal Calculator", slug: "savings-goal-calculator" },
    },
    {
        id: "re-2",
        title: "Best Down Payment Assistance Programs by State",
        slug: "down-payment-assistance-programs",
        excerpt: "First-time homebuyer? You might be leaving thousands of dollars of free grant money on the table.",
        content: `<h2>Free Money for Homebuyers</h2><p>Many states and municipalities offer grants or forgivable loans to help cover down payments and closing costs for eligible first-time buyers.</p>`,
        coverImage: "https://picsum.photos/seed/mock11/800/600",
        publishedAt: "2024-02-09T10:00:00Z",
        author: mockAuthors[0],
        category: mockCategories[3],
        readingTime: 12,
        featured: false,
        articleType: "guide",
        keyTakeaways: ["Programs often have income limits", "Some grants do not need to be repaid if you stay 5+ years", "Always check local housing authority websites"],
        relatedTool: { name: "Savings Goal Calculator", slug: "savings-goal-calculator" },
    },
    {
        id: "re-3",
        title: "Climate-Resilient Home Features With Best ROI",
        slug: "climate-resilient-home-features-roi",
        excerpt: "As extreme weather increases, certain home upgrades are paying off big in resale value and insurance savings.",
        content: `<h2>Future-Proofing Your Home</h2><p>Upgrades like impact-resistant roofs, French drains, and solar-plus-battery systems not only protect your home but significantly lower insurance premiums.</p>`,
        coverImage: "https://picsum.photos/seed/mock12/800/600",
        publishedAt: "2024-02-04T10:00:00Z",
        author: mockAuthors[1],
        category: mockCategories[3],
        readingTime: 6,
        featured: false,
        articleType: "guide",
        keyTakeaways: ["Insurance savings offset upgrade costs over time", "Elevating HVAC units prevents flood damage", "Energy independence adds huge resale value"],
        relatedTool: { name: "Savings Goal Calculator", slug: "savings-goal-calculator" },
    },

    // --- TAXES ---
    {
        id: "tax-1",
        title: "Itemizing State and Local Taxes Under the New $40,400 Cap",
        slug: "itemizing-salt-taxes",
        excerpt: "A deep dive into the recent changes to SALT deductions and how high-earners in high-tax states can navigate them.",
        content: `<h2>The SALT Cap Shift</h2><p>With legislative changes altering the State and Local Tax deduction caps, taxpayers in states like NY, NJ, and CA need new strategies to minimize their federal tax burden.</p>`,
        coverImage: "https://picsum.photos/seed/mock13/800/600",
        publishedAt: "2024-02-20T10:00:00Z",
        author: mockAuthors[2],
        category: mockCategories[4],
        readingTime: 7,
        featured: true,
        articleType: "news",
        keyTakeaways: ["The SALT cap affects high-tax state residents", "Workarounds exist for business owners", "Consult a CPA to navigate the exact phase-outs"],
        relatedTool: { name: "Freedom Fund Calculator", slug: "freedom-fund-calculator" },
    },
    {
        id: "tax-2",
        title: "W-4 Adjustment Guide: Stop Giving the IRS a Free Loan",
        slug: "w4-adjustment-guide",
        excerpt: "If you always get a huge tax refund, you are doing it wrong. Learn how to adjust your withholdings for bigger paychecks.",
        content: `<h2>The Refund Myth</h2><p>A big tax refund isn't a bonus from the government. It's your own money that you let the IRS hold interest-free for a year. Adjusting your W-4 puts that money back in your monthly paycheck.</p>`,
        coverImage: "https://picsum.photos/seed/mock14/800/600",
        publishedAt: "2024-01-25T10:00:00Z",
        author: mockAuthors[0],
        category: mockCategories[4],
        readingTime: 5,
        featured: false,
        articleType: "guide",
        keyTakeaways: ["Aim for a refund close to $0", "Use the IRS withholding calculator", "Update your W-4 after major life events"],
        relatedTool: { name: "Freedom Fund Calculator", slug: "freedom-fund-calculator" },
    },
    {
        id: "tax-3",
        title: "Qualified Overtime Tax Deduction Rules (OBBBA)",
        slug: "qualified-overtime-tax-deduction",
        excerpt: "Understanding the new overtime tax exemptions and how to ensure your extra hours aren't eaten by taxes.",
        content: `<h2>Keeping What You Earn</h2><p>Recent legislation changes how consecutive overtime hours are taxed. Ensure your employer is correctly classifying these hours to maximize your take-home pay.</p>`,
        coverImage: "https://picsum.photos/seed/mock15/800/600",
        publishedAt: "2024-02-02T10:00:00Z",
        author: mockAuthors[2],
        category: mockCategories[4],
        readingTime: 6,
        featured: false,
        articleType: "news",
        keyTakeaways: ["Overtime tax rules are shifting", "Review your paystubs carefully", "Tipped workers have specific new exemptions"],
        relatedTool: { name: "Freedom Fund Calculator", slug: "freedom-fund-calculator" },
    },

    // --- FINTECH & APPS ---
    {
        id: "fin-1",
        title: "AI Apps That Manage Your Money Automatically",
        slug: "ai-money-management-apps",
        excerpt: "The future is hands-free. We review the top AI tools that invest, save, and negotiate bills for you.",
        content: `<h2>Robo-Advisors on Steroids</h2><p>Modern fintech apps don't just show you graphs; they take action. From identifying useless subscriptions to automatically moving cash between high-yield accounts based on algorithms.</p>`,
        coverImage: "https://picsum.photos/seed/mock16/800/600",
        publishedAt: "2024-02-19T10:00:00Z",
        author: mockAuthors[1],
        category: mockCategories[5],
        readingTime: 6,
        featured: true,
        articleType: "guide",
        keyTakeaways: ["AI can optimize cash sweep accounts", "Automated negotiation works for telecom bills", "Always review the AI's permissions"],
    },
    {
        id: "fin-2",
        title: "Using Passkeys for Financial Apps in 2026",
        slug: "passkeys-financial-apps-2026",
        excerpt: "Passwords are dead. Here is why passkeys are making your banking apps virtually unhackable.",
        content: `<h2>The End of Passwords</h2><p>With major banks finally adopting FIDO passkey standards, the risk of phishing and database leaks is drastically reduced. Here is how to set them up across your portfolio.</p>`,
        coverImage: "https://picsum.photos/seed/mock17/800/600",
        publishedAt: "2024-02-11T10:00:00Z",
        author: mockAuthors[2],
        category: mockCategories[5],
        readingTime: 5,
        featured: false,
        articleType: "guide",
        keyTakeaways: ["Passkeys rely on device biometrics", "They prevent phishing attacks", "Ensure you have a cloud sync backup for device loss"],
    },
    {
        id: "fin-3",
        title: "SoFi vs Discover for Debt Consolidation",
        slug: "sofi-vs-discover-debt-consolidation",
        excerpt: "An in-depth comparison of the two giants in personal loans. Which app offers better rates and user experience?",
        content: `<h2>Refinancing Made Easy</h2><p>Both SoFi and Discover offer competitive personal loans for consolidating high-interest credit card debt. But their approval algorithms and fee structures differ wildly.</p>`,
        coverImage: "https://picsum.photos/seed/mock18/800/600",
        publishedAt: "2024-02-06T10:00:00Z",
        author: mockAuthors[0],
        category: mockCategories[5],
        readingTime: 8,
        featured: false,
        articleType: "guide",
        keyTakeaways: ["SoFi offers unemployment protection features", "Discover shines in customer service", "Always check pre-qualification rates first"],
    },

    // --- SIDE HUSTLES ---
    {
        id: "sh-1",
        title: "High-Ticket B2B Side Hustles for 2026",
        slug: "high-ticket-b2b-side-hustles",
        excerpt: "Stop competing for $5 gigs on Fiverr. Here is how to sell high-value services directly to other businesses.",
        content: `<h2>B2B is the Secret Sauce</h2><p>Businesses have budgets; individuals have feelings. By transitioning your skills from B2C to B2B—like offering lead generation or specialized software consulting—you can 10x your hourly rate.</p>`,
        coverImage: "https://picsum.photos/seed/mock19/800/600",
        publishedAt: "2024-02-17T10:00:00Z",
        author: mockAuthors[0],
        category: mockCategories[6],
        readingTime: 7,
        featured: true,
        articleType: "guide",
        keyTakeaways: ["Businesses pay for ROI, not hours", "LinkedIn is your best sales channel", "Specialize in one niche software tool"],
        relatedTool: { name: "Freedom Fund Calculator", slug: "freedom-fund-calculator" },
    },
    {
        id: "sh-2",
        title: "How to Start a UGC Business (User Generated Content)",
        slug: "how-to-start-ugc-business",
        excerpt: "You don't need millions of followers to get paid by brands. You just need a smartphone and good lighting.",
        content: `<h2>The Anti-Influencer Model</h2><p>Brands need authentic-looking videos for their TikTok and Instagram ads. They pay neat sums for everyday people to film reviews of their products—no posting to your own feed required.</p>`,
        coverImage: "https://picsum.photos/seed/mock20/800/600",
        publishedAt: "2024-02-13T10:00:00Z",
        author: mockAuthors[1],
        category: mockCategories[6],
        readingTime: 6,
        featured: false,
        articleType: "guide",
        keyTakeaways: ["UGC creators are essentially freelance actors", "Build a portfolio with items you already own", "Pitch directly to mid-sized ecommerce brands"],
        relatedTool: { name: "Freedom Fund Calculator", slug: "freedom-fund-calculator" },
    },
    {
        id: "sh-3",
        title: "Selling Digital Printables on Etsy: What Still Works",
        slug: "selling-digital-printables-etsy",
        excerpt: "The market is flooded, but there is still money to be made. Discover the highly-specific niches that are actually selling.",
        content: `<h2>The Riches are in the Niches</h2><p>Generic planners don't sell anymore. But specialized forms for niche industries (like 'Dog Walker Intake Forms' or 'Wedding Florist Checklists') sell consistently with zero inventory costs.</p>`,
        coverImage: "https://picsum.photos/seed/mock21/800/600",
        publishedAt: "2024-02-07T10:00:00Z",
        author: mockAuthors[0],
        category: mockCategories[6],
        readingTime: 5,
        featured: false,
        articleType: "guide",
        keyTakeaways: ["Solve a specific problem for a specific profession", "Use SEO optimized titles and tags", "Bundle items to increase average order value"],
        relatedTool: { name: "Freedom Fund Calculator", slug: "freedom-fund-calculator" },
    }
];

export class MockCMSAdapter implements CMSAdapter {
    async getFeaturedArticle(): Promise<Article | null> {
        await new Promise(resolve => setTimeout(resolve, 600));
        return mockArticles.find((a) => a.featured) || mockArticles[0];
    }

    async getHeroArticles(limit: number): Promise<Article[]> {
        await new Promise(resolve => setTimeout(resolve, 400));
        return mockArticles.slice(0, limit);
    }

    async getCuratedArticles(): Promise<Article[]> {
        await new Promise(resolve => setTimeout(resolve, 400));
        return mockArticles.slice(1, 4);
    }

    async getLatestArticles({ page, limit }: { page: number; limit: number }): Promise<Article[]> {
        await new Promise(resolve => setTimeout(resolve, 500));
        const start = (page - 1) * limit;
        return mockArticles.slice(start, start + limit);
    }

    async getArticleBySlug(slug: string): Promise<Article | null> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockArticles.find((a) => a.slug === slug) || null;
    }

    async getArticlesByCategory(categorySlug: string, { page, limit }: { page: number; limit: number }): Promise<{ articles: Article[]; totalPages: number }> {
        await new Promise(resolve => setTimeout(resolve, 400));
        const filtered = mockArticles.filter((a) => a.category.slug === categorySlug);
        const totalPages = Math.ceil(filtered.length / limit);
        const start = (page - 1) * limit;
        return {
            articles: filtered.slice(start, start + limit),
            totalPages
        };
    }

    async getArticlesByCategorySlugs(slugs: string[], limit: number): Promise<Record<string, Article[]>> {
        await new Promise(resolve => setTimeout(resolve, 800));
        const result: Record<string, Article[]> = {};
        for (const slug of slugs) {
            result[slug] = mockArticles.filter(a => a.category.slug === slug).slice(0, limit);
        }
        return result;
    }

    async getAllCategories(): Promise<Category[]> {
        await new Promise(resolve => setTimeout(resolve, 200));
        return mockCategories;
    }

    async getRelatedArticles(currentArticleId: string): Promise<Article[]> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockArticles.filter((a) => a.id !== currentArticleId).slice(0, 3);
    }

    async searchArticles(query: string): Promise<Article[]> {
        await new Promise(resolve => setTimeout(resolve, 400));
        const lowerQuery = query.toLowerCase();
        return mockArticles.filter(article =>
            article.title.toLowerCase().includes(lowerQuery) ||
            article.excerpt.toLowerCase().includes(lowerQuery) ||
            article.content.toLowerCase().includes(lowerQuery)
        );
    }
}

export const cms = new MockCMSAdapter();

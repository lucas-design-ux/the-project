import { notFound } from "next/navigation";
import { Metadata } from "next";
import dynamic from "next/dynamic";

// Lazy load all tool components for optimal performance
const SavingsGoalCalculator = dynamic(
    () => import("@/components/tools/SavingsGoalCalculator/SavingsGoalCalculator")
);

const CompoundInterestCalculator = dynamic(
    () => import("@/components/tools/CompoundInterestCalculator/CompoundInterestCalculator")
);

const DebtPayoffCalculator = dynamic(
    () => import("@/components/tools/DebtPayoffCalculator/DebtPayoffCalculator")
);

const FinancialIndependenceCalculator = dynamic(
    () => import("@/components/tools/FinancialIndependenceCalculator/FinancialIndependenceCalculator")
);

type ToolPageParams = Promise<{ slug: string }>;

interface ToolPageProps {
    params: ToolPageParams;
}

const tools: Record<string, { name: string; description: string; component: React.ComponentType }> = {
    "savings-goal-calculator": {
        name: "Savings Goal Calculator",
        description: "Figure out how long it'll take to reach your savings goal. Play with the numbers and see compound interest in action.",
        component: SavingsGoalCalculator,
    },
    "wealth-growth-simulator": {
        name: "Wealth Growth Simulator",
        description: "Watch your money multiply through the power of compound interest. Visualize decades of growth in seconds.",
        component: CompoundInterestCalculator,
    },
    "debt-payoff-strategist": {
        name: "Debt Payoff Strategist",
        description: "Compare Avalanche vs. Snowball methods and discover the fastest path to becoming debt-free.",
        component: DebtPayoffCalculator,
    },
    "freedom-fund-calculator": {
        name: "Freedom Fund Calculator",
        description: "Calculate your Financial Independence number and discover when you can retire on your own terms.",
        component: FinancialIndependenceCalculator,
    },
};

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
    const { slug } = await params;
    const tool = tools[slug];

    if (!tool) {
        return {
            title: "Tool Not Found",
        };
    }

    return {
        title: `${tool.name} | MoneyHub`,
        description: tool.description,
    };
}

export default async function ToolPage({ params }: ToolPageProps) {
    const { slug } = await params;
    const tool = tools[slug];

    if (!tool) {
        notFound();
    }

    const ToolComponent = tool.component;

    return (
        <div className="container max-w-5xl py-32 md:py-64">
            <div className="space-y-8">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                        Interactive Tool
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{tool.name}</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">{tool.description}</p>
                </div>

                <div className="rounded-lg border border-border bg-card p-6 md:p-8">
                    <ToolComponent />
                </div>

                <div className="rounded-lg border border-muted bg-muted/50 p-6">
                    <h3 className="text-sm font-semibold mb-2">How to use this tool</h3>
                    <p className="text-sm text-muted-foreground">
                        {slug === "savings-goal-calculator" && "Adjust the sliders to match your situation. The calculator updates in real-time to show you exactly how long it'll take to hit your goal. Pro tip: small increases in your monthly contribution can dramatically reduce the time needed!"}
                        {slug === "wealth-growth-simulator" && "Use the sliders to model different investment scenarios. Watch how time and consistent contributions create exponential growth. Try doubling your time horizon or monthly contribution to see the dramatic impact."}
                        {slug === "debt-payoff-strategist" && "Add all your debts, then set your total monthly payment. The tool compares both strategies so you can choose what works best for you—mathematical optimization (Avalanche) or psychological momentum (Snowball)."}
                        {slug === "freedom-fund-calculator" && "Input your dream retirement income and current savings. The calculator shows your FI Number and required monthly investments. Don't worry if the numbers seem high—this is about building a realistic plan, not instant perfection."}
                    </p>
                </div>
            </div>
        </div>
    );
}

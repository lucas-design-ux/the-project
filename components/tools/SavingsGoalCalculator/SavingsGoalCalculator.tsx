"use client";

import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { formatCurrency } from "@/lib/utils/finance";
import CalculatorWrapper, { CollapsibleSection } from "@/components/tools/CalculatorWrapper/CalculatorWrapper";

export default function SavingsGoalCalculator() {
    const [goalAmount, setGoalAmount] = useState(10000);
    const [initialSavings, setInitialSavings] = useState(500);
    const [monthlyContribution, setMonthlyContribution] = useState(200);
    const [annualInterestRate, setAnnualInterestRate] = useState(5);

    const result = useMemo(() => {
        const monthlyRate = annualInterestRate / 100 / 12;
        let balance = initialSavings;
        let months = 0;
        const timeline: { month: number; balance: number; goal: number }[] = [
            { month: 0, balance: initialSavings, goal: goalAmount },
        ];

        while (balance < goalAmount && months < 600) {
            balance = balance * (1 + monthlyRate) + monthlyContribution;
            months++;
            // Record every 3 months for chart performance
            if (months % 3 === 0 || balance >= goalAmount) {
                timeline.push({ month: months, balance: Math.round(balance), goal: goalAmount });
            }
        }

        const totalContributed = initialSavings + monthlyContribution * months;
        const interestEarned = balance - totalContributed;

        return { months, finalAmount: balance, totalContributed, interestEarned, timeline };
    }, [goalAmount, initialSavings, monthlyContribution, annualInterestRate]);

    const years = Math.floor(result.months / 12);
    const remainingMonths = result.months % 12;

    const resultData = useMemo(() => ({
        months: result.months,
        totalContributed: result.totalContributed,
        interestEarned: result.interestEarned,
    }), [result]);

    return (
        <CalculatorWrapper calculatorSlug="savings-goal-calculator" resultData={resultData}>
        <div className="space-y-6 md:space-y-8">
            <div className="grid gap-6 md:gap-8 md:grid-cols-2">
                {/* Input Section */}
                <div className="space-y-6">
                    <div className="space-y-3">
                        <label className="flex items-center justify-between text-sm font-medium">
                            <span>Savings Goal</span>
                            <span className="text-primary font-bold">{formatCurrency(goalAmount)}</span>
                        </label>
                        <input
                            type="range" min="1000" max="100000" step="1000"
                            value={goalAmount}
                            onChange={(e) => setGoalAmount(Number(e.target.value))}
                            aria-label="Savings goal amount"
                            className="tool-slider"
                            style={{ '--pct': `${((goalAmount - 1000) / (100000 - 1000)) * 100}%` } as React.CSSProperties}
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="flex items-center justify-between text-sm font-medium">
                            <span>Starting Amount</span>
                            <span className="text-primary font-bold">{formatCurrency(initialSavings)}</span>
                        </label>
                        <input
                            type="range" min="0" max="10000" step="100"
                            value={initialSavings}
                            onChange={(e) => setInitialSavings(Number(e.target.value))}
                            aria-label="Starting savings amount"
                            className="tool-slider"
                            style={{ '--pct': `${(initialSavings / 10000) * 100}%` } as React.CSSProperties}
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="flex items-center justify-between text-sm font-medium">
                            <span>Monthly Contribution</span>
                            <span className="text-primary font-bold">{formatCurrency(monthlyContribution)}</span>
                        </label>
                        <input
                            type="range" min="0" max="2000" step="50"
                            value={monthlyContribution}
                            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                            aria-label="Monthly savings contribution"
                            className="tool-slider"
                            style={{ '--pct': `${(monthlyContribution / 2000) * 100}%` } as React.CSSProperties}
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="flex items-center justify-between text-sm font-medium">
                            <span>Annual Interest Rate</span>
                            <span className="text-primary font-bold">{annualInterestRate}%</span>
                        </label>
                        <input
                            type="range" min="0" max="15" step="0.5"
                            value={annualInterestRate}
                            onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
                            aria-label="Annual interest rate"
                            className="tool-slider"
                            style={{ '--pct': `${(annualInterestRate / 15) * 100}%` } as React.CSSProperties}
                        />
                    </div>
                </div>

                {/* Results Section */}
                <div className="flex flex-col justify-center space-y-6">
                    <div className="border border-foreground bg-muted/20 p-6 md:p-8 text-center">
                        <p className="font-serif text-sm text-muted-foreground mb-2 italic">Time to reach your goal</p>
                        <p className="font-serif text-5xl font-bold text-foreground tracking-tight">
                            {years > 0 && `${years}y `}{remainingMonths}m
                        </p>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mt-4 border-t border-border pt-4">
                            Target date: {new Date(new Date().setMonth(new Date().getMonth() + result.months)).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                    </div>

                    <div className="space-y-5 border-t border-b border-border py-4 md:py-6">
                        <div className="flex justify-between items-baseline">
                            <span className="text-sm font-medium text-muted-foreground">Total Contributions</span>
                            <span className="font-serif text-lg font-bold">{formatCurrency(result.totalContributed)}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                            <span className="text-sm font-medium text-muted-foreground">Interest Earned</span>
                            <span className="font-serif text-lg font-bold text-foreground/70">{formatCurrency(result.interestEarned)}</span>
                        </div>
                        <div className="flex justify-between items-baseline pt-4 border-t border-dashed border-border">
                            <span className="font-bold text-lg">Final Amount</span>
                            <span className="font-serif text-2xl font-bold text-foreground">{formatCurrency(result.finalAmount)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Growth Chart */}
            <CollapsibleSection label="Show Growth Chart">
            <div className="border border-border bg-card p-5 md:p-8">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Savings Growth Over Time</h3>
                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={result.timeline} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="month"
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(m) => `${Math.floor(m / 12)}y`}
                            interval={Math.max(0, Math.ceil(result.timeline.length / 6) - 1)}
                        />
                        <YAxis
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                            formatter={(value?: number | string) => formatCurrency(Number(value ?? 0))}
                            labelFormatter={(m) => `Month ${m}`}
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                fontSize: "12px",
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="goal"
                            stroke="hsl(var(--muted-foreground))"
                            strokeWidth={1}
                            strokeDasharray="5 5"
                            fill="none"
                            name="Goal"
                        />
                        <Area
                            type="monotone"
                            dataKey="balance"
                            stroke="hsl(var(--foreground))"
                            strokeWidth={2}
                            fill="hsl(var(--foreground))"
                            fillOpacity={0.08}
                            name="Balance"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            </CollapsibleSection>

            {/* Progress Bar */}
            <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex justify-between items-end">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Progress</span>
                    <span className="font-serif text-xl font-bold text-foreground">
                        {((result.finalAmount / goalAmount) * 100).toFixed(0)}%
                    </span>
                </div>
                <div className="h-4 w-full bg-muted overflow-hidden border border-border">
                    <div
                        className="h-full bg-foreground transition-all duration-700 ease-out"
                        style={{ width: `${Math.min((result.finalAmount / goalAmount) * 100, 100)}%` }}
                    />
                </div>
            </div>

            {/* Pro Tip */}
            <CollapsibleSection label="Show Pro Tip">
            <div className="border border-muted bg-muted/30 p-5 md:p-8">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Pro Tip</p>
                <p className="text-sm leading-relaxed">
                    <strong className="text-foreground">Compound interest is the eighth wonder of the world.</strong> He who
                    understands it, earns it... he who doesn&apos;t... pays it. Even small increases in your monthly contribution
                    can dramatically reduce the time to your goal.
                </p>
            </div>
            </CollapsibleSection>
        </div>
        </CalculatorWrapper>
    );
}

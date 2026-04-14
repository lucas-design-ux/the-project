"use client";

import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { formatCurrency, compoundGrowth } from "@/lib/utils/finance";
import CalculatorWrapper, { CollapsibleSection } from "@/components/tools/CalculatorWrapper/CalculatorWrapper";

interface TooltipPayloadItem {
    payload: { year: number; balance: number; contributed: number; interest: number };
}

export default function CompoundInterestCalculator() {
    const [initialInvestment, setInitialInvestment] = useState(5000);
    const [monthlyContribution, setMonthlyContribution] = useState(500);
    const [annualInterestRate, setAnnualInterestRate] = useState(7);
    const [timePeriod, setTimePeriod] = useState(20);

    const chartData = useMemo(
        () => compoundGrowth(initialInvestment, monthlyContribution, annualInterestRate, timePeriod),
        [initialInvestment, monthlyContribution, annualInterestRate, timePeriod]
    );

    const finalData = chartData[chartData.length - 1];
    const totalGrowthPercent = ((finalData.balance - finalData.contributed) / finalData.contributed) * 100;

    const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-card border border-border p-3 shadow-lg">
                    <p className="text-sm font-bold mb-2">Year {payload[0].payload.year}</p>
                    <p className="text-xs text-muted-foreground">
                        Total: <span className="font-bold text-foreground">{formatCurrency(payload[0].payload.balance)}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Contributed: <span className="font-bold">{formatCurrency(payload[0].payload.contributed)}</span>
                    </p>
                    <p className="text-xs text-foreground/70">
                        Interest: <span className="font-bold">{formatCurrency(payload[0].payload.interest)}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    const resultData = useMemo(() => ({
        interestEarned: finalData.interest,
        totalContributed: finalData.contributed,
        finalBalance: finalData.balance,
    }), [finalData]);

    return (
        <CalculatorWrapper calculatorSlug="wealth-growth-simulator" resultData={resultData}>
        <div className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                    <div className="space-y-3">
                        <label className="flex items-center justify-between text-sm font-medium">
                            <span>Initial Investment</span>
                            <span className="text-primary font-bold">{formatCurrency(initialInvestment)}</span>
                        </label>
                        <input
                            type="range" min="0" max="50000" step="1000"
                            value={initialInvestment}
                            onChange={(e) => setInitialInvestment(Number(e.target.value))}
                            aria-label="Initial investment amount"
                            className="tool-slider"
                            style={{ '--pct': `${(initialInvestment / 50000) * 100}%` } as React.CSSProperties}
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
                            aria-label="Monthly contribution amount"
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
                            aria-label="Annual interest rate percentage"
                            className="tool-slider"
                            style={{ '--pct': `${(annualInterestRate / 15) * 100}%` } as React.CSSProperties}
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="flex items-center justify-between text-sm font-medium">
                            <span>Time Period</span>
                            <span className="text-primary font-bold">{timePeriod} years</span>
                        </label>
                        <input
                            type="range" min="1" max="40" step="1"
                            value={timePeriod}
                            onChange={(e) => setTimePeriod(Number(e.target.value))}
                            aria-label="Investment time period in years"
                            className="tool-slider"
                            style={{ '--pct': `${((timePeriod - 1) / (40 - 1)) * 100}%` } as React.CSSProperties}
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-center space-y-4">
                    <div className="border-2 border-foreground bg-muted/20 p-6 text-center">
                        <p className="font-serif text-sm text-muted-foreground mb-2 italic">Final Balance</p>
                        <p className="font-serif text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                            {formatCurrency(finalData.balance)}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="border border-border bg-card p-4">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Total Invested</p>
                            <p className="font-serif text-xl font-bold">{formatCurrency(finalData.contributed)}</p>
                        </div>
                        <div className="border border-border bg-card p-4">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Interest Earned</p>
                            <p className="font-serif text-xl font-bold text-foreground/70">{formatCurrency(finalData.interest)}</p>
                        </div>
                    </div>
                    <div className="border border-border bg-muted/50 p-4">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Total Growth</p>
                        <p className="font-serif text-3xl font-bold text-foreground">+{totalGrowthPercent.toFixed(1)}%</p>
                    </div>
                </div>
            </div>

            <CollapsibleSection label="Show Growth Chart">
            <div className="border border-border bg-card p-6 md:p-8">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Wealth Growth Over Time</h3>
                <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} label={{ value: "Years", position: "insideBottom", offset: -5, fontSize: 12 }} interval={Math.max(0, Math.ceil(chartData.length / 8) - 1)} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" formatter={(value) => <span className="text-xs uppercase tracking-wider">{value}</span>} />
                        <Line type="monotone" dataKey="contributed" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} name="Total Invested" />
                        <Line type="monotone" dataKey="balance" stroke="hsl(var(--foreground))" strokeWidth={3} dot={false} name="Total Balance" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            </CollapsibleSection>

            <CollapsibleSection label="Show Key Insight">
            <div className="border border-muted bg-muted/30 p-6 md:p-8">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Key Insight</p>
                <p className="text-sm leading-relaxed">
                    <strong className="text-foreground">Time is your greatest asset.</strong> Notice how the gap between what you
                    contributed (gray line) and your total balance (black line) grows exponentially over time. That's compound
                    interest at work—your money making money.
                </p>
            </div>
            </CollapsibleSection>
        </div>
        </CalculatorWrapper>
    );
}

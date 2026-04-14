"use client";

import { useState, useMemo } from "react";
import { formatCurrency } from "@/lib/utils/finance";
import CalculatorWrapper, { CollapsibleSection } from "@/components/tools/CalculatorWrapper/CalculatorWrapper";

export default function FinancialIndependenceCalculator() {
    const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState(4000);
    const [currentPortfolio, setCurrentPortfolio] = useState(50000);
    const [currentAge, setCurrentAge] = useState(30);
    const [targetAge, setTargetAge] = useState(55);
    const [expectedReturn, setExpectedReturn] = useState(7);

    const calculations = useMemo(() => {
        const desiredAnnualIncome = desiredMonthlyIncome * 12;
        const fiNumber = desiredAnnualIncome * 25; // 4% rule
        const yearsUntilTarget = targetAge - currentAge;
        const monthsUntilTarget = yearsUntilTarget * 12;

        if (monthsUntilTarget <= 0) {
            return {
                fiNumber, requiredMonthlySavings: 0, progressPercent: 0,
                projectedFIDate: new Date(), status: "invalid" as const,
                message: "Target age must be greater than current age.", yearsUntilTarget: 0,
            };
        }

        const monthlyRate = expectedReturn / 100 / 12;
        const futureValueOfCurrentPortfolio = currentPortfolio * Math.pow(1 + monthlyRate, monthsUntilTarget);
        const remainingNeeded = fiNumber - futureValueOfCurrentPortfolio;

        let requiredMonthlySavings = 0;
        if (remainingNeeded > 0) {
            const annuityFactor = (Math.pow(1 + monthlyRate, monthsUntilTarget) - 1) / monthlyRate;
            requiredMonthlySavings = remainingNeeded / annuityFactor;
        }

        const progressPercent = (currentPortfolio / fiNumber) * 100;

        let status: "excellent" | "good" | "challenging" | "achieved";
        let message: string;

        if (currentPortfolio >= fiNumber) {
            status = "achieved";
            message = "You've reached your FI number! You could retire today if you wanted.";
        } else if (requiredMonthlySavings < 500) {
            status = "excellent";
            message = "You're crushing it! Stay the course and you'll hit your goal ahead of schedule.";
        } else if (requiredMonthlySavings < 1500) {
            status = "good";
            message = "You're on a solid path. Consistent effort will get you there.";
        } else {
            status = "challenging";
            message = `This goal is ambitious. Consider extending your timeline to ${targetAge + 5} or increasing your current portfolio contributions.`;
        }

        const projectedFIDate = new Date();
        projectedFIDate.setFullYear(projectedFIDate.getFullYear() + yearsUntilTarget);

        return { fiNumber, requiredMonthlySavings: Math.max(0, requiredMonthlySavings), progressPercent, projectedFIDate, status, message, yearsUntilTarget };
    }, [desiredMonthlyIncome, currentPortfolio, currentAge, targetAge, expectedReturn]);

    const getStatusColor = () => {
        switch (calculations.status) {
            case "excellent": return "border-foreground bg-foreground/10";
            case "good": return "border-foreground/60 bg-foreground/5";
            case "challenging": return "border-muted-foreground bg-muted/30";
            case "achieved": return "border-foreground bg-foreground text-background";
            default: return "border-border bg-card";
        }
    };

    const resultData = useMemo(() => ({
        requiredMonthlySavings: calculations.requiredMonthlySavings,
        fiNumber: calculations.fiNumber,
        progressPercent: calculations.progressPercent,
    }), [calculations]);

    return (
        <CalculatorWrapper calculatorSlug="freedom-fund-calculator" resultData={resultData}>
        <div className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                    <div className="space-y-3">
                        <label className="flex items-center justify-between text-sm font-medium">
                            <span>Desired Monthly Income</span>
                            <span className="text-primary font-bold">{formatCurrency(desiredMonthlyIncome)}</span>
                        </label>
                        <input
                            type="range" min="1000" max="10000" step="100"
                            value={desiredMonthlyIncome}
                            onChange={(e) => setDesiredMonthlyIncome(Number(e.target.value))}
                            aria-label="Desired monthly retirement income"
                            className="tool-slider"
                            style={{ '--pct': `${((desiredMonthlyIncome - 1000) / (10000 - 1000)) * 100}%` } as React.CSSProperties}
                        />
                        <p className="text-xs text-muted-foreground">How much you want to live on each month in retirement</p>
                    </div>
                    <div className="space-y-3">
                        <label className="flex items-center justify-between text-sm font-medium">
                            <span>Current Portfolio Value</span>
                            <span className="text-primary font-bold">{formatCurrency(currentPortfolio)}</span>
                        </label>
                        <input
                            type="range" min="0" max="500000" step="5000"
                            value={currentPortfolio}
                            onChange={(e) => setCurrentPortfolio(Number(e.target.value))}
                            aria-label="Current investment portfolio value"
                            className="tool-slider"
                            style={{ '--pct': `${(currentPortfolio / 500000) * 100}%` } as React.CSSProperties}
                        />
                        <p className="text-xs text-muted-foreground">Total value of your investments today</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <label className="flex items-center justify-between text-sm font-medium">
                                <span>Current Age</span>
                                <span className="text-primary font-bold">{currentAge}</span>
                            </label>
                            <input
                                type="range" min="18" max="65" step="1"
                                value={currentAge}
                                onChange={(e) => setCurrentAge(Number(e.target.value))}
                                aria-label="Your current age"
                                className="tool-slider"
                                style={{ '--pct': `${((currentAge - 18) / (65 - 18)) * 100}%` } as React.CSSProperties}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="flex items-center justify-between text-sm font-medium">
                                <span>Target FI Age</span>
                                <span className="text-primary font-bold">{targetAge}</span>
                            </label>
                            <input
                                type="range" min="30" max="75" step="1"
                                value={targetAge}
                                onChange={(e) => setTargetAge(Number(e.target.value))}
                                aria-label="Target financial independence age"
                                className="tool-slider"
                                style={{ '--pct': `${((targetAge - 30) / (75 - 30)) * 100}%` } as React.CSSProperties}
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="flex items-center justify-between text-sm font-medium">
                            <span>Expected Annual Return</span>
                            <span className="text-primary font-bold">{expectedReturn}%</span>
                        </label>
                        <input
                            type="range" min="0" max="12" step="0.5"
                            value={expectedReturn}
                            onChange={(e) => setExpectedReturn(Number(e.target.value))}
                            aria-label="Expected annual investment return"
                            className="tool-slider"
                            style={{ '--pct': `${(expectedReturn / 12) * 100}%` } as React.CSSProperties}
                        />
                        <p className="text-xs text-muted-foreground">Conservative: 5-6%, Moderate: 7-8%, Aggressive: 9-10%</p>
                    </div>
                </div>

                <div className="flex flex-col justify-center space-y-4">
                    <div className="border-2 border-foreground bg-muted/20 p-6 text-center">
                        <p className="font-serif text-sm text-muted-foreground mb-2 italic">Your FI Number</p>
                        <p className="font-serif text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-2">
                            {formatCurrency(calculations.fiNumber)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Based on the 4% rule ({formatCurrency(desiredMonthlyIncome * 12)}/year)
                        </p>
                    </div>
                    <div className="border border-foreground bg-foreground/5 p-6">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Required Monthly Investment</p>
                        <p className="font-serif text-3xl font-bold text-foreground mb-2">
                            {formatCurrency(calculations.requiredMonthlySavings)}
                            <span className="text-base font-normal text-muted-foreground">/month</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                            for the next {calculations.yearsUntilTarget} years to reach your goal
                        </p>
                    </div>
                    <div className="border border-border bg-card p-4">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Current Progress</p>
                        <div className="flex items-end gap-4">
                            <p className="font-serif text-4xl font-bold">{calculations.progressPercent.toFixed(1)}%</p>
                            <div className="flex-1">
                                <div className="h-3 w-full bg-muted border border-border">
                                    <div
                                        className="h-full bg-foreground transition-all duration-700"
                                        style={{ width: `${Math.min(calculations.progressPercent, 100)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`border-2 ${getStatusColor()} p-6 md:p-8 transition-all duration-300`}>
                <div className="flex-1">
                    <p className="text-xs uppercase tracking-widest mb-2 opacity-70">
                        {calculations.status === "achieved" && "Goal Achieved"}
                        {calculations.status === "excellent" && "Excellent Progress"}
                        {calculations.status === "good" && "On Track"}
                        {calculations.status === "challenging" && "Ambitious Goal"}
                    </p>
                    <p className="font-medium leading-relaxed">{calculations.message}</p>
                    {calculations.status !== "achieved" && (
                        <p className="text-xs mt-3 opacity-70">
                            Projected FI Date:{" "}
                            <strong>{calculations.projectedFIDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</strong>
                        </p>
                    )}
                </div>
            </div>

            <CollapsibleSection label="Show the Math">
            <div className="border border-border bg-card p-6 md:p-8">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-6">The Math Behind Your FI Number</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="border-l-2 border-foreground pl-4">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Annual Income Needed</p>
                        <p className="font-serif text-2xl font-bold">{formatCurrency(desiredMonthlyIncome * 12)}</p>
                    </div>
                    <div className="border-l-2 border-muted-foreground pl-4">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Multiply by 25</p>
                        <p className="font-serif text-2xl font-bold">× 25</p>
                        <p className="text-xs text-muted-foreground mt-1">(The 4% Safe Withdrawal Rate)</p>
                    </div>
                    <div className="border-l-2 border-foreground/60 pl-4">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Your FI Number</p>
                        <p className="font-serif text-2xl font-bold">{formatCurrency(calculations.fiNumber)}</p>
                    </div>
                </div>
            </div>
            </CollapsibleSection>

            <CollapsibleSection label="What is the 4% Rule?">
            <div className="border border-muted bg-muted/30 p-6 md:p-8">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">What is the 4% Rule?</p>
                <p className="text-sm leading-relaxed">
                    <strong className="text-foreground">The 4% rule</strong> states that you can safely withdraw 4% of your
                    portfolio each year in retirement without running out of money. Your FI Number is calculated as 25 times
                    your annual expenses (because 1/25 = 4%).
                </p>
            </div>
            </CollapsibleSection>
        </div>
        </CalculatorWrapper>
    );
}

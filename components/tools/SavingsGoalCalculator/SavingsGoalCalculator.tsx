"use client";

import { useState, useEffect } from "react";

export default function SavingsGoalCalculator() {
    const [goalAmount, setGoalAmount] = useState(10000);
    const [initialSavings, setInitialSavings] = useState(500);
    const [monthlyContribution, setMonthlyContribution] = useState(200);
    const [annualInterestRate, setAnnualInterestRate] = useState(5);
    const [monthsToGoal, setMonthsToGoal] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);

    useEffect(() => {
        calculateGoal();
    }, [goalAmount, initialSavings, monthlyContribution, annualInterestRate]);

    const calculateGoal = () => {
        const monthlyRate = annualInterestRate / 100 / 12;
        let balance = initialSavings;
        let months = 0;

        while (balance < goalAmount && months < 600) { // max 50 years
            balance = balance * (1 + monthlyRate) + monthlyContribution;
            months++;
        }

        setMonthsToGoal(months);
        setFinalAmount(balance);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const years = Math.floor(monthsToGoal / 12);
    const remainingMonths = monthsToGoal % 12;

    return (
        <div className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
                {/* Input Section */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="flex items-center justify-between text-sm font-medium">
                            <span>Savings Goal</span>
                            <span className="text-primary font-bold">{formatCurrency(goalAmount)}</span>
                        </label>
                        <input
                            type="range"
                            min="1000"
                            max="100000"
                            step="1000"
                            value={goalAmount}
                            onChange={(e) => setGoalAmount(Number(e.target.value))}
                            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center justify-between text-sm font-medium">
                            <span>Starting Amount</span>
                            <span className="text-primary font-bold">{formatCurrency(initialSavings)}</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            step="100"
                            value={initialSavings}
                            onChange={(e) => setInitialSavings(Number(e.target.value))}
                            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center justify-between text-sm font-medium">
                            <span>Monthly Contribution</span>
                            <span className="text-primary font-bold">{formatCurrency(monthlyContribution)}</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="2000"
                            step="50"
                            value={monthlyContribution}
                            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center justify-between text-sm font-medium">
                            <span>Annual Interest Rate</span>
                            <span className="text-primary font-bold">{annualInterestRate}%</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="15"
                            step="0.5"
                            value={annualInterestRate}
                            onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
                            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                </div>

                {/* Results Section */}
                <div className="flex flex-col justify-center space-y-6">
                    <div className="border border-foreground bg-muted/20 p-8 text-center">
                        <p className="font-serif text-sm text-muted-foreground mb-2 italic">Time to reach your goal</p>
                        <p className="font-serif text-5xl font-bold text-foreground tracking-tight">
                            {years > 0 && `${years}y `}
                            {remainingMonths}m
                        </p>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mt-4 border-t border-border pt-4">
                            Target date: {new Date(new Date().setMonth(new Date().getMonth() + monthsToGoal)).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                    </div>

                    <div className="space-y-5 border-t border-b border-border py-6">
                        <div className="flex justify-between items-baseline">
                            <span className="text-sm font-medium text-muted-foreground">Total Contributions</span>
                            <span className="font-serif text-lg font-bold">
                                {formatCurrency(initialSavings + (monthlyContribution * monthsToGoal))}
                            </span>
                        </div>
                        <div className="flex justify-between items-baseline">
                            <span className="text-sm font-medium text-muted-foreground">Interest Earned</span>
                            <span className="font-serif text-lg font-bold text-foreground/70">
                                {formatCurrency(finalAmount - initialSavings - (monthlyContribution * monthsToGoal))}
                            </span>
                        </div>
                        <div className="flex justify-between items-baseline pt-4 border-t border-dashed border-border">
                            <span className="font-bold text-lg">Final Amount</span>
                            <span className="font-serif text-2xl font-bold text-foreground">{formatCurrency(finalAmount)}</span>
                        </div>
                    </div>

                    <div className="bg-muted p-4">
                        <p className="text-xs text-muted-foreground text-center leading-relaxed">
                            <strong className="font-bold text-foreground uppercase tracking-wider">Pro Tip:</strong> Compound interest is the eighth wonder of the world. He who understands it, earns it... he who doesn't... pays it.
                        </p>
                    </div>
                </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex justify-between items-end">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Progress</span>
                    <span className="font-serif text-xl font-bold text-foreground">
                        {((finalAmount / goalAmount) * 100).toFixed(0)}%
                    </span>
                </div>
                <div className="h-4 w-full bg-muted overflow-hidden border border-border">
                    <div
                        className="h-full bg-foreground transition-all duration-700 ease-out"
                        style={{ width: `${Math.min((finalAmount / goalAmount) * 100, 100)}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

interface Debt {
    id: string;
    name: string;
    balance: number;
    interestRate: number;
}

type PayoffMethod = "avalanche" | "snowball";

export default function DebtPayoffCalculator() {
    const [debts, setDebts] = useState<Debt[]>([
        { id: "1", name: "Credit Card 1", balance: 5000, interestRate: 18 },
        { id: "2", name: "Credit Card 2", balance: 3000, interestRate: 22 },
        { id: "3", name: "Student Loan", balance: 15000, interestRate: 6 },
    ]);
    const [monthlyPayment, setMonthlyPayment] = useState(800);

    const addDebt = () => {
        const newDebt: Debt = {
            id: Date.now().toString(),
            name: `Debt ${debts.length + 1}`,
            balance: 1000,
            interestRate: 10,
        };
        setDebts([...debts, newDebt]);
    };

    const removeDebt = (id: string) => {
        if (debts.length > 1) {
            setDebts(debts.filter((d) => d.id !== id));
        }
    };

    const updateDebt = (id: string, field: keyof Debt, value: string | number) => {
        setDebts(debts.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
    };

    const calculatePayoff = (method: PayoffMethod) => {
        const sortedDebts = [...debts].sort((a, b) => {
            if (method === "avalanche") {
                return b.interestRate - a.interestRate; // Highest interest first
            } else {
                return a.balance - b.balance; // Smallest balance first
            }
        });

        let remainingDebts = sortedDebts.map((d) => ({ ...d }));
        let totalInterestPaid = 0;
        let month = 0;
        const timeline: { month: number; totalDebt: number }[] = [];

        while (remainingDebts.length > 0 && month < 600) {
            month++;
            let paymentLeft = monthlyPayment;

            // Pay minimum on all debts first (1% of balance or $25, whichever is higher)
            remainingDebts = remainingDebts.map((debt) => {
                const monthlyInterest = (debt.balance * debt.interestRate) / 100 / 12;
                const minimumPayment = Math.max(debt.balance * 0.01, 25);
                const actualPayment = Math.min(minimumPayment, paymentLeft, debt.balance + monthlyInterest);

                paymentLeft -= actualPayment;
                totalInterestPaid += monthlyInterest;

                const newBalance = debt.balance + monthlyInterest - actualPayment;
                return { ...debt, balance: Math.max(0, newBalance) };
            });

            // Apply extra payment to first debt (priority debt)
            if (remainingDebts.length > 0 && paymentLeft > 0) {
                const extraPayment = Math.min(paymentLeft, remainingDebts[0].balance);
                remainingDebts[0].balance -= extraPayment;
            }

            // Remove paid-off debts
            remainingDebts = remainingDebts.filter((d) => d.balance > 0.01);

            // Record timeline
            const totalDebt = remainingDebts.reduce((sum, d) => sum + d.balance, 0);
            timeline.push({ month, totalDebt: Math.round(totalDebt) });
        }

        return {
            months: month,
            totalInterestPaid: Math.round(totalInterestPaid),
            timeline,
        };
    };

    const avalancheResult = useMemo(() => calculatePayoff("avalanche"), [debts, monthlyPayment]);
    const snowballResult = useMemo(() => calculatePayoff("snowball"), [debts, monthlyPayment]);

    const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);
    const interestSaved = snowballResult.totalInterestPaid - avalancheResult.totalInterestPaid;

    // Combine timelines for chart
    const chartData = useMemo(() => {
        const maxLength = Math.max(avalancheResult.timeline.length, snowballResult.timeline.length);
        const data = [];
        for (let i = 0; i < Math.min(maxLength, 60); i += 3) {
            // Show every 3 months, max 5 years
            data.push({
                month: i,
                avalanche: avalancheResult.timeline[i]?.totalDebt || 0,
                snowball: snowballResult.timeline[i]?.totalDebt || 0,
            });
        }
        return data;
    }, [avalancheResult, snowballResult]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatMonths = (months: number) => {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        if (years > 0) {
            return `${years}y ${remainingMonths}m`;
        }
        return `${months}m`;
    };

    return (
        <div className="space-y-8">
            {/* Debt Input Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-widest">Your Debts</h3>
                    <button
                        onClick={addDebt}
                        className="text-xs uppercase tracking-widest border border-foreground bg-foreground text-background px-4 py-2 hover:bg-background hover:text-foreground transition-colors"
                    >
                        + Add Debt
                    </button>
                </div>

                {debts.map((debt, index) => (
                    <div key={debt.id} className="border border-border bg-card p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-1">
                            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Name</label>
                            <input
                                type="text"
                                value={debt.name}
                                onChange={(e) => updateDebt(debt.id, "name", e.target.value)}
                                className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-foreground"
                            />
                        </div>
                        <div>
                            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                                Balance: {formatCurrency(debt.balance)}
                            </label>
                            <input
                                type="range"
                                min="100"
                                max="50000"
                                step="100"
                                value={debt.balance}
                                onChange={(e) => updateDebt(debt.id, "balance", Number(e.target.value))}
                                className="w-full h-2 bg-muted rounded-none appearance-none cursor-pointer accent-primary"
                            />
                        </div>
                        <div>
                            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                                Interest: {debt.interestRate}%
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="30"
                                step="0.5"
                                value={debt.interestRate}
                                onChange={(e) => updateDebt(debt.id, "interestRate", Number(e.target.value))}
                                className="w-full h-2 bg-muted rounded-none appearance-none cursor-pointer accent-primary"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={() => removeDebt(debt.id)}
                                disabled={debts.length === 1}
                                className="text-xs uppercase tracking-widest border border-border px-4 py-2 hover:border-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed w-full"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Monthly Payment Slider */}
            <div className="border border-foreground bg-muted/20 p-6">
                <label className="flex items-center justify-between text-sm font-medium mb-4">
                    <span className="uppercase tracking-widest">Total Monthly Payment</span>
                    <span className="text-2xl font-serif font-bold text-primary">{formatCurrency(monthlyPayment)}</span>
                </label>
                <input
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={monthlyPayment}
                    onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                    className="w-full h-3 bg-muted rounded-none appearance-none cursor-pointer accent-primary"
                />
            </div>

            {/* Comparison Results */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Avalanche Method */}
                <div className="border-2 border-foreground bg-card p-8">
                    <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold uppercase tracking-wider">Avalanche Method</h3>
                        <span className="text-xs bg-foreground text-background px-2 py-1 uppercase tracking-wider">Fastest</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                        Pay highest interest rate first. Mathematically optimal.
                    </p>
                    <div className="space-y-4">
                        <div className="border-t border-border pt-4">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Time to Freedom</p>
                            <p className="font-serif text-4xl font-bold">{formatMonths(avalancheResult.months)}</p>
                        </div>
                        <div className="border-t border-border pt-4">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Total Interest Paid</p>
                            <p className="font-serif text-2xl font-bold text-foreground/70">
                                {formatCurrency(avalancheResult.totalInterestPaid)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Snowball Method */}
                <div className="border border-border bg-card p-8">
                    <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold uppercase tracking-wider">Snowball Method</h3>
                        <span className="text-xs border border-border px-2 py-1 uppercase tracking-wider">Quick Wins</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                        Pay smallest balance first. Psychologically motivating.
                    </p>
                    <div className="space-y-4">
                        <div className="border-t border-border pt-4">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Time to Freedom</p>
                            <p className="font-serif text-4xl font-bold">{formatMonths(snowballResult.months)}</p>
                        </div>
                        <div className="border-t border-border pt-4">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Total Interest Paid</p>
                            <p className="font-serif text-2xl font-bold text-foreground/70">
                                {formatCurrency(snowballResult.totalInterestPaid)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Savings Highlight */}
            {interestSaved > 0 && (
                <div className="border border-foreground bg-foreground/5 p-6 text-center">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Potential Savings (Avalanche)</p>
                    <p className="font-serif text-3xl font-bold text-foreground">{formatCurrency(interestSaved)}</p>
                    <p className="text-xs text-muted-foreground mt-2">in interest saved vs. Snowball method</p>
                </div>
            )}

            {/* Chart */}
            <div className="border border-border bg-card p-8">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Debt Reduction Timeline</h3>
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="month"
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            label={{ value: "Months", position: "insideBottom", offset: -5, fontSize: 12 }}
                        />
                        <YAxis
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                            formatter={(value: any) => formatCurrency(value)}
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                fontSize: "12px",
                            }}
                        />
                        <Legend
                            wrapperStyle={{ paddingTop: "20px" }}
                            formatter={(value) => <span className="text-xs uppercase tracking-wider">{value}</span>}
                        />
                        <Bar dataKey="avalanche" fill="hsl(var(--foreground))" name="Avalanche" />
                        <Bar dataKey="snowball" fill="hsl(var(--muted-foreground))" name="Snowball" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Educational Insight */}
            <div className="border border-muted bg-muted/30 p-8">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Which Method to Choose?</p>
                <p className="text-sm leading-relaxed">
                    <strong className="text-foreground">Avalanche saves more money</strong> but requires discipline. <strong className="text-foreground">Snowball builds momentum</strong> with quick wins. The best method is the one you'll stick with.
                    Both beat making minimum payments forever.
                </p>
            </div>
        </div>
    );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Financial Tools — Free Interactive Calculators",
    description:
        "Master your money with our free interactive calculators. Plan savings goals, simulate wealth growth, strategize debt payoff, and calculate your financial independence number.",
};

export default function ToolsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

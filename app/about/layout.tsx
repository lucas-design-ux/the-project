import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About — Our Mission & Editorial Process",
    description:
        "Learn about WealthLogik's mission to decode modern finance. Meet our editorial team, explore our rigorous fact-checking process, and understand our commitment to editorial independence.",
    openGraph: {
        title: "About WealthLogik — Decoding Finance for the New Generation",
        description:
            "Meet the Logik Editorial Team and learn about our data-driven, multi-step editorial process that ensures every guide is accurate, objective, and actionable.",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

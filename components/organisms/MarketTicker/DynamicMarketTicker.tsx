"use client";

import dynamic from "next/dynamic";
import { TickerItem } from "@/types/market";

const MarketTicker = dynamic(() => import("./MarketTicker"), {
    ssr: false,
    loading: () => (
        <div className="ticker-bar ticker-track" />
    ),
});

interface DynamicMarketTickerProps {
    data: TickerItem[];
}

export default function DynamicMarketTicker({
    data,
}: DynamicMarketTickerProps) {
    return <MarketTicker data={data} />;
}

"use client";

import dynamic from "next/dynamic";

const MarketTicker = dynamic(() => import("./MarketTicker"), {
    ssr: false,
    loading: () => (
        <div className="ticker-bar ticker-track" />
    ),
});

export default function DynamicMarketTicker() {
    return <MarketTicker />;
}

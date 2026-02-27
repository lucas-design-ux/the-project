"use client";

import "./MarketTicker.css";
import { TickerItem } from "@/types/market";

interface MarketTickerProps {
    data: TickerItem[];
}

function TickerItemDisplay({ item }: { item: TickerItem }) {
    const isPositive = item.changePercent > 0;
    const isNegative = item.changePercent < 0;

    const changeClass = isPositive
        ? "ticker-change-positive"
        : isNegative
            ? "ticker-change-negative"
            : "ticker-change-neutral";

    const arrow = isPositive ? "▲" : isNegative ? "▼" : "";
    const sign = isPositive ? "+" : "";

    return (
        <span className="ticker-item">
            <span className="ticker-item-symbol">
                {item.symbol}
            </span>
            <span className="ticker-item-price">{item.price}</span>
            <span className={changeClass}>
                {arrow}{sign}{item.changePercent.toFixed(2)}%
            </span>
        </span>
    );
}

export default function MarketTicker({ data }: MarketTickerProps) {
    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div
            className="ticker-bar"
            role="marquee"
            aria-label="Currency exchange rates ticker"
        >
            <div className="ticker-marquee ticker-track">
                {/* First copy */}
                <div className="ticker-copy">
                    {data.map((item, i) => (
                        <TickerItemDisplay key={`a-${i}`} item={item} />
                    ))}
                </div>
                {/* Duplicate for seamless loop */}
                <div className="ticker-copy" aria-hidden="true">
                    {data.map((item, i) => (
                        <TickerItemDisplay key={`b-${i}`} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

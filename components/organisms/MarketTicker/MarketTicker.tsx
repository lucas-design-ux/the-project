"use client";

import { useState, useEffect } from "react";
import "./MarketTicker.css";
import { TickerItem } from "@/types/market";

/**
 * Fallback data rendered during SSR / initial load.
 * Replaced with live rates after client-side fetch.
 */
const FALLBACK_DATA: TickerItem[] = [
    { symbol: "EUR/USD", price: "$ 1.0821", changePercent: -0.11 },
    { symbol: "GBP/USD", price: "$ 1.2634", changePercent: 0.08 },
    { symbol: "JPY/USD", price: "$ 0.0066", changePercent: -0.42 },
    { symbol: "CHF/USD", price: "$ 1.1302", changePercent: 0.21 },
    { symbol: "CNY/USD", price: "$ 0.1381", changePercent: -0.05 },
    { symbol: "AUD/USD", price: "$ 0.6341", changePercent: 0.58 },
    { symbol: "CAD/USD", price: "$ 0.7312", changePercent: -0.18 },
    { symbol: "BRL/USD", price: "$ 0.1909", changePercent: -0.20 },
    { symbol: "MXN/USD", price: "$ 0.0497", changePercent: 0.33 },
    { symbol: "KRW/USD", price: "$ 0.0007", changePercent: -0.15 },
];

const CURRENCIES: Record<string, string> = {
    EUR: "EUR/USD",
    GBP: "GBP/USD",
    JPY: "JPY/USD",
    CHF: "CHF/USD",
    CNY: "CNY/USD",
    AUD: "AUD/USD",
    CAD: "CAD/USD",
    BRL: "BRL/USD",
    MXN: "MXN/USD",
    KRW: "KRW/USD",
};

function formatUSD(value: number): string {
    const decimals = value < 0.01 ? 6 : value < 1 ? 4 : 4;
    return `$\u00A0${value.toFixed(decimals)}`;
}

function getPreviousBusinessDate(daysBack: number): string {
    const date = new Date();
    let businessDaysSkipped = 0;
    while (businessDaysSkipped < daysBack) {
        date.setDate(date.getDate() - 1);
        const day = date.getDay();
        if (day !== 0 && day !== 6) {
            businessDaysSkipped++;
        }
    }
    return date.toISOString().split("T")[0];
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

/**
 * MarketTicker — Client-side currency ticker.
 *
 * Renders immediately with fallback data (no server fetch at build time),
 * then fetches live rates from frankfurter.app on mount.
 * This eliminates ALL server-side API calls from the layout during build.
 */
export default function MarketTicker() {
    const [data, setData] = useState<TickerItem[]>(FALLBACK_DATA);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchRates() {
            try {
                const currencyCodes = Object.keys(CURRENCIES).join(",");

                const [todayRes, previousRes] = await Promise.all([
                    fetch(
                        `https://api.frankfurter.app/latest?from=USD&to=${currencyCodes}`,
                        { signal: controller.signal },
                    ),
                    fetch(
                        `https://api.frankfurter.app/${getPreviousBusinessDate(3)}?from=USD&to=${currencyCodes}`,
                        { signal: controller.signal },
                    ),
                ]);

                if (!todayRes.ok || !previousRes.ok) return;

                const todayData = await todayRes.json();
                const previousData = await previousRes.json();

                const items: TickerItem[] = [];
                for (const [code, label] of Object.entries(CURRENCIES)) {
                    const todayRate = todayData.rates?.[code];
                    const previousRate = previousData.rates?.[code];
                    if (todayRate && previousRate) {
                        const priceInUSD = 1 / todayRate;
                        const previousPriceInUSD = 1 / previousRate;
                        const changePercent =
                            ((priceInUSD - previousPriceInUSD) / previousPriceInUSD) * 100;
                        items.push({
                            symbol: label,
                            price: formatUSD(priceInUSD),
                            changePercent: parseFloat(changePercent.toFixed(2)),
                        });
                    }
                }

                if (items.length > 0) {
                    setData(items);
                }
            } catch {
                // Aborted or network error — keep fallback data
            }
        }

        fetchRates();

        return () => controller.abort();
    }, []);

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

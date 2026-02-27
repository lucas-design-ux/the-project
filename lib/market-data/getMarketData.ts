import { TickerItem } from "@/types/market";

/**
 * Currencies to display in the ticker (against USD).
 * Maps the API code to the display label.
 */
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

/**
 * Fallback data used when the API is unavailable during build.
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

/**
 * Formats a number as a USD price string.
 */
function formatUSD(value: number): string {
    // For very small values (like JPY, KRW), show 4 decimal places
    const decimals = value < 0.01 ? 6 : value < 1 ? 4 : 4;
    return `$\u00A0${value.toFixed(decimals)}`;
}

/**
 * Fetches REAL currency exchange rates at build time (server-only).
 *
 * Uses frankfurter.app — a free, open-source API powered by the ECB.
 * No API key required. Rates are updated daily by the European Central Bank.
 *
 * Architecture: "Fetch Once, Serve Millions"
 * - Called during Next.js build / ISR revalidation (every 6h)
 * - Never runs in the browser
 * - Falls back to hardcoded data if the API is unavailable
 */
export async function getMarketData(): Promise<TickerItem[]> {
    try {
        const currencyCodes = Object.keys(CURRENCIES).join(",");

        // Fetch today's rates with USD as base.
        // frankfurter.app returns: { base: "USD", rates: { EUR: 0.92, GBP: 0.79, ... } }
        // These are already X/USD values — no inversion needed.
        const [todayRes, previousRes] = await Promise.all([
            fetch(
                `https://api.frankfurter.app/latest?from=USD&to=${currencyCodes}`,
                { next: { revalidate: 21600 } }, // ISR: 6 hours
            ),
            fetch(
                `https://api.frankfurter.app/${getPreviousBusinessDate(3)}?from=USD&to=${currencyCodes}`,
                { next: { revalidate: 21600 } },
            ),
        ]);

        if (!todayRes.ok || !previousRes.ok) {
            console.error("[MarketTicker] API returned non-OK status");
            return FALLBACK_DATA;
        }

        const todayData = await todayRes.json();
        const previousData = await previousRes.json();

        const items: TickerItem[] = [];

        for (const [code, label] of Object.entries(CURRENCIES)) {
            const todayRate = todayData.rates?.[code];
            const previousRate = previousData.rates?.[code];

            if (todayRate && previousRate) {
                // Rate is directly X/USD (how much 1 USD buys of X — no, wait:
                // from=USD means: 1 USD = todayRate units of `code`
                // So the price of 1 unit of `code` IN USD = 1 / todayRate
                const priceInUSD = 1 / todayRate;
                const previousPriceInUSD = 1 / previousRate;
                const changePercent =
                    ((priceInUSD - previousPriceInUSD) / previousPriceInUSD) *
                    100;

                items.push({
                    symbol: label,
                    price: formatUSD(priceInUSD),
                    changePercent: parseFloat(changePercent.toFixed(2)),
                });
            }
        }

        if (items.length === 0) {
            return FALLBACK_DATA;
        }

        console.log(
            `[MarketTicker] Fetched ${items.length} real currency rates`,
        );
        return items;
    } catch (error) {
        console.error(
            "[MarketTicker] Failed to fetch market data, using fallback:",
            error,
        );
        return FALLBACK_DATA;
    }
}

/**
 * Returns a business-day date N days back, in YYYY-MM-DD format.
 * Skips weekends (ECB doesn't publish rates on weekends).
 */
function getPreviousBusinessDate(daysBack: number): string {
    const date = new Date();
    let businessDaysSkipped = 0;

    while (businessDaysSkipped < daysBack) {
        date.setDate(date.getDate() - 1);
        const day = date.getDay();
        // Skip Saturday (6) and Sunday (0)
        if (day !== 0 && day !== 6) {
            businessDaysSkipped++;
        }
    }

    return date.toISOString().split("T")[0];
}

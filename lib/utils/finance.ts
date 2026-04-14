/**
 * Shared financial utilities used across all calculator tools.
 */

/**
 * Format a number as USD currency without cents.
 * @example formatCurrency(280657) → "$280,657"
 */
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

/**
 * Format months as "Xy Zm" string.
 * @example formatMonths(44) → "3y 8m"
 */
export function formatMonths(months: number): string {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years > 0) return `${years}y ${remainingMonths}m`;
    return `${months}m`;
}

/**
 * Calculate compound growth over time.
 * @returns Array of data points with year, balance, contributed, interest.
 */
export function compoundGrowth(
    principal: number,
    monthlyContribution: number,
    annualRate: number,
    years: number
) {
    const monthlyRate = annualRate / 100 / 12;
    const data = [];
    let balance = principal;
    let totalContributed = principal;

    for (let year = 0; year <= years; year++) {
        if (year > 0) {
            for (let m = 0; m < 12; m++) {
                balance = balance * (1 + monthlyRate) + monthlyContribution;
            }
            totalContributed += monthlyContribution * 12;
        }

        data.push({
            year,
            balance: Math.round(balance),
            contributed: Math.round(totalContributed),
            interest: Math.round(balance - totalContributed),
        });
    }

    return data;
}

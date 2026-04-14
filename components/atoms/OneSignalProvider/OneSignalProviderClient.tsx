"use client";

import dynamic from "next/dynamic";

const OneSignalProviderLazy = dynamic(
    () => import("@/components/atoms/OneSignalProvider/OneSignalProvider"),
    { ssr: false }
);

/**
 * Client-side wrapper that lazy-loads the OneSignal provider.
 * Needed because `ssr: false` requires a `"use client"` boundary.
 */
export default function OneSignalProviderClient() {
    return <OneSignalProviderLazy />;
}

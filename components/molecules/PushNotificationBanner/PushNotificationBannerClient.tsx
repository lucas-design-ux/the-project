"use client";

import dynamic from "next/dynamic";

const PushNotificationBannerLazy = dynamic(
    () => import("@/components/molecules/PushNotificationBanner/PushNotificationBanner"),
    { ssr: false }
);

/**
 * Client-side wrapper that lazy-loads the PushNotificationBanner.
 * Needed because `ssr: false` requires a `"use client"` boundary.
 */
export default function PushNotificationBannerClient() {
    return <PushNotificationBannerLazy />;
}

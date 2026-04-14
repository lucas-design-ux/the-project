"use client";

import Script from "next/script";

/**
 * Initialises the OneSignal Web Push SDK.
 *
 * Drop this component once inside the root layout (or article layout).
 * It is a no-op when `NEXT_PUBLIC_ONESIGNAL_APP_ID` is not set,
 * so it's safe to commit and deploy before you have an account.
 */
export default function OneSignalProvider() {
    const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;

    if (!appId) return null;

    return (
        <>
            <Script
                src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
                strategy="lazyOnload"
            />
            <Script
                id="onesignal-init"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.OneSignalDeferred = window.OneSignalDeferred || [];
                        OneSignalDeferred.push(async function(OneSignal) {
                            await OneSignal.init({
                                appId: "${appId}",
                                notifyButton: { enable: false },
                                allowLocalhostAsSecureOrigin: true,
                            });
                        });
                    `,
                }}
            />
        </>
    );
}

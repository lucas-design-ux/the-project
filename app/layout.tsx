import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import "./responsive.css";
import Header from "@/components/organisms/Header/Header";
import Footer from "@/components/organisms/Footer/Footer";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import MarketTicker from "@/components/organisms/MarketTicker/MarketTicker";
import { getMarketData } from "@/lib/market-data/getMarketData";
import OneSignalProviderClient from "@/components/atoms/OneSignalProvider/OneSignalProviderClient";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Wealth Logik — Personal Finance for the Modern Generation",
    template: "%s | Wealth Logik",
  },
  description:
    "Real talk about money that actually helps. Interactive tools, expert insights, and actionable strategies for budgeting, investing, and building wealth.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Wealth Logik",
    title: "Wealth Logik — Personal Finance for the Modern Generation",
    description:
      "Real talk about money that actually helps. Interactive tools, expert insights, and actionable strategies for budgeting, investing, and building wealth.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wealth Logik — Personal Finance for the Modern Generation",
    description:
      "Real talk about money that actually helps. Interactive tools, expert insights, and actionable strategies.",
  },
  icons: [
    { rel: "icon", url: "/icon.svg", type: "image/svg+xml" }
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const marketData = await getMarketData();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(s===null&&d)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "WealthLogik",
                  "url": "https://wealthlogik.com",
                  "logo": "https://api.wealthlogik.com/uploads/Logo_Icon_011c57d67c.svg",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "contact@wealthlogik.com",
                    "contactType": "editorial"
                  },
                  "sameAs": [
                    "https://www.linkedin.com/company/wealthlogik/",
                    "https://x.com/wealthlogik"
                  ]
                },
                {
                  "@type": "WebSite",
                  "name": "WealthLogik",
                  "url": "https://wealthlogik.com",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://wealthlogik.com/search?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${dmSerif.variable} antialiased font-sans min-h-screen flex flex-col overflow-x-hidden`}>
        <OneSignalProviderClient />
        <MarketTicker data={marketData} />
        <div className="max-w-screen-2xl mx-auto w-full bg-background">
          <ThemeProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}

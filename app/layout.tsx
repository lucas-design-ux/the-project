import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import "./responsive.css";
import Header from "@/components/organisms/Header/Header";
import Footer from "@/components/organisms/Footer/Footer";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import MarketTicker from "@/components/organisms/MarketTicker/MarketTicker";
import { getMarketData } from "@/lib/market-data/getMarketData";

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
  title: "Master Template - The Blog Ecosystem",
  description: "Foundation for the Master Template blog ecosystem.",
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
      </head>
      <body className={`${inter.variable} ${dmSerif.variable} antialiased font-sans min-h-screen flex flex-col overflow-x-hidden`}>
        <MarketTicker data={marketData} />
        <div className="max-w-screen-2xl mx-auto w-full bg-background shadow-2xl">
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

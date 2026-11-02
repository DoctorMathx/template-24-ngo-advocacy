import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { QuickExit } from "@/components/layout/quick-exit";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { siteConfig } from "@/lib/site-config";
import { siteUrl } from "@/lib/site-url";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "wdth"],
});
const dmSans = DM_Sans({ variable: "--font-dmsans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    template: `%s · ${siteConfig.brand.name}`,
  },
  description: siteConfig.brand.description,
  keywords: [
    "women's rights Nigeria",
    "gender-based violence",
    "GBV helpline Nigeria",
    "legal aid for survivors",
    "VAPP Act petition",
    "women in politics Nigeria",
    "donate Nigeria NGO",
    "FinStore NGO template",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.brand.name,
    title: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    description: siteConfig.brand.description,
    url: siteUrl,
    locale: "en_NG",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#3D0C3A" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG">
      <body className={`${bricolage.variable} ${dmSans.variable} antialiased`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded-full focus:bg-tangerine focus:px-5 focus:py-3 focus:font-bold">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileActionBar />
        <QuickExit />
      </body>
    </html>
  );
}

import "./globals.css";

import { Analytics } from "@vercel/analytics/next";

import { SpeedInsights } from "@vercel/speed-insights/next";

import ScrollToTop from "@/components/providers/ScrollToTop";

import SmoothScroll from "@/components/providers/SmoothScroll";

import PageTransition from "@/components/providers/PageTransition";

import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  metadataBase: new URL(
    siteConfig.url
  ),
  applicationName: siteConfig.name,

  title: {
    default:
      `${siteConfig.name} | Cinematic Portfolio`,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,
  keywords: [
    "Himanshu Chaudhari",
    "cinematic portfolio",
    "visual artist",
    "art director",
    "videographer",
    "audio engineer",
    "music production",
    "creative direction",
  ],
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:
      `${siteConfig.name} | Cinematic Portfolio`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt:
          `${siteConfig.name} cinematic portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      `${siteConfig.name} | Cinematic Portfolio`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  category: "portfolio",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <ScrollToTop />

          <PageTransition>
            {children}
          </PageTransition>

          <Analytics />
          <SpeedInsights />
        </SmoothScroll>
      </body>
    </html>
  );
}

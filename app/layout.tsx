import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteName, siteUrl } from "./site";

const figtree = localFont({ src: "../public/fonts/Figtree-VariableFont_wght.ttf", variable: "--font-figtree", weight: "300 900", display: "swap" });

const title = "Blog Preview Card | Royer Adames";
const description = "A responsive Frontend Mentor blog preview card with an accessible link to MDN's HTML and CSS learning material.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName, title, description },
  twitter: { card: "summary_large_image" },
};

const websiteJsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: siteName, url: siteUrl };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={figtree.variable}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const figtree = localFont({ src: "../public/fonts/Figtree-VariableFont_wght.ttf", variable: "--font-figtree", weight: "300 900", display: "swap" });
export const metadata: Metadata = {
  title: "Blog Preview Card | Royer Adames",
  description: "A responsive Frontend Mentor blog preview card with an accessible link to MDN's HTML and CSS learning material.",
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={figtree.variable}>{children}</body></html>;
}

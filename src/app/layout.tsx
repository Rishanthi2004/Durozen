import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Durozen | Enterprise Software & IT Services",
  description:
    "Durozen Technologies Pvt. Ltd. is Your Trusted Digital Transformation Partner. We engineer bespoke custom software, scalable cloud systems, and intelligent AI automation.",
  keywords: [
    "Durozen Technologies Pvt. Ltd.",
    "Your Trusted Digital Transformation Partner",
    "Custom Software Development",
    "Enterprise Applications",
    "Cloud Engineering",
    "DevOps Services",
    "AI and Machine Learning Solutions",
    "Namakkal Tamil Nadu",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${cormorant.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF9F6] text-[#121316] antialiased selection:bg-[#24419E] selection:text-white">
        {children}
      </body>
    </html>
  );
}

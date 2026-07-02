import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://urbanvogue.store"),
  title: {
    default: "Urban Vogue — Wear Your Legacy",
    template: "%s — Urban Vogue",
  },
  description:
    "Urban Vogue is a luxury fashion house for those who dress with intention. Considered pieces, built to outlast trend.",
  openGraph: {
    title: "Urban Vogue — Wear Your Legacy",
    description:
      "Considered luxury fashion. Explore the current collection at Urban Vogue.",
    images: ["/images/uv-logo.jpeg"],
    siteName: "Urban Vogue",
  },
  icons: {
    icon: "/images/uv-logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}

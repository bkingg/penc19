import type { Metadata } from "next";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/globals.css";
import "@/styles/custom.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { defaultLanguage } from "@/lib/i18n";
import { Playfair_Display, Space_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: {
    template: "%s | Penc 19",
    default: "Penc 19",
  },
  description:
    "Penc 19 est une gallerie d'art située à l'Île de Ngor au Sénégal.",
};

const playfair_display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-playfair-display",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;

  return (
    <html
      className={playfair_display.variable}
      lang={language || defaultLanguage}
    >
      <body className={`${mono.className}`}>{children}</body>
    </html>
  );
}

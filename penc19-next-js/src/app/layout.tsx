import type { Metadata } from "next";
import { Playfair_Display, Space_Mono } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/globals.css";
import "@/styles/custom.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import BackToTop from "@/components/BackToTop";
import { Suspense } from "react";

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

export const metadata: Metadata = {
  title: {
    template: "%s | Penc 19",
    default: "Penc 19",
  },
  description:
    "Penc 19 est une gallerie d'art située à l'Île de Ngor au Sénégal.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={playfair_display.variable}>
      <body className={`${mono.className}`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Suspense>
          <AnimateOnScroll />
        </Suspense>
        <BackToTop />
      </body>
    </html>
  );
}

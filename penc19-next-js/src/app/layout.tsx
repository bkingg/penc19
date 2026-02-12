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
import { isValidLanguage } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/context/LanguageContext";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";

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
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ language: string }>;
}>) {
  const { language } = await params;

  console.log("Language in RootLayout:", language);

  if (!isValidLanguage(language)) {
    notFound();
  }

  const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
      // Header
      logo,
      // Footer
      footerBgImage,
      footerLogo,
      footerDescription,
      footerMenu->{
        items[]{
          _key,
          title,
          linkType,
          internalLink->{
            _type,
            slug
          },
          externalUrl
        }
      },
      facebook,
      twitter,
      instagram,
      linkedin,
  
      contactPageTitle,
      contactPageImage,
      showMap,
      contactPageSubTitle,
      contactPageDescription,
      phone,
      address,
      email,
    }`;

  const siteSettings = await sanityFetch<SanityDocument>({
    query: SITE_SETTINGS_QUERY,
  });
  console.log("footer menu", siteSettings.footerMenu);

  return (
    <html lang={language} className={playfair_display.variable}>
      <body className={`${mono.className}`}>
        <LanguageProvider language={language}>
          <SiteSettingsProvider siteSettings={siteSettings}>
            <Header language={language} />
            <main>{children}</main>
            <Footer language={language} />
            <Suspense>
              <AnimateOnScroll />
            </Suspense>
            <BackToTop />
          </SiteSettingsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

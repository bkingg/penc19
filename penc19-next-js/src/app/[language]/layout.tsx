import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import BackToTop from "@/components/BackToTop";
import { Suspense } from "react";
import { isValidLanguage } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ language: string }>;
}>) {
  const { language } = await params;

  if (!isValidLanguage(language)) notFound();

  return (
    <>
      <Header language={language} />
      <main>{children}</main>
      <Footer language={language} />
      <Suspense>
        <AnimateOnScroll />
      </Suspense>
      <BackToTop />
    </>
  );
}

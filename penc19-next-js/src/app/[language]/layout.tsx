import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import BackToTop from "@/components/BackToTop";
import { Suspense } from "react";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ language: string }>;
}>) {
  const { language } = await params;
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

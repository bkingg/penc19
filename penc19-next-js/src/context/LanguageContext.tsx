"use client";

import { createContext, useContext } from "react";

const LanguageContext = createContext<string>("fr");

export function LanguageProvider({
  language,
  children,
}: {
  language: string;
  children: React.ReactNode;
}) {
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

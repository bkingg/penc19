"use client";

import { createContext } from "react";

const SiteSettingsContext = createContext<object>({});

export function SiteSettingsProvider({
  siteSettings,
  children,
}: {
  siteSettings: object;
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={siteSettings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { languages } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const pathname = usePathname();

  if (!pathname) {
    return null;
  }

  const segments = pathname.split("/");
  const currentLang = segments[1];

  const pathWithoutLang = "/" + segments.slice(2).join("/");

  return (
    <div className="language-switcher">
      {languages.map(
        (lang) =>
          lang !== currentLang && (
            <Link
              className="nav-link"
              key={lang}
              href={`/${lang}${pathWithoutLang}`}
            >
              {lang.toUpperCase()}
            </Link>
          ),
      )}
    </div>
  );
}

"use client";

import { useLanguage } from "@/lib/i18n";

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "hi" : "en")}
      className="px-2 py-1 text-xs font-semibold rounded-md border border-[var(--india-green)] text-[var(--india-green)] hover:bg-[var(--india-green)] hover:text-white transition-colors"
      aria-label="Toggle language"
    >
      {locale === "en" ? "हिंदी" : "EN"}
    </button>
  );
}

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Language = "en" | "pt";

export interface Bilingual {
  en: string;
  pt: string;
}

const STORAGE_KEY = "portfolio:lang";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  /** Resolves a bilingual copy entry to the active language's string. */
  t: (text: Bilingual) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem(STORAGE_KEY) === "pt" ? "pt" : "en";
}

/** Default is English; the visitor's choice persists in localStorage across visits. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "en" ? "pt" : "en"));
  const t = (text: Bilingual) => text[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

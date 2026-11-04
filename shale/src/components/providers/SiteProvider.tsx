"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { translations } from "@/lib/i18n";
import type { Language, Messages } from "@/lib/i18n";

type Theme = "light" | "dark";
type SiteContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  messages: Messages;
};

const SiteContext = createContext<SiteContextValue | null>(null);
function readPreference(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function savePreference(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // The current choice still applies for this page view if storage is unavailable.
  }
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ka");
  const [theme, setTheme] = useState<Theme>("light");

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    document.documentElement.lang = next;
    document.documentElement.dataset.language = next;
    savePreference("site-language", next);
    document.title = translations[next].metadata.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = translations[next].metadata.description;
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    savePreference("site-theme", next);
  }, [theme]);

  useEffect(() => {
    const savedLanguage = readPreference("site-language");
    const initialLanguage: Language = savedLanguage === "en" ? "en" : "ka";
    document.documentElement.lang = initialLanguage;
    document.documentElement.dataset.language = initialLanguage;

    const initialTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    document.title = translations[initialLanguage].metadata.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = translations[initialLanguage].metadata.description;
    const frame = window.requestAnimationFrame(() => {
      setLanguageState(initialLanguage);
      setTheme(initialTheme);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage, theme, toggleTheme, messages: translations[language] }),
    [language, setLanguage, theme, toggleTheme],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useLanguage() {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useLanguage must be used inside SiteProvider");
  return { language: context.language, setLanguage: context.setLanguage, messages: context.messages };
}

export function useTheme() {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useTheme must be used inside SiteProvider");
  return { theme: context.theme, toggleTheme: context.toggleTheme, messages: context.messages };
}

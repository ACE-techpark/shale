"use client";

import { useLanguage, useTheme } from "@/components/providers/SiteProvider";
import { Icon } from "@/components/ui/Icon";

export function LanguageSwitcher() {
  const { language, setLanguage, messages } = useLanguage();
  return (
    <div className="language-switcher" role="group" aria-label={messages.languageAria}>
      {(["ka", "en"] as const).map((option, index) => (
        <span className="language-option-wrap" key={option}>
          {index > 0 && <span aria-hidden="true" className="language-divider">|</span>}
          <button
            type="button"
            lang={option}
            aria-label={option === "ka" ? messages.languageKa : messages.languageEn}
            aria-pressed={language === option}
            className={language === option ? "is-active" : ""}
            onClick={() => setLanguage(option)}
          >
            {option.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme, messages } = useTheme();
  return (
    <button
      type="button"
      className={`theme-toggle ${theme === "dark" ? "is-dark" : ""}`}
      onClick={toggleTheme}
      aria-label={theme === "dark" ? messages.themeDarkAria : messages.themeLightAria}
      title={theme === "dark" ? messages.themeDarkAria : messages.themeLightAria}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        <Icon name={theme === "dark" ? "sun" : "moon"} />
      </span>
    </button>
  );
}

export function SiteControls({ className = "" }: { className?: string }) {
  return (
    <div className={`site-controls ${className}`.trim()}>
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  );
}

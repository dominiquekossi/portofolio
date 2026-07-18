import { useLanguage } from "../../lib/LanguageContext";

/**
 * EN / PT shown side by side, no flags or icons, matching the eyebrow
 * typographic style already used for the SF clock next to it. Each label is
 * its own button (not a single toggle) so clicking the already-active
 * language is a harmless no-op rather than an unexpected switch away.
 */
export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1.5" aria-label="Language">
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-current={lang === "en" ? "true" : undefined}
        className={`eyebrow eyebrow--no-rule transition-colors duration-300 ${
          lang === "en" ? "text-accent" : "text-ink-faint hover:text-ink-soft"
        }`}
      >
        EN
      </button>
      <span className="text-ink-faint" aria-hidden>
        /
      </span>
      <button
        type="button"
        onClick={() => setLang("pt")}
        aria-current={lang === "pt" ? "true" : undefined}
        className={`eyebrow eyebrow--no-rule transition-colors duration-300 ${
          lang === "pt" ? "text-accent" : "text-ink-faint hover:text-ink-soft"
        }`}
      >
        PT
      </button>
    </div>
  );
}

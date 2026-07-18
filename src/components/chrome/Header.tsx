import { useEffect, useState } from "react";
import { Eyebrow } from "../ui/Eyebrow";
import { RegistrationMark } from "../ui/RegistrationMark";
import { LanguageToggle } from "../ui/LanguageToggle";
import { useLanguage } from "../../lib/LanguageContext";
import { copy } from "../../content/copy";

function formatSFTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Los_Angeles",
  }).format(new Date());
}

function useSFTime() {
  const [time, setTime] = useState(formatSFTime);

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatSFTime()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

/**
 * Three nav "zones" rather than one entry per <section> — Production
 * Projects and Open Source both read as part of the work story, so they
 * keep "Work" lit instead of introducing a fourth/fifth nav item. `label`
 * is bilingual; everything else is structural and language-independent.
 */
const ZONES: { id: string; sectionIds: string[]; label: (typeof copy)["header"]["work"]; href: string }[] = [
  { id: "work", sectionIds: ["work", "production", "open-source"], label: copy.header.work, href: "#work" },
  { id: "about", sectionIds: ["about"], label: copy.header.about, href: "#about" },
];

function useActiveZone() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    if (sections.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }
        }

        const topSectionId = [...visible.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
        const zone = ZONES.find((z) => z.sectionIds.includes(topSectionId ?? ""));
        setActiveId(zone?.id ?? null);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeId;
}

export function Header() {
  const time = useSFTime();
  const activeZone = useActiveZone();
  const { t } = useLanguage();

  return (
    <header className="fixed inset-x-0 top-0 z-50 edge border-b border-line/60 bg-paper/85 py-5 backdrop-blur-md">
      <div className="wrap flex items-center justify-between gap-4">
        <a
          href="#top"
          className="shrink-0 whitespace-nowrap font-display-face text-lg text-ink"
          data-cursor={t(copy.cursor.top)}
        >
          Kossi Houessou<span className="text-accent">.</span>
        </a>

        <nav className="flex items-center gap-4 sm:gap-7 lg:gap-9" aria-label="Section">
          <div className="hidden items-center gap-7 sm:flex">
            {ZONES.map((zone) => (
              <a
                key={zone.id}
                href={zone.href}
                data-cursor={t(zone.label)}
                data-active={activeZone === zone.id}
                aria-current={activeZone === zone.id ? "true" : undefined}
                className="nav-link"
              >
                <RegistrationMark className="nav-mark h-2.5 w-2.5 text-accent" />
                {t(zone.label)}
              </a>
            ))}
          </div>

          <Eyebrow rule={false} className="hidden lg:inline-flex">
            SF · {time}
          </Eyebrow>

          <LanguageToggle />

          <a href="#contact" data-cursor={t(copy.cursor.sayHi)} className="eyebrow underline-draw">
            {t(copy.header.sayHi)}
          </a>
        </nav>
      </div>
    </header>
  );
}

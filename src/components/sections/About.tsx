import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { useLanguage } from "../../lib/LanguageContext";
import { copy } from "../../content/copy";
import { Eyebrow } from "../ui/Eyebrow";

export function About() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { t } = useLanguage();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      const maskTargets = gsap.utils.toArray<HTMLElement>("[data-mask-inner]");

      if (reducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0 });
        gsap.set(maskTargets, { yPercent: 0 });
        return;
      }

      gsap.set(targets, { opacity: 0, y: 28 });
      gsap.set(maskTargets, { yPercent: 110 });

      maskTargets.forEach((target) => {
        gsap.to(target, {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: target, start: "top 85%" },
        });
      });

      targets.forEach((target) => {
        gsap.to(target, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: target, start: "top 85%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="about" ref={rootRef} className="edge py-28 md:py-36">
      <div className="wrap grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-12">
        <div data-reveal className="opacity-0 md:col-span-3">
          <Eyebrow className="mb-8">{t(copy.about.eyebrow)}</Eyebrow>
          <dl className="flex flex-col gap-5">
            {copy.about.facts.map((fact) => (
              <div key={fact.label.en} className="border-t border-line pt-3">
                <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
                  {t(fact.label)}
                </dt>
                <dd className="mt-1 text-[0.9rem] text-ink-soft">{t(fact.value)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-reveal className="opacity-0 md:col-span-8 md:col-start-5">
          <div className="mb-10 max-w-xl overflow-hidden">
            <h2 data-mask-inner className="h1">
              {t(copy.about.heading)}
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <p className="lede max-w-[62ch]">{t(copy.about.paragraphs[0])}</p>

            <p className="lede max-w-[62ch]">{t(copy.about.paragraphs[1])}</p>

            <p className="lede max-w-[62ch] border-l-2 border-accent py-1 pl-6">
              {t(copy.about.paragraphs[2])}
            </p>

            <p className="lede max-w-[62ch]">{t(copy.about.paragraphs[3])}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

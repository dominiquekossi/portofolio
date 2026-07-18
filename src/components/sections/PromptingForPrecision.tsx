import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { useLanguage } from "../../lib/LanguageContext";
import { copy } from "../../content/copy";
import { Eyebrow } from "../ui/Eyebrow";

export function PromptingForPrecision() {
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
          scrollTrigger: { trigger: target, start: "top 88%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="prompting" ref={rootRef} className="edge py-28 md:py-36">
      <div className="wrap">
        <div data-reveal className="mb-16 max-w-2xl opacity-0 md:mb-20">
          <Eyebrow className="mb-5">{t(copy.prompting.eyebrow)}</Eyebrow>
          <div className="overflow-hidden">
            <h2 data-mask-inner className="h1">
              {t(copy.prompting.heading)}
            </h2>
          </div>
          <p className="lede mt-6 max-w-[62ch]">{t(copy.prompting.lede)}</p>
        </div>

        <div data-reveal className="opacity-0">
          <Eyebrow rule={false} className="mb-5">
            {t(copy.prompting.specifyingMotion)}
          </Eyebrow>
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            <div className="border border-line bg-paper-deep p-6">
              <span className="eyebrow eyebrow--no-rule text-ink-faint">
                {t(copy.prompting.vaguePromptLabel)}
              </span>
              <p className="lede mt-4">{t(copy.prompting.vaguePromptText)}</p>
            </div>
            <div className="border border-accent bg-paper-deep p-6">
              <span className="eyebrow eyebrow--no-rule text-accent-deep">
                {t(copy.prompting.precisePromptLabel)}
              </span>
              <p className="lede mt-4">{t(copy.prompting.precisePromptText)}</p>
            </div>
          </div>
        </div>

        <div data-reveal className="mt-20 opacity-0 md:mt-24">
          <Eyebrow rule={false} className="mb-5">
            {t(copy.prompting.fromBuildingThisSite)}
          </Eyebrow>
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
            {copy.prompting.caseStudies.map((study) => (
              <div key={study.label.en} className="border-t border-line pt-6">
                <h3 className="h2 mb-5">{t(study.label)}</h3>
                <dl className="flex flex-col gap-4">
                  <div>
                    <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
                      {t(copy.prompting.promptLabel)}
                    </dt>
                    <dd className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">
                      {t(study.prompt)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
                      {t(copy.prompting.riskLabel)}
                    </dt>
                    <dd className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">
                      {t(study.risk)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-accent-deep">
                      {t(copy.prompting.resultLabel)}
                    </dt>
                    <dd className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">
                      {t(study.result)}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

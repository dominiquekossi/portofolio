import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { useLanguage } from "../../lib/LanguageContext";
import { copy } from "../../content/copy";
import { Eyebrow } from "../ui/Eyebrow";
import { productionProjects } from "../../content/productionProjects";

export function ProductionProjects() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { t } = useLanguage();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]");
      const rules = gsap.utils.toArray<HTMLElement>("[data-rule]");
      const heading = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      const maskTargets = gsap.utils.toArray<HTMLElement>("[data-mask-inner]");

      if (reducedMotion) {
        gsap.set(rows, { opacity: 1 });
        gsap.set(rules, { scaleX: 1 });
        gsap.set(heading, { opacity: 1, y: 0 });
        gsap.set(maskTargets, { yPercent: 0 });
        return;
      }

      gsap.set(rows, { opacity: 0 });
      gsap.set(rules, { scaleX: 0 });
      gsap.set(heading, { opacity: 0, y: 28 });
      gsap.set(maskTargets, { yPercent: 110 });

      heading.forEach((target) => {
        gsap.to(target, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: target, start: "top 85%" },
        });
      });

      maskTargets.forEach((target) => {
        gsap.to(target, {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: target, start: "top 85%" },
        });
      });

      rows.forEach((row, i) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 88%" },
        });
        tl.to(rules[i], { scaleX: 1, duration: 0.7, ease: "power3.inOut" }).to(
          row,
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          0.15,
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="production" ref={rootRef} className="edge py-28 md:py-32">
      <div className="wrap">
        <div data-reveal className="mb-16 max-w-2xl opacity-0 md:mb-20">
          <Eyebrow className="mb-5">{t(copy.productionProjects.eyebrow)}</Eyebrow>
          <div className="overflow-hidden">
            <h2 data-mask-inner className="h1">
              {t(copy.productionProjects.heading)}
            </h2>
          </div>
        </div>

        <ul className="border-b border-line">
          {productionProjects.map((project, index) => (
            <li key={project.id} data-row className="relative py-8 opacity-0">
              <span
                data-rule
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-line"
              />
              <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-baseline md:gap-6">
                <span className="font-display-face figure-oldstyle text-[1rem] italic text-accent md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="h2 md:col-span-4">{t(project.title)}</h3>
                <p className="lede md:col-span-5">{t(project.description)}</p>
                <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[0.8rem] text-ink-soft md:col-span-2 md:justify-self-end md:text-right">
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

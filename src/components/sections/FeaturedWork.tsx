import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { useLanguage } from "../../lib/LanguageContext";
import { copy } from "../../content/copy";
import { Eyebrow } from "../ui/Eyebrow";
import { CaseStudyCard } from "./CaseStudyCard";
import { caseStudies } from "../../content/caseStudies";

interface FeaturedWorkProps {
  /**
   * Case study ids in display order, first is the featured (wide) slot
   * unless `uniform` is set. Also acts as a filter: ids not listed here
   * simply don't render, so a track can show a curated subset. Omit to use
   * every case study in the order defined in content/caseStudies.ts (the
   * default, unchanged behavior).
   */
  order?: string[];
  /**
   * When true, every case study renders at the same (non-featured) size in
   * the grid, first item included, no large wide slot. Use when the track's
   * lead item shouldn't get outsized emphasis.
   */
  uniform?: boolean;
}

export function FeaturedWork({ order, uniform = false }: FeaturedWorkProps) {
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

      gsap.set(targets, { opacity: 0, y: 32 });
      gsap.set(maskTargets, { yPercent: 110 });

      targets.forEach((target) => {
        gsap.to(target, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: target,
            start: "top 85%",
          },
        });
      });

      maskTargets.forEach((target) => {
        gsap.to(target, {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: target,
            start: "top 85%",
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  const orderedStudies = order
    ? order
        .map((id) => caseStudies.find((study) => study.id === id))
        .filter((study): study is (typeof caseStudies)[number] => study !== undefined)
    : caseStudies;
  const featured = uniform ? undefined : orderedStudies[0];
  const rest = uniform ? orderedStudies : orderedStudies.slice(1);

  return (
    <section id="work" ref={rootRef} className="edge py-28 md:py-36">
      <div className="wrap">
        <div data-reveal className="mb-16 max-w-2xl opacity-0 md:mb-24">
          <Eyebrow className="mb-5">{t(copy.featuredWork.eyebrow)}</Eyebrow>
          <div className="overflow-hidden">
            <h2 data-mask-inner className="h1">
              {t(copy.featuredWork.heading)}
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-16 md:gap-20">
          {featured && <CaseStudyCard study={featured} featured />}
          <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2">
            {rest.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

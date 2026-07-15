import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { Eyebrow } from "../ui/Eyebrow";
import { CaseStudyCard } from "./CaseStudyCard";
import { caseStudies } from "../../content/caseStudies";

export function FeaturedWork() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      if (reducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(targets, { opacity: 0, y: 32 });

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
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  const [featured, ...rest] = caseStudies;

  return (
    <section id="work" ref={rootRef} className="edge py-28 md:py-36">
      <div className="wrap">
        <div data-reveal className="mb-16 max-w-2xl opacity-0 md:mb-24">
          <Eyebrow className="mb-5">Featured Work</Eyebrow>
          <h2 className="h1">Recreated at pixel level, shipped at production level.</h2>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <CaseStudyCard study={featured} />
          </div>
          <div className="flex flex-col gap-16 md:col-span-5">
            {rest.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

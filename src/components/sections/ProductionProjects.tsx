import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { Eyebrow } from "../ui/Eyebrow";
import { productionProjects } from "../../content/productionProjects";

export function ProductionProjects() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]");
      const rules = gsap.utils.toArray<HTMLElement>("[data-rule]");

      if (reducedMotion) {
        gsap.set(rows, { opacity: 1 });
        gsap.set(rules, { scaleX: 1 });
        return;
      }

      gsap.set(rows, { opacity: 0 });
      gsap.set(rules, { scaleX: 0 });

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
        <Eyebrow className="mb-10 md:mb-14">Production Projects</Eyebrow>

        <ul className="border-b border-line">
          {productionProjects.map((project, index) => (
            <li key={project.id} data-row className="relative py-8 opacity-0">
              <span
                data-rule
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-line"
              />
              <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-baseline md:gap-6">
                <span className="text-[0.8rem] text-ink-faint md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="h2 md:col-span-4">{project.title}</h3>
                <p className="lede md:col-span-5">{project.description}</p>
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

import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { Eyebrow } from "../ui/Eyebrow";
import { openSourcePackages } from "../../content/openSourcePackages";

export function OpenSource() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-item]");
      const rules = gsap.utils.toArray<HTMLElement>("[data-rule]");
      const heading = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      const maskTargets = gsap.utils.toArray<HTMLElement>("[data-mask-inner]");

      if (reducedMotion) {
        gsap.set([...heading, ...items], { opacity: 1, y: 0 });
        gsap.set(rules, { scaleX: 1 });
        gsap.set(maskTargets, { yPercent: 0 });
        return;
      }

      gsap.set(heading, { opacity: 0, y: 28 });
      gsap.set(items, { opacity: 0, y: 20 });
      gsap.set(rules, { scaleX: 0 });
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

      items.forEach((item, i) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: "top 90%" },
        });
        tl.to(rules[i], { scaleX: 1, duration: 0.6, ease: "power3.inOut" }).to(
          item,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0.1,
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="open-source" ref={rootRef} className="edge py-28 md:py-36">
      <div className="wrap">
        <div data-reveal className="mb-16 max-w-2xl opacity-0 md:mb-20">
          <Eyebrow className="mb-5">Open Source</Eyebrow>
          <div className="overflow-hidden">
            <h2 data-mask-inner className="h1">
              Six packages, maintained in the open.
            </h2>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {openSourcePackages.map((pkg) => (
            <li key={pkg.id} data-item className="relative opacity-0">
              <span
                data-rule
                aria-hidden
                className="mb-4 block h-px w-full origin-left scale-x-0 bg-line"
              />
              <h3 className="font-sans text-xl font-medium tracking-tight text-ink">
                {pkg.name}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                {pkg.description}
              </p>
              <a
                href={pkg.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="View repo"
                className="eyebrow underline-draw mt-4 inline-flex"
              >
                View on GitHub ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { Eyebrow } from "../ui/Eyebrow";

const EMAIL = "houessoudominique@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/kossi-houessou-8b9873238";
const GITHUB = "https://github.com/dominiquekossi";

export function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

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
          scrollTrigger: { trigger: target, start: "top 88%" },
        });
      });

      targets.forEach((target, i) => {
        gsap.to(target, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: target, start: "top 88%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <>
      <section id="contact" ref={rootRef} className="edge py-28 md:py-40">
        <div className="wrap">
          <div data-reveal className="opacity-0">
            <Eyebrow className="mb-8">Contact</Eyebrow>
            <div className="mb-10 max-w-xl overflow-hidden">
              <h2 data-mask-inner className="h1">
                Say hello.
              </h2>
            </div>
          </div>

          <a
            href={`mailto:${EMAIL}`}
            data-cursor="Email"
            data-reveal
            className="h1 underline-draw inline-block break-all opacity-0"
          >
            <em>{EMAIL}</em>
          </a>

          <div data-reveal className="mt-14 flex flex-wrap gap-x-10 gap-y-3 opacity-0">
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="LinkedIn"
              className="eyebrow underline-draw"
            >
              LinkedIn ↗
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GitHub"
              className="eyebrow underline-draw"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      <footer className="edge border-t border-line py-8">
        <div className="wrap flex flex-col gap-4 text-[0.8rem] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} Kossi Houessou</span>
          <a href="#top" data-cursor="Top" className="eyebrow underline-draw">
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  );
}

import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { Eyebrow } from "../ui/Eyebrow";

const facts = [
  { label: "Role", value: "Senior Frontend Engineer" },
  { label: "Focus", value: "AI training & evaluation interfaces" },
  { label: "Stack", value: "React · Next.js · TypeScript" },
  { label: "Testing", value: "Playwright · Jest · Vitest" },
];

export function About() {
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

      gsap.set(targets, { opacity: 0, y: 28 });

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
          <Eyebrow className="mb-8">About</Eyebrow>
          <dl className="flex flex-col gap-5">
            {facts.map((fact) => (
              <div key={fact.label} className="border-t border-line pt-3">
                <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-[0.9rem] text-ink-soft">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-reveal className="opacity-0 md:col-span-8 md:col-start-5">
          <h2 className="h1 mb-10 max-w-xl">Precision is the job.</h2>

          <div className="flex flex-col gap-6">
            <p className="lede max-w-[62ch]">
              I'm Kossi Houessou, a senior frontend engineer. Today that means building
              golden-standard frontend implementations at an AI-focused startup: pixel-precise
              recreations of production interfaces used to train, evaluate, and benchmark AI
              models. The brief is a real, shipped product, and the tolerance for drift from it
              is zero.
            </p>

            <p className="lede max-w-[62ch]">
              React, Next.js, and TypeScript are the default. Tailwind CSS and GSAP handle
              layout and motion. Playwright, Jest, and Vitest cover the parts of a build that
              shouldn't depend on me noticing a regression by eye.
            </p>

            <p className="lede max-w-[62ch] border-l-2 border-accent py-1 pl-6">
              Prompt engineering shows up in this work even when it isn't labeled that way. The
              specs I write to guide tools like Claude Code and Cursor toward production-quality
              output follow the same logic as the training and evaluation material I build for
              AI models. Precision and structure in the instruction is what determines the
              quality of what comes back.
            </p>

            <p className="lede max-w-[62ch]">
              Visual QA happens while I build, not after it. A five-pixel drift or a
              hundred-millisecond mistiming is exactly the kind of thing this work exists to
              catch, so it gets caught early.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

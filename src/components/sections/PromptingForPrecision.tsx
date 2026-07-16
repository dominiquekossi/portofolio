import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { Eyebrow } from "../ui/Eyebrow";

const motionExample = {
  vague: "Make the cards fade in when you scroll to them.",
  precise:
    "Fade each card from 0 to full opacity and move it 32px upward over 900ms, eased on a power3 out curve. Stagger siblings by 80ms. Trigger when the element's top edge crosses 85% of the viewport height, not on page load and not at a fixed scroll offset.",
};

interface PromptCaseStudy {
  label: string;
  prompt: string;
  risk: string;
  result: string;
}

const caseStudies: PromptCaseStudy[] = [
  {
    label: "The Hero cube",
    prompt: "The initial ask was simple: add a rotating 3D object to the Hero.",
    risk:
      "The default instinct for a rotating cube skews toward a colorful, beveled, Rubik's cube look, the kind of choice a model reaches for without more direction. That would have fought this site's restricted editorial palette on sight.",
    result:
      "The brief was narrowed to wireframe geometry only, edges in the exact accent color already defined in the design tokens, faces nearly transparent. The object rotating above is that result: a precision instrument, not a toy.",
  },
  {
    label: "The accent color",
    prompt: "Generate three candidate accent colors for a paper and ink editorial palette.",
    risk:
      "One candidate leaned toward the blue most portfolio sites default to. Another sat close to the warm terracotta that currently reads as a generic AI-generated design tell. Both were rejected on sight, not on preference, because either would undercut the point of a distinctive palette.",
    result:
      "The ochre gold used throughout this site, in the headline emphasis, the cube's edges, every link underline, was the third option: warm enough to feel print shop rather than tech startup, specific enough to not read as a template default.",
  },
];

export function PromptingForPrecision() {
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
          <Eyebrow className="mb-5">Prompting for Precision</Eyebrow>
          <div className="overflow-hidden">
            <h2 data-mask-inner className="h1">
              Precise enough to reproduce exact behavior, not to generate images.
            </h2>
          </div>
          <p className="lede mt-6 max-w-[62ch]">
            Most of my work with AI is not about generating images. It is about writing
            instructions precise enough for a model to reproduce exact visual and motion
            behavior, then evaluating and refining the result until it matches the reference.
            That discipline comes from building golden-standard frontend implementations used to
            train and evaluate AI models: the same precision, applied to the tools themselves.
          </p>
        </div>

        <div data-reveal className="opacity-0">
          <Eyebrow rule={false} className="mb-5">
            Specifying motion
          </Eyebrow>
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            <div className="border border-line bg-paper-deep p-6">
              <span className="eyebrow eyebrow--no-rule text-ink-faint">Vague prompt</span>
              <p className="lede mt-4">{motionExample.vague}</p>
            </div>
            <div className="border border-accent bg-paper-deep p-6">
              <span className="eyebrow eyebrow--no-rule text-accent-deep">Precise prompt</span>
              <p className="lede mt-4">{motionExample.precise}</p>
            </div>
          </div>
        </div>

        <div data-reveal className="mt-20 opacity-0 md:mt-24">
          <Eyebrow rule={false} className="mb-5">
            From building this site
          </Eyebrow>
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
            {caseStudies.map((study) => (
              <div key={study.label} className="border-t border-line pt-6">
                <h3 className="h2 mb-5">{study.label}</h3>
                <dl className="flex flex-col gap-4">
                  <div>
                    <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
                      Prompt
                    </dt>
                    <dd className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">
                      {study.prompt}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
                      Risk / critique
                    </dt>
                    <dd className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">
                      {study.risk}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-accent-deep">
                      Result
                    </dt>
                    <dd className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">
                      {study.result}
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

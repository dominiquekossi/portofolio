import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { Eyebrow } from "../ui/Eyebrow";
import type { CaseStudy } from "../../content/caseStudies";

interface CaseStudyCardProps {
  study: CaseStudy;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const card = cardRef.current;
    const img = imgRef.current;
    if (!card || !img || reducedMotion) return;

    gsap.set(img, { yPercent: 0 });
    const panTo = gsap.quickTo(img, "yPercent", { duration: 0.8, ease: "power3.out" });

    const onEnter = () => panTo(-10);
    const onLeave = () => panTo(0);

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion]);

  return (
    <article ref={cardRef} data-reveal className="opacity-0">
      <a
        href={study.href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="View live"
        className="block border border-line bg-paper-deep p-2 md:p-3"
      >
        <div className="aspect-[16/10] overflow-hidden">
          <img
            ref={imgRef}
            src={study.image}
            alt={`${study.title} interface screenshot`}
            loading="lazy"
            className="h-[114%] w-full object-cover object-top"
          />
        </div>
      </a>

      <div className="mt-6 flex flex-col gap-2">
        <Eyebrow rule={false}>{study.tag}</Eyebrow>
        <h3 className="h2">{study.title}</h3>
        <p className="lede max-w-[52ch]">{study.description}</p>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[0.8rem] text-ink-soft">
        {study.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <a
        href={study.href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="View live"
        className="eyebrow underline-draw mt-5 inline-flex"
      >
        View live ↗
      </a>
    </article>
  );
}

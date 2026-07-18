import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { useLanguage } from "../../lib/LanguageContext";
import { copy } from "../../content/copy";
import { Eyebrow } from "../ui/Eyebrow";
import { PhoneFrame } from "../ui/PhoneFrame";
import type { CaseStudy } from "../../content/caseStudies";

interface CaseStudyCardProps {
  study: CaseStudy;
  featured?: boolean;
}

export function CaseStudyCard({ study, featured = false }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const reducedMotion = useReducedMotion();
  const { t } = useLanguage();

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
    <article
      ref={cardRef}
      data-reveal
      className="group opacity-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5"
    >
      {study.image ? (
        <a
          href={study.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor={t(copy.cursor.viewLive)}
          className="block border border-line bg-paper-deep p-2 transition-colors duration-500 group-hover:border-accent md:p-3"
        >
          <div className={featured ? "aspect-21/9 overflow-hidden" : "aspect-16/10 overflow-hidden"}>
            <img
              ref={imgRef}
              src={study.image}
              alt={t(copy.caseStudy.imageAlt(study.title))}
              loading="lazy"
              className="h-[114%] w-full object-cover object-top"
            />
          </div>
        </a>
      ) : (
        study.mobileHero && (
          <a
            href={study.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor={t(copy.cursor.viewLive)}
            className="flex items-end justify-center gap-4 border border-line bg-paper-deep p-4 transition-colors duration-500 group-hover:border-accent sm:justify-start"
          >
            <PhoneFrame
              src={study.mobileHero.src}
              poster={study.mobileHero.poster}
              alt={t(copy.caseStudy.imageAlt(study.title))}
              type={study.mobileHero.type}
              reducedMotion={reducedMotion}
              className="w-32 shrink-0 sm:w-36 md:w-40"
            />
            {study.mobileImages && study.mobileImages.length > 0 && (
              <div className="flex gap-3">
                {study.mobileImages.map((shot) => (
                  <PhoneFrame key={shot.alt} src={shot.src} alt={shot.alt} className="w-20 shrink-0 sm:w-24 md:w-28" />
                ))}
              </div>
            )}
          </a>
        )
      )}

      {study.image && study.mobileImages && study.mobileImages.length > 0 && (
        <div className="mt-4 flex gap-4">
          {study.mobileImages.map((shot) => (
            <PhoneFrame
              key={shot.alt}
              src={shot.src}
              alt={shot.alt}
              className="w-28 shrink-0 sm:w-32 md:w-36"
            />
          ))}
        </div>
      )}

      {featured ? (
        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow rule={false} className="mb-3">
              {t(study.tag)}
            </Eyebrow>
            <h3 className="h1">{study.title}</h3>
          </div>
          <p className="lede max-w-[52ch] md:col-span-5">{t(study.description)}</p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-2">
          <Eyebrow rule={false}>{t(study.tag)}</Eyebrow>
          <h3 className="h2">{study.title}</h3>
          <p className="lede max-w-[52ch]">{t(study.description)}</p>
        </div>
      )}

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[0.8rem] text-ink-soft">
        {study.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <a
        href={study.href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor={t(copy.cursor.viewLive)}
        className="eyebrow underline-draw mt-5 inline-flex"
      >
        {t(copy.caseStudy.viewLive)}
      </a>
    </article>
  );
}

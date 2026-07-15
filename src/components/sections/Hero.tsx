import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { useMediaQuery } from "../../lib/useMediaQuery";
import { Eyebrow } from "../ui/Eyebrow";
import { RegistrationMark } from "../ui/RegistrationMark";
import { RotatingCube } from "../three/RotatingCube";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const tickRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const showCube = useMediaQuery("(min-width: 768px)");

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(["[data-reveal]", "[data-line-inner]", "[data-eyebrow]"], {
          opacity: 1,
          y: 0,
          yPercent: 0,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.set("[data-line-inner]", { yPercent: 110 })
        .set("[data-reveal]", { opacity: 0, y: 16 })
        .to("[data-eyebrow]", { opacity: 1, y: 0, duration: 0.7 }, 0.15)
        .to("[data-line-inner]", { yPercent: 0, duration: 1.1, stagger: 0.12 }, 0.3)
        .to("[data-reveal]", { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.95);

      if (tickRef.current) {
        gsap.fromTo(
          tickRef.current,
          { y: -16 },
          { y: 64, duration: 1.7, repeat: -1, ease: "power1.inOut" },
        );
      }
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="edge relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-10 pt-28"
    >
      <div className="hero-mesh" aria-hidden />

      <RegistrationMark className="absolute left-(--edge) top-24 hidden text-ink-faint/70 md:block" />
      <RegistrationMark className="absolute right-(--edge) top-24 hidden text-ink-faint/70 md:block" />

      <div
        data-reveal
        aria-hidden
        className="absolute right-(--edge) top-[16%] z-5 hidden h-56 w-56 opacity-0 md:block lg:h-72 lg:w-72"
      >
        {showCube && <RotatingCube />}
      </div>

      <div className="wrap relative z-10 flex flex-1 flex-col justify-center">
        <div data-eyebrow className="opacity-0">
          <Eyebrow className="mb-6">Senior Frontend Engineer · Portfolio 2026</Eyebrow>
        </div>

        <h1 className="h-display">
          <span className="block overflow-hidden">
            <span data-line-inner className="block">
              Kossi
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-line-inner className="block">
              <em>Houessou</em>
            </span>
          </span>
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-12">
          <p data-reveal className="lede opacity-0 sm:col-span-6 sm:col-start-7">
            I build <em>golden-standard</em> frontend at an AI-focused startup: pixel-precise
            recreations of production interfaces used to train, evaluate, and benchmark AI
            models. React, Next.js, TypeScript and motion engineering, applied with print-shop
            precision.
          </p>
        </div>
      </div>

      <div className="wrap relative z-10 flex flex-wrap items-end justify-between gap-6">
        <ul data-reveal className="flex flex-wrap gap-x-8 gap-y-2 text-[0.8rem] text-ink-soft opacity-0">
          <li>React · Next.js · TypeScript</li>
          <li>Tailwind · GSAP · Lenis</li>
          <li className="hidden md:block">Playwright · Jest · Vitest</li>
        </ul>

        <div data-reveal data-cursor="Scroll" className="flex items-center gap-3 opacity-0">
          <span className="eyebrow eyebrow--no-rule">Scroll</span>
          <span className="relative h-16 w-px overflow-hidden bg-line">
            <span ref={tickRef} className="absolute left-0 top-0 h-4 w-px bg-ink" />
          </span>
        </div>
      </div>
    </section>
  );
}

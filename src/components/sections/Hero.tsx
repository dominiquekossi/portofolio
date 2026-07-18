import { useLayoutEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { useMediaQuery } from "../../lib/useMediaQuery";
import { onIntroReveal } from "../../lib/intro";
import { useLanguage } from "../../lib/LanguageContext";
import { copy } from "../../content/copy";
import { Eyebrow } from "../ui/Eyebrow";
import { RotatingCube } from "../three/RotatingCube";

const OCHRE_STEPS = [0.25, 0.45, 0.65, 0.85, 1];

const STACK_GROUPS = [
  { label: "Backend", items: ["Node.js", ".NET / C#", "TypeScript", "REST APIs"] },
  { label: "Frontend", items: ["React", "Next.js", "React Native", "GSAP", "Three.js"] },
];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const showCube = useMediaQuery("(min-width: 768px)");
  const { t } = useLanguage();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Everything is visible by default (see markup: no opacity-0). The entrance
    // only enhances, using from()/fromTo() with immediateRender:false so a
    // missed trigger can never leave content hidden. This is deliberate: the
    // reveal used to gate visibility, which stranded the page on just the name
    // whenever the cue did not arrive.
    if (reducedMotion) {
      gsap.set("[data-ghost]", { opacity: 0 });
      return;
    }

    let played = false;

    const ctx = gsap.context(() => {
      const play = () => {
        if (played || !root.isConnected) return;
        played = true;

        const tl = gsap.timeline({ defaults: { ease: "power3.out", immediateRender: false } });

        tl.from("[data-eyebrow]", { opacity: 0, y: 12, duration: 0.6 }, 0)
          // The lock: each plate ghost starts offset and slides into exact
          // register, fading as it merges with the crisp plate beneath.
          .fromTo(
            "[data-ghost-1]",
            { "--rx": "0.16em", "--ry": "-0.1em", opacity: 1 },
            { "--rx": "0em", "--ry": "0em", opacity: 0, duration: 0.9, ease: "power4.out" },
            0.05,
          )
          .fromTo(
            "[data-ghost-2]",
            { "--rx": "-0.14em", "--ry": "0.1em", opacity: 1 },
            { "--rx": "0em", "--ry": "0em", opacity: 0, duration: 0.9, ease: "power4.out" },
            0.13,
          )
          .fromTo(
            "[data-hero-name]",
            { scale: 1.015 },
            { scale: 1, duration: 0.8, ease: "back.out(1.6)" },
            0.05,
          )
          .from("[data-crop]", { opacity: 0, duration: 0.6 }, 0.35)
          .from(
            "[data-cube-reveal]",
            { opacity: 0, y: 14, scale: 0.92, duration: 1.1 },
            0.5,
          )
          .from("[data-reveal-lede]", { opacity: 0, y: 16, duration: 0.8 }, 0.6)
          .from("[data-reveal]", { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 }, 0.8);
      };

      const unsubscribe = onIntroReveal(play);
      // Safety net: if the entrance cue never arrives, play anyway so the
      // motion still happens (content is already visible regardless).
      const fallback = window.setTimeout(play, 2600);

      return () => {
        unsubscribe();
        window.clearTimeout(fallback);
      };
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="edge relative flex min-h-svh flex-col justify-between overflow-hidden pb-8 pt-28"
    >
      <div className="hero-mesh" aria-hidden />

      <span data-crop className="crop-mark crop-mark--tl left-(--edge) top-24" aria-hidden />
      <span data-crop className="crop-mark crop-mark--tr right-(--edge) top-24" aria-hidden />
      <span data-crop className="crop-mark crop-mark--bl bottom-32 left-(--edge)" aria-hidden />
      <span data-crop className="crop-mark crop-mark--br bottom-32 right-(--edge)" aria-hidden />

      <div
        data-cube-reveal
        aria-hidden
        className="absolute right-(--edge) top-[14%] z-5 hidden h-52 w-52 md:block lg:h-64 lg:w-64"
      >
        {showCube && <RotatingCube />}
      </div>

      <div className="wrap relative z-10 flex flex-1 flex-col justify-center">
        <div data-eyebrow>
          <Eyebrow className="mb-6">{t(copy.hero.eyebrow)}</Eyebrow>
        </div>

        <h1 data-hero-name className="h-display">
          <span className="reg-line">
            <span className="reg-ghost reg-ghost--ochre" data-ghost data-ghost-1 aria-hidden>
              Kossi
            </span>
            <span className="reg-ink">Kossi</span>
          </span>
          <span className="reg-line reg-line--hou">
            <span className="reg-ghost" data-ghost data-ghost-2 aria-hidden>
              Houessou
            </span>
            <span className="reg-ink">Houessou</span>
          </span>
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-12">
          <p data-reveal-lede className="lede md:col-span-7">
            {t(copy.hero.lede)}
          </p>

          <div data-reveal className="flex flex-col gap-5 md:col-span-4 md:col-start-9">
            <Eyebrow rule={false} className="text-ink-soft">
              {t(copy.hero.stackEyebrow)}
            </Eyebrow>
            {STACK_GROUPS.map((group) => (
              <div key={group.label}>
                <span className="mono mono--accent mb-2 block">{group.label}</span>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="mono border border-line px-2.5 py-1 leading-none text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
        <div data-reveal className="calibration">
          <span className="mono">{t(copy.hero.ochre)}</span>
          <span className="calibration__swatches" aria-hidden>
            {OCHRE_STEPS.map((d) => (
              <span key={d} className="swatch" style={{ "--d": d } as CSSProperties} />
            ))}
            <span className="swatch swatch--ink" />
          </span>
          <span className="mono">{t(copy.hero.ink)}</span>
        </div>

        <a
          href="#work"
          data-reveal
          data-cursor={t(copy.cursor.viewWork)}
          className="group flex items-center gap-3"
        >
          <span className="eyebrow eyebrow--no-rule transition-colors duration-300 group-hover:text-accent">
            {t(copy.hero.viewTheWork)}
          </span>
          <span className="relative flex h-4 w-4 items-center justify-center">
            <span className="block h-2.5 w-2.5 rotate-45 border-b border-r border-ink transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:border-accent" />
          </span>
        </a>
      </div>
    </section>
  );
}

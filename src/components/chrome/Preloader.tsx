import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { fireIntroReveal, introHasFired } from "../../lib/intro";

/**
 * The registration entrance. Reads like a two-plate press coming into
 * register: crop marks frame the sheet, a crosshair and a mono readout
 * count the ochre plate to 100%, the plate locks, and the sheet wipes up
 * to reveal the page. Scroll is held until the lock. Reduced motion skips
 * the whole thing and the page is shown immediately.
 */
export function Preloader() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !introHasFired());
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (introHasFired()) {
      setVisible(false);
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    // Reduced motion: no overlay, reveal immediately.
    if (reducedMotion) {
      fireIntroReveal();
      setVisible(false);
      return;
    }

    const doc = document.documentElement;
    doc.classList.add("intro-active");
    window.scrollTo(0, 0);

    const unlock = () => doc.classList.remove("intro-active");

    // Absolute guarantee that scroll is never left locked and the overlay is
    // never left covering the page, even if a tween is interrupted.
    const safety = window.setTimeout(() => {
      fireIntroReveal();
      unlock();
      setVisible(false);
    }, 3800);

    const ctx = gsap.context(() => {
      const counter = { v: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          window.clearTimeout(safety);
          unlock();
          setVisible(false);
        },
      });

      tl.set(".intro__cross", { opacity: 0, scale: 1.5, rotate: -25 })
        .set(".intro__crop", { opacity: 0, scale: 0.5 })
        .set(".intro__readout", { opacity: 0, y: 10 })
        .set(statusRef.current, { opacity: 0 })
        .to(".intro__crop", { opacity: 1, scale: 1, duration: 0.5, stagger: 0.06 }, 0.1)
        .to(".intro__cross", { opacity: 1, scale: 1, rotate: 0, duration: 0.7 }, 0.15)
        .to(".intro__readout", { opacity: 1, y: 0, duration: 0.5 }, 0.25)
        .to(
          counter,
          {
            v: 100,
            duration: 0.95,
            ease: "power2.inOut",
            onUpdate: () => {
              if (numRef.current) {
                numRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
              }
            },
          },
          0.3,
        )
        // The lock: a tight settle on the crosshair, status flips to LOCKED.
        .to(".intro__cross", { scale: 0.9, duration: 0.1, ease: "power2.in" }, 1.2)
        .to(".intro__cross", { scale: 1, duration: 0.45, ease: "back.out(2.2)" }, 1.3)
        .to(statusRef.current, { opacity: 1, duration: 0.3 }, 1.32)
        .call(fireIntroReveal, undefined, 1.45)
        // Sheet wipes up to reveal the registered page beneath. The overlay
        // is the context root, so target the node directly (scoped selectors
        // only see descendants).
        .to(".intro__inner", { y: -18, opacity: 0, duration: 0.5, ease: "power2.in" }, 1.5)
        .to(root, { clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "power4.inOut" }, 1.6);

      // Let an impatient visitor skip: fast-forward once on first input.
      const skip = () => {
        tl.timeScale(4);
        remove();
      };
      const remove = () => {
        window.removeEventListener("pointerdown", skip);
        window.removeEventListener("keydown", skip);
        window.removeEventListener("wheel", skip);
        window.removeEventListener("touchstart", skip);
      };
      window.addEventListener("pointerdown", skip, { passive: true });
      window.addEventListener("keydown", skip);
      window.addEventListener("wheel", skip, { passive: true });
      window.addEventListener("touchstart", skip, { passive: true });

      return remove;
    }, root);

    return () => {
      window.clearTimeout(safety);
      ctx.revert();
      unlock();
    };
  }, [reducedMotion]);

  if (!visible) return null;

  const cropStyle = {
    tl: { top: "var(--edge)", left: "var(--edge)" },
    tr: { top: "var(--edge)", right: "var(--edge)" },
    bl: { bottom: "var(--edge)", left: "var(--edge)" },
    br: { bottom: "var(--edge)", right: "var(--edge)" },
  } as const;

  return (
    <div className="intro" ref={rootRef} aria-hidden>
      <span className="crop-mark crop-mark--tl intro__crop" style={cropStyle.tl} />
      <span className="crop-mark crop-mark--tr intro__crop" style={cropStyle.tr} />
      <span className="crop-mark crop-mark--bl intro__crop" style={cropStyle.bl} />
      <span className="crop-mark crop-mark--br intro__crop" style={cropStyle.br} />

      <div className="intro__inner">
        <svg
          className="intro__cross"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          aria-hidden
        >
          <circle cx="30" cy="30" r="13" stroke="currentColor" strokeWidth="1" />
          <line x1="30" y1="2" x2="30" y2="58" stroke="currentColor" strokeWidth="1" />
          <line x1="2" y1="30" x2="58" y2="30" stroke="currentColor" strokeWidth="1" />
          <circle cx="30" cy="30" r="1.6" fill="currentColor" />
        </svg>

        <div className="intro__readout">
          <span>Register</span>
          <span>
            <span ref={numRef}>000</span>%
          </span>
          <span className="intro__status" ref={statusRef}>
            Locked
          </span>
        </div>
      </div>
    </div>
  );
}

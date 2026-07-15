import { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/useReducedMotion";

/**
 * Two-part cursor: a dot that tracks the pointer near-instantly, and a
 * ring that trails with a short lag. Hovering any [data-cursor="Label"]
 * element expands the ring into a label pill — used only where it
 * communicates an affordance (e.g. "Scroll", "Say hi"), never as
 * decoration.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(mql.matches && !reducedMotion);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [reducedMotion]);

  useEffect(() => {
    document.documentElement.classList.toggle("has-fine-pointer", enabled);
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const setRingX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      setRingX(e.clientX);
      setRingY(e.clientY);
      setDotX(e.clientX);
      setDotY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      if (!target) return;
      const text = target.dataset.cursor ?? "";
      label.textContent = text;
      gsap.to(ring, { scale: text ? 2.4 : 1.8, duration: 0.35, ease: "power3.out" });
      gsap.to(label, { opacity: 1, duration: 0.25 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      if (!target) return;
      gsap.to(ring, { scale: 1, duration: 0.35, ease: "power3.out" });
      gsap.to(label, { opacity: 0, duration: 0.2 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [enabled]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-100 ${enabled ? "" : "hidden"}`}
    >
      <div
        ref={ringRef}
        className="fixed left-0 top-0 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-ink/60"
      >
        <span
          ref={labelRef}
          className="whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink opacity-0"
        />
      </div>
      <div ref={dotRef} className="fixed left-0 top-0 ml-[-3px] mt-[-3px] h-[6px] w-[6px] rounded-full bg-ink" />
    </div>
  );
}

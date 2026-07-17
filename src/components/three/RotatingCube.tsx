import { useEffect, useRef } from "react";
import type { Mesh } from "three";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { onIntroReveal } from "../../lib/intro";

function readCssColor(varName: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return value || fallback;
}

type Axis = "x" | "y" | "z";
interface Move {
  axis: Axis;
  layer: 1 | -1;
  dir: 1 | -1;
}

const SPACING = 0.4;
const CUBIE = 0.37;
const SCRAMBLE = 12;
const HALF_PI = Math.PI / 2;

/**
 * A 3x3 cube rendered entirely in the site's own plates, ochre, ink and
 * paper tones, never the six-color toy. It starts scrambled and solves
 * itself: the same chaos-into-order idea as the press registration in the
 * entrance, precision made visible. The solve is just the scramble played
 * back in reverse, so no solver algorithm is needed.
 *
 * Three.js is dynamically imported so it never enters the main bundle on
 * devices where the cube isn't rendered (Hero gates it to md and up).
 */
export function RotatingCube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.set(1.9, 1.5, 2.7);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      // Six plates drawn from the palette. The three camera-facing faces
      // (right/up/front) carry the most contrast; lighter tones live on the
      // hidden faces and only surface while the cube is scrambled.
      const tone = (v: string, f: string) => new THREE.Color(readCssColor(v, f));
      const faceMats = {
        R: new THREE.MeshBasicMaterial({ color: tone("--color-ink", "#14110b") }),
        L: new THREE.MeshBasicMaterial({ color: tone("--color-ink-soft", "#423d33") }),
        U: new THREE.MeshBasicMaterial({ color: tone("--color-accent-deep", "#77521e") }),
        D: new THREE.MeshBasicMaterial({ color: tone("--color-line", "#ddd6c7") }),
        F: new THREE.MeshBasicMaterial({ color: tone("--color-accent", "#a9752c") }),
        B: new THREE.MeshBasicMaterial({ color: tone("--color-paper-deep", "#ebe6da") }),
      };
      const bodyMat = new THREE.MeshBasicMaterial({ color: tone("--color-ink", "#14110b") });

      const geometry = new THREE.BoxGeometry(CUBIE, CUBIE, CUBIE);
      const edgeGeometry = new THREE.EdgesGeometry(geometry);
      const edgeMat = new THREE.LineBasicMaterial({
        color: tone("--color-ink", "#14110b"),
        transparent: true,
        opacity: 0.35,
      });

      const mainGroup = new THREE.Group();
      const pivot = new THREE.Group();
      mainGroup.add(pivot);
      scene.add(mainGroup);

      const cubies: Mesh[] = [];
      for (let gx = -1; gx <= 1; gx++) {
        for (let gy = -1; gy <= 1; gy++) {
          for (let gz = -1; gz <= 1; gz++) {
            if (gx === 0 && gy === 0 && gz === 0) continue;
            const mats = [
              gx === 1 ? faceMats.R : bodyMat,
              gx === -1 ? faceMats.L : bodyMat,
              gy === 1 ? faceMats.U : bodyMat,
              gy === -1 ? faceMats.D : bodyMat,
              gz === 1 ? faceMats.F : bodyMat,
              gz === -1 ? faceMats.B : bodyMat,
            ];
            const mesh = new THREE.Mesh(geometry, mats);
            mesh.position.set(gx * SPACING, gy * SPACING, gz * SPACING);
            mesh.add(new THREE.LineSegments(edgeGeometry, edgeMat));
            mainGroup.add(mesh);
            cubies.push(mesh);
          }
        }
      }

      const layerCubies = (axis: Axis, layer: number) =>
        cubies.filter((c) => Math.round(c.position[axis] / SPACING) === layer);

      const commit = (moved: Mesh[]) => {
        moved.forEach((c) => {
          mainGroup.attach(c);
          c.position.x = Math.round(c.position.x / SPACING) * SPACING;
          c.position.y = Math.round(c.position.y / SPACING) * SPACING;
          c.position.z = Math.round(c.position.z / SPACING) * SPACING;
        });
        pivot.rotation.set(0, 0, 0);
      };

      const applyInstant = ({ axis, layer, dir }: Move) => {
        const moved = layerCubies(axis, layer);
        moved.forEach((c) => pivot.attach(c));
        pivot.rotation[axis] = dir * HALF_PI;
        commit(moved);
      };

      const renderFrame = () => renderer.render(scene, camera);

      let frameId: number | null = null;
      let onPointerMove: ((e: PointerEvent) => void) | null = null;
      let unsubscribeIntro: (() => void) | null = null;
      let solveTimer: number | null = null;

      if (reducedMotion) {
        // Static and already solved, at a readable three-quarter angle.
        mainGroup.rotation.set(0.16, -0.12, 0);
        renderFrame();
      } else {
        // Scramble now (recorded), solve by reversing it on the entrance cue.
        const moves: Move[] = [];
        const axes: Axis[] = ["x", "y", "z"];
        let prevAxis: Axis | null = null;
        for (let i = 0; i < SCRAMBLE; i++) {
          let axis = axes[Math.floor(Math.random() * 3)];
          if (axis === prevAxis) axis = axes[(axes.indexOf(axis) + 1) % 3];
          prevAxis = axis;
          const move: Move = {
            axis,
            layer: Math.random() < 0.5 ? 1 : -1,
            dir: Math.random() < 0.5 ? 1 : -1,
          };
          moves.push(move);
          applyInstant(move);
        }

        let solved = false;
        let solveStarted = false;
        const base = { x: 0, y: 0 };
        const tilt = { x: 0, y: 0 };
        const tiltTarget = { x: 0, y: 0 };

        onPointerMove = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          const nx = (e.clientX / window.innerWidth - 0.5) * 2;
          const ny = (e.clientY / window.innerHeight - 0.5) * 2;
          tiltTarget.x = ny * 0.16;
          tiltTarget.y = nx * 0.22;
        };
        window.addEventListener("pointermove", onPointerMove);

        const makeMoveTween = ({ axis, layer, dir }: Move) => {
          let moved: Mesh[] = [];
          return gsap.to(pivot.rotation, {
            [axis]: dir * HALF_PI,
            duration: 0.19,
            ease: "power2.inOut",
            onStart: () => {
              moved = layerCubies(axis, layer);
              moved.forEach((c) => pivot.attach(c));
            },
            onComplete: () => commit(moved),
          });
        };

        const solve = () => {
          if (solveStarted) return;
          solveStarted = true;
          const tl = gsap.timeline({
            onComplete: () => {
              solved = true;
            },
          });
          moves
            .slice()
            .reverse()
            .forEach((m) => {
              tl.add(makeMoveTween({ axis: m.axis, layer: m.layer, dir: (-m.dir) as 1 | -1 }));
            });
        };

        unsubscribeIntro = onIntroReveal(solve);
        // Last-resort safety so the cube never sits scrambled forever.
        solveTimer = window.setTimeout(solve, 4200);

        const tick = () => {
          if (solved) {
            base.x += 0.0022;
            base.y += 0.0032;
          }
          tilt.x += (tiltTarget.x - tilt.x) * 0.05;
          tilt.y += (tiltTarget.y - tilt.y) * 0.05;
          mainGroup.rotation.x = base.x + tilt.x;
          mainGroup.rotation.y = base.y + tilt.y;
          renderer.render(scene, camera);
          frameId = requestAnimationFrame(tick);
        };
        tick();
      }

      const resizeObserver = new ResizeObserver(() => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        if (reducedMotion) renderFrame();
      });
      resizeObserver.observe(container);

      cleanup = () => {
        if (frameId !== null) cancelAnimationFrame(frameId);
        if (onPointerMove) window.removeEventListener("pointermove", onPointerMove);
        if (unsubscribeIntro) unsubscribeIntro();
        if (solveTimer !== null) window.clearTimeout(solveTimer);
        gsap.killTweensOf(pivot.rotation);
        resizeObserver.disconnect();
        geometry.dispose();
        edgeGeometry.dispose();
        edgeMat.dispose();
        Object.values(faceMats).forEach((m) => m.dispose());
        bodyMat.dispose();
        renderer.dispose();
        container.removeChild(renderer.domElement);
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [reducedMotion]);

  return <div ref={containerRef} className="h-full w-full" aria-hidden />;
}

import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../lib/useReducedMotion";

function readCssColor(varName: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return value || fallback;
}

/**
 * A quiet structural mark for the empty upper-right quadrant of the
 * Hero grid — thin wireframe edges in the current accent color over
 * near-transparent paper-toned faces. Deliberately not a Rubik's-cube
 * palette: it should read as precision/structure, not a toy.
 *
 * Three.js is dynamically imported so it never enters the main bundle
 * on devices where the cube isn't rendered (see the md-breakpoint gate
 * in Hero.tsx, which unmounts this component entirely below md).
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
      camera.position.set(1.7, 1.3, 2.6);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      const group = new THREE.Group();
      const size = 1.15;
      const geometry = new THREE.BoxGeometry(size, size, size);

      const faceMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(readCssColor("--color-paper-deep", "#e7dfcd")),
        transparent: true,
        opacity: 0.3,
      });
      group.add(new THREE.Mesh(geometry, faceMaterial));

      const edgesGeometry = new THREE.EdgesGeometry(geometry);
      const edgeMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(readCssColor("--color-accent", "#a9752c")),
      });
      group.add(new THREE.LineSegments(edgesGeometry, edgeMaterial));

      group.rotation.set(0.5, 0.6, 0);
      scene.add(group);

      const renderOnce = () => renderer.render(scene, camera);

      let frameId: number | null = null;

      if (reducedMotion) {
        renderOnce();
      } else {
        const tick = () => {
          group.rotation.x += 0.0022;
          group.rotation.y += 0.0032;
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
        if (reducedMotion) renderOnce();
      });
      resizeObserver.observe(container);

      cleanup = () => {
        if (frameId !== null) cancelAnimationFrame(frameId);
        resizeObserver.disconnect();
        geometry.dispose();
        edgesGeometry.dispose();
        faceMaterial.dispose();
        edgeMaterial.dispose();
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

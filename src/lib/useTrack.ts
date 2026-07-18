import { useState } from "react";

export type Track = "ai" | "fullstack";

/**
 * Reads `?track=` once on mount. No UI ever changes this: it is a
 * controlled, URL-only switch used to share a differently-ordered version
 * of the same page for specific applications, without a visible toggle and
 * without affecting the default (no param, or `?track=ai`) experience.
 */
export function useTrack(): Track {
  const [track] = useState<Track>(() => {
    if (typeof window === "undefined") return "ai";
    const param = new URLSearchParams(window.location.search).get("track");
    return param === "fullstack" ? "fullstack" : "ai";
  });

  return track;
}

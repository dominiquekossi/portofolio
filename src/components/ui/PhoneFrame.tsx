interface PhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
  /** "video" plays `src` muted/looped; falls back to `poster` when reducedMotion is on. */
  type?: "image" | "video";
  poster?: string;
  reducedMotion?: boolean;
}

/**
 * A CSS-only device silhouette, not a photorealistic mockup: an ink-colored
 * bezel, a rounded screen, and a small pill standing in for a notch/dynamic
 * island. Deliberately stops there — no side buttons, no volume rocker — to
 * stay in the editorial register of the rest of the site rather than read
 * as a generic marketing mockup.
 */
export function PhoneFrame({
  src,
  alt,
  className = "",
  type = "image",
  poster,
  reducedMotion = false,
}: PhoneFrameProps) {
  const playVideo = type === "video" && !reducedMotion;

  return (
    <div
      className={`relative aspect-414/896 bg-ink p-1.5 ${className}`}
      style={{ borderRadius: 20 }}
    >
      <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: 14 }}>
        {playVideo ? (
          <video
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            aria-label={alt}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <img
            src={type === "video" ? poster ?? src : src}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        )}
      </div>

      <span
        aria-hidden
        className="absolute left-1/2 top-1.5 -translate-x-1/2 rounded-full bg-ink"
        style={{ width: "22%", height: 4 }}
      />
    </div>
  );
}

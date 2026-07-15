import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  rule?: boolean;
  as?: "span" | "div";
}

export function Eyebrow({ children, className = "", rule = true, as = "span" }: EyebrowProps) {
  const Tag = as;
  return (
    <Tag className={`eyebrow ${rule ? "" : "eyebrow--no-rule"} ${className}`.trim()}>
      {children}
    </Tag>
  );
}

export interface CaseStudy {
  id: string;
  title: string;
  tag: string;
  description: string;
  stack: string[];
  href: string;
  image: string;
}

// Vite's `base` config only rewrites asset URLs it processes through HTML
// or import statements, not plain string literals, so these are prefixed
// by hand to survive a subpath deployment (e.g. GitHub Pages project pages).
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

/**
 * First entry renders as the large, wide card in FeaturedWork; the rest
 * stack in the narrower column. Order matters.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "build-in-amsterdam",
    title: "Build in Amsterdam",
    tag: "Pixel Fidelity",
    description:
      "A pixel-by-pixel rebuild of the Build in Amsterdam site, including every scroll interaction and motion sequence from the original. Built to test how close markup, layout, and animation timing can get to a real reference.",
    stack: ["React", "GSAP"],
    href: "https://dominiquekossi.github.io/buildinamsterdam-home/",
    image: asset("case-studies/build-in-amsterdam.webp"),
  },
  {
    id: "zentry",
    title: "Zentry",
    tag: "Motion & Interaction",
    description:
      "A recreation of Zentry's luxury visual language: layered GSAP timelines, scroll-synced motion, and Tailwind styling built to match the original's immersive, high-polish feel, including its animation curves.",
    stack: ["React (Vite)", "GSAP", "Tailwind CSS"],
    href: "https://sensational-cheesecake-c19e2b.netlify.app/",
    image: asset("case-studies/zentry.webp"),
  },
  {
    id: "taxajurospro",
    title: "TaxaJurosPro",
    tag: "Full-Stack Delivery",
    description:
      "A loan simulation and rate comparison platform built end to end, with real-time interactive calculators on top of a data layer that consumes official rates from Brazil's Central Bank.",
    stack: ["React / Next.js", "TypeScript", "Central Bank open data"],
    href: "https://www.taxajurospro.com.br/",
    image: asset("case-studies/taxajurospro.webp"),
  },
];

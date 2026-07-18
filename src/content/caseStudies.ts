import type { Bilingual } from "../lib/LanguageContext";

export interface CaseStudy {
  id: string;
  title: string;
  tag: Bilingual;
  description: Bilingual;
  stack: string[];
  href: string;
  /** Web screenshot. Omit for mobile-only projects that use `mobileHero` instead. */
  image?: string;
  /**
   * Primary visual for mobile-only projects with no web screenshot: a large
   * PhoneFrame (video or image) that replaces the `image` slot entirely.
   */
  mobileHero?: { type: "image" | "video"; src: string; poster?: string; alt: string };
  /**
   * Optional companion mobile app screenshots, each rendered inside a
   * smaller PhoneFrame beside/below the main visual. Omit for web-only case
   * studies (the default: nothing about them changes).
   */
  mobileImages?: { src: string; alt: string }[];
}

// Vite's `base` config only rewrites asset URLs it processes through HTML
// or import statements, not plain string literals, so these are prefixed
// by hand to survive a subpath deployment (e.g. GitHub Pages project pages).
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

/**
 * This array's order is only the fallback (used when FeaturedWork gets no
 * `order` prop, i.e. the `ai` track's own explicit order in App.tsx aside).
 * Every other track passes an explicit `order`, which also acts as a
 * filter, so an id listed here does not guarantee it renders anywhere (see
 * `kitecast`, kept here with real content but currently excluded from every
 * track's order until its repo is public again). `title` and `stack` are
 * not translated (a project name and its tech stack read the same in any
 * language); `tag` and `description` are.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "kitecast",
    title: "Kitecast",
    tag: { en: "Design System, Monorepo & React Native", pt: "Design System, Monorepo e React Native" },
    description: {
      en: "A personal monorepo pairing a shared design system with two independent apps: a Next.js web client and an Expo React Native mobile client. Design tokens, color logic, and product data are shared across both; UI implementation is deliberately platform-specific rather than forced into identical component code, since that rarely holds up in real cross-platform work.",
      pt: "Um monorepo pessoal que une um design system compartilhado a dois apps independentes: um cliente web em Next.js e um cliente mobile em Expo React Native. Tokens de design, lógica de cor e dados de produto são compartilhados entre os dois; a implementação de UI é propositalmente específica de cada plataforma, em vez de forçar o mesmo componente a servir os dois lados, o que raramente funciona bem num cenário real de cross-platform.",
    },
    stack: ["Turborepo", "Next.js", "Expo / React Native", "NativeWind"],
    href: "https://github.com/dominiquekossi/kitecast",
    image: asset("case-studies/kitecast-web.png"),
    mobileImages: [
      { src: asset("case-studies/kitecast-mobile-list.png"), alt: "Kitecast mobile app, spot list screen" },
      { src: asset("case-studies/kitecast-mobile-detail.png"), alt: "Kitecast mobile app, spot detail screen" },
    ],
  },
  {
    id: "financehub",
    title: "FinanceHub",
    tag: {
      en: "React Native, Real-Time Data & Design System",
      pt: "React Native, Dados em Tempo Real e Design System",
    },
    description: {
      en: "FinanceHub is a production-ready React Native fintech application that delivers real-time cryptocurrency and foreign exchange market data through a modern, scalable architecture. Built with Expo, TypeScript, React Query and a reusable design system, the project demonstrates production-grade mobile engineering practices with a strong focus on performance, accessibility, and maintainable code.",
      pt: "FinanceHub é um aplicativo fintech em React Native pronto para produção, entregando dados de mercado de criptomoedas e câmbio em tempo real através de uma arquitetura moderna e escalável. Construído com Expo, TypeScript, React Query e um design system reutilizável, o projeto demonstra práticas de engenharia mobile de nível de produção, com foco forte em performance, acessibilidade e código de fácil manutenção.",
    },
    stack: ["React Native", "Expo", "TypeScript", "React Query", "NativeWind"],
    href: "https://github.com/dominiquekossi/FinanceHub",
    mobileHero: {
      type: "video",
      src: asset("case-studies/financehub-home.mp4"),
      poster: asset("case-studies/financehub-home-poster.jpg"),
      alt: "FinanceHub app home screen, live market data scrolling",
    },
    mobileImages: [
      { src: asset("case-studies/home1.PNG"), alt: "FinanceHub home screen, market pulse and top movers" },
      { src: asset("case-studies/home2.PNG"), alt: "FinanceHub home screen, trending assets list" },
    ],
  },
  {
    id: "build-in-amsterdam",
    title: "Build in Amsterdam",
    tag: { en: "Pixel Fidelity", pt: "Fidelidade de Pixel" },
    description: {
      en: "A pixel-by-pixel rebuild of the Build in Amsterdam site, including every scroll interaction and motion sequence from the original. Built to test how close markup, layout, and animation timing can get to a real reference.",
      pt: "Uma reconstrução pixel a pixel do site da Build in Amsterdam, incluindo cada interação de scroll e sequência de movimento do original. Feito para testar o quão perto marcação, layout e timing de animação conseguem chegar de uma referência real.",
    },
    stack: ["React", "GSAP"],
    href: "https://dominiquekossi.github.io/buildinamsterdam-home/",
    image: asset("case-studies/build-in-amsterdam.webp"),
  },
  {
    id: "zentry",
    title: "Zentry",
    tag: { en: "Motion & Interaction", pt: "Motion e Interação" },
    description: {
      en: "A recreation of Zentry's luxury visual language: layered GSAP timelines, scroll-synced motion, and Tailwind styling built to match the original's immersive, high-polish feel, including its animation curves.",
      pt: "Uma recriação da linguagem visual de luxo da Zentry: timelines em camadas com GSAP, movimento sincronizado ao scroll e estilização com Tailwind, feitos para reproduzir a sensação imersiva e extremamente polida do original, incluindo suas curvas de animação.",
    },
    stack: ["React (Vite)", "GSAP", "Tailwind CSS"],
    href: "https://sensational-cheesecake-c19e2b.netlify.app/",
    image: asset("case-studies/zentry.webp"),
  },
  {
    id: "taxajurospro",
    title: "TaxaJurosPro",
    tag: { en: "Full-Stack Delivery", pt: "Entrega Full-Stack" },
    description: {
      en: "A loan simulation and rate comparison platform built end to end, with real-time interactive calculators on top of a data layer that consumes official rates from Brazil's Central Bank.",
      pt: "Uma plataforma de simulação de empréstimos e comparação de taxas construída de ponta a ponta, com calculadoras interativas em tempo real sobre uma camada de dados que consome taxas oficiais do Banco Central do Brasil.",
    },
    stack: ["React / Next.js", "TypeScript", "Central Bank open data"],
    href: "https://www.taxajurospro.com.br/",
    image: asset("case-studies/taxajurospro.webp"),
  },
];

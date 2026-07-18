import type { ComponentType } from "react";
import { Header } from "./components/chrome/Header";
import { CustomCursor } from "./components/chrome/CustomCursor";
import { Preloader } from "./components/chrome/Preloader";
import { Hero } from "./components/sections/Hero";
import { PromptingForPrecision } from "./components/sections/PromptingForPrecision";
import { FeaturedWork } from "./components/sections/FeaturedWork";
import { ProductionProjects } from "./components/sections/ProductionProjects";
import { OpenSource } from "./components/sections/OpenSource";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { useSmoothScroll } from "./lib/useSmoothScroll";
import { useTrack, type Track } from "./lib/useTrack";
import { LanguageProvider } from "./lib/LanguageContext";

type SectionKey = "hero" | "prompting" | "work" | "production" | "open-source" | "about" | "contact";

const SECTION_COMPONENTS: Record<SectionKey, ComponentType> = {
  hero: Hero,
  prompting: PromptingForPrecision,
  work: FeaturedWork,
  production: ProductionProjects,
  "open-source": OpenSource,
  about: About,
  contact: Contact,
};

/**
 * Section order per track. `ai` is the default, currently-live order and
 * must never change without an explicit decision to do so, it is actively
 * serving a real application. `fullstack` is a URL-only alternate order
 * (`?track=fullstack`) for other applications: Prompting for Precision moves
 * after Open Source, and Featured Work leads with different work (see
 * FEATURED_WORK_ORDER below).
 */
const SECTION_ORDER: Record<Track, SectionKey[]> = {
  ai: ["hero", "prompting", "work", "production", "open-source", "about", "contact"],
  fullstack: ["hero", "work", "production", "open-source", "prompting", "about", "contact"],
};

/**
 * Featured Work case study order per track, by id. `ai` has its own
 * explicit order and must never pick up a project still being staged for
 * `fullstack`. Kitecast's case study data stays in content/caseStudies.ts
 * (real content, ready to go) but is deliberately left out of every order
 * below while its repo is private, add "kitecast" back to `fullstack` once
 * it's public. A renamed "Relational Operations API (.NET)" case study is
 * still pending and not yet in content/caseStudies.ts; its id is reserved
 * here so it silently starts rendering once that entry is added, no other
 * change needed.
 */
const FEATURED_WORK_ORDER: Partial<Record<Track, string[]>> = {
  ai: ["build-in-amsterdam", "zentry", "taxajurospro"],
  fullstack: ["financehub", "relational-operations-api", "build-in-amsterdam"],
};

function App() {
  useSmoothScroll();
  const track = useTrack();
  const order = SECTION_ORDER[track];
  const featuredWorkOrder = FEATURED_WORK_ORDER[track];

  return (
    <LanguageProvider>
      <Preloader />
      <CustomCursor />
      <Header />
      <main>
        {order.map((key) => {
          if (key === "work") {
            return <FeaturedWork key={key} order={featuredWorkOrder} uniform={track === "fullstack"} />;
          }
          const Section = SECTION_COMPONENTS[key];
          return <Section key={key} />;
        })}
      </main>
    </LanguageProvider>
  );
}

export default App;

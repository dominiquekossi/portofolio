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

function App() {
  useSmoothScroll();

  return (
    <>
      <Preloader />
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <PromptingForPrecision />
        <FeaturedWork />
        <ProductionProjects />
        <OpenSource />
        <About />
        <Contact />
      </main>
    </>
  );
}

export default App;

import type { Bilingual } from "../lib/LanguageContext";

/**
 * Every piece of static (non-data-file) UI copy on the site, in both
 * languages, side by side per entry on purpose: keeping `en` and `pt` as
 * neighbors in the same object (rather than two parallel files) makes a
 * missing or stale translation visible at a glance instead of requiring a
 * cross-file diff. Section content that lives in its own data file
 * (case studies, production projects, open source packages) keeps its
 * bilingual fields there instead, right next to the rest of that item's data.
 */
export const copy = {
  cursor: {
    top: { en: "Top", pt: "Topo" } as Bilingual,
    viewWork: { en: "View work", pt: "Ver trabalho" } as Bilingual,
    email: { en: "Email", pt: "Email" } as Bilingual,
    linkedin: { en: "LinkedIn", pt: "LinkedIn" } as Bilingual,
    github: { en: "GitHub", pt: "GitHub" } as Bilingual,
    viewLive: { en: "View live", pt: "Ver ao vivo" } as Bilingual,
    viewRepo: { en: "View repo", pt: "Ver repositório" } as Bilingual,
    sayHi: { en: "Say hi", pt: "Manda um oi" } as Bilingual,
  },

  header: {
    work: { en: "Work", pt: "Trabalho" } as Bilingual,
    about: { en: "About", pt: "Sobre" } as Bilingual,
    sayHi: { en: "Say hi ↗", pt: "Manda um oi ↗" } as Bilingual,
  },

  preloader: {
    register: { en: "Register", pt: "Registrando" } as Bilingual,
    locked: { en: "Locked", pt: "Travado" } as Bilingual,
  },

  hero: {
    eyebrow: {
      en: "Full-Stack Software Engineer · Portfolio 2026",
      pt: "Engenheiro de Software Full-Stack · Portfólio 2026",
    } as Bilingual,
    lede: {
      en: "Full-Stack Software Engineer building software end to end, Node and .NET on the backend, React and motion-engineered interfaces on the front, all held to print-shop precision. I do my best work in fast-growing environments where the bar moves every week. That precision carries into the rest too: pixel-exact interface recreations used to train and evaluate AI models, AI-native tools of my own like an MCP orchestrator and a multi-provider LLM cost tracker, and instructions clear enough that a model, or a person, does exactly what you meant.",
      pt: "Engenheiro de Software Full-Stack, construo software de ponta a ponta: Node e .NET no backend, React e interfaces com motion no front, tudo com a mesma precisão de uma gráfica. Trabalho melhor em ambientes que crescem rápido, onde o nível sobe toda semana. Essa mesma precisão aparece no resto do trabalho também: recriações de interface pixel a pixel usadas para treinar e avaliar modelos de IA, ferramentas próprias e nativas de IA, como um orquestrador MCP e um rastreador de custo de LLM multi-provedor, além de instruções claras o bastante para que um modelo, ou uma pessoa, faça exatamente o que você quis dizer.",
    } as Bilingual,
    stackEyebrow: { en: "Stack I work in", pt: "Minha stack" } as Bilingual,
    viewTheWork: { en: "View the work", pt: "Ver o trabalho" } as Bilingual,
    ochre: { en: "Ochre", pt: "Ocre" } as Bilingual,
    ink: { en: "Ink", pt: "Tinta" } as Bilingual,
  },

  prompting: {
    eyebrow: { en: "Prompting for Precision", pt: "Prompt com Precisão" } as Bilingual,
    heading: {
      en: "Precise enough to reproduce exact behavior, not to generate images.",
      pt: "Precisos o bastante para reproduzir um comportamento exato, não para gerar imagens.",
    } as Bilingual,
    lede: {
      en: "Most of my work with AI is not about generating images. It is about writing instructions precise enough for a model to reproduce exact visual and motion behavior, then evaluating and refining the result until it matches the reference. That discipline comes from building golden-standard frontend implementations used to train and evaluate AI models: the same precision, applied to the tools themselves.",
      pt: "Boa parte do meu trabalho com IA não é sobre gerar imagens. É sobre escrever instruções precisas o bastante para um modelo reproduzir um comportamento visual e de movimento exato, e depois avaliar e refinar o resultado até bater com a referência. Essa disciplina vem de construir implementações de frontend padrão-ouro, usadas para treinar e avaliar modelos de IA: a mesma precisão, aplicada às próprias ferramentas.",
    } as Bilingual,
    specifyingMotion: { en: "Specifying motion", pt: "Especificando movimento" } as Bilingual,
    vaguePromptLabel: { en: "Vague prompt", pt: "Prompt vago" } as Bilingual,
    precisePromptLabel: { en: "Precise prompt", pt: "Prompt preciso" } as Bilingual,
    vaguePromptText: {
      en: "Make the cards fade in when you scroll to them.",
      pt: "Faz os cards aparecerem suavemente quando rolar até eles.",
    } as Bilingual,
    precisePromptText: {
      en: "Fade each card from 0 to full opacity and move it 32px upward over 900ms, eased on a power3 out curve. Stagger siblings by 80ms. Trigger when the element's top edge crosses 85% of the viewport height, not on page load and not at a fixed scroll offset.",
      pt: "Anima cada card de opacidade 0 até 100%, deslocando 32px para cima em 900ms, com curva de easing power3 out. Escalona os cards vizinhos em 80ms cada. Dispara quando a borda superior do elemento cruza 85% da altura da viewport, nunca no carregamento da página nem num ponto fixo de rolagem.",
    } as Bilingual,
    fromBuildingThisSite: { en: "From building this site", pt: "Construindo este site" } as Bilingual,
    promptLabel: { en: "Prompt", pt: "Prompt" } as Bilingual,
    riskLabel: { en: "Risk / critique", pt: "Risco / crítica" } as Bilingual,
    resultLabel: { en: "Result", pt: "Resultado" } as Bilingual,
    caseStudies: [
      {
        label: { en: "The Hero cube", pt: "O cubo do Hero" } as Bilingual,
        prompt: {
          en: "The initial ask was simple: add a rotating 3D object to the Hero.",
          pt: "O pedido inicial era simples: adicionar um objeto 3D girando no Hero.",
        } as Bilingual,
        risk: {
          en: "A rotating cube pulls straight toward the six-color Rubik's toy, and those colors, blue in particular, would break the locked ochre-on-paper palette on sight. The first pass overcorrected into a bare wireframe, which read as safe but said nothing.",
          pt: "Um cubo girando puxa direto para o brinquedo de seis cores do cubo mágico, e essas cores, o azul principalmente, quebrariam a paleta travada de ocre sobre papel na hora. A primeira tentativa corrigiu demais e virou um wireframe vazio, que parecia seguro mas não dizia nada.",
        } as Bilingual,
        result: {
          en: "The cube above is the second pass: a 3x3 that starts scrambled and solves itself, rendered only in the site's own plates, ochre, ink, and paper tones, never toy colors. The self-solve turns chaos into order, the same thesis as the registration lock in the entrance.",
          pt: "O cubo acima é a segunda tentativa: um 3x3 que começa embaralhado e se resolve sozinho, renderizado só com as cores do próprio site, tons de ocre, tinta e papel, nunca cores de brinquedo. Ele se resolver sozinho transforma caos em ordem, a mesma ideia do travamento de registro na entrada do site.",
        } as Bilingual,
      },
      {
        label: { en: "The accent color", pt: "A cor de destaque" } as Bilingual,
        prompt: {
          en: "Generate three candidate accent colors for a paper and ink editorial palette.",
          pt: "Gerar três cores de destaque candidatas para uma paleta editorial de papel e tinta.",
        } as Bilingual,
        risk: {
          en: "One candidate leaned toward the blue most portfolio sites default to. Another sat close to the warm terracotta that currently reads as a generic AI-generated design tell. Both were rejected on sight, not on preference, because either would undercut the point of a distinctive palette.",
          pt: "Uma candidata puxava para o azul que a maioria dos sites de portfólio usa por padrão. Outra ficava perto do terracota quente que hoje é praticamente uma marca registrada de design gerado por IA. As duas foram descartadas na hora, não por preferência, mas porque qualquer uma delas enfraqueceria o propósito de ter uma paleta com identidade própria.",
        } as Bilingual,
        result: {
          en: "The ochre gold used throughout this site, in the headline emphasis, the cube's edges, every link underline, was the third option: warm enough to feel print shop rather than tech startup, specific enough to not read as a template default.",
          pt: "O dourado ocre usado em todo o site, no destaque dos títulos, nas arestas do cubo, no sublinhado de cada link, foi a terceira opção: quente o bastante para parecer gráfica de bairro em vez de startup de tecnologia, e específico o bastante para não parecer o padrão de um template.",
        } as Bilingual,
      },
    ],
  },

  featuredWork: {
    eyebrow: { en: "Featured Work", pt: "Trabalhos em Destaque" } as Bilingual,
    heading: {
      en: "Recreated at pixel level, shipped at production level.",
      pt: "Recriado pixel a pixel, entregue em nível de produção.",
    } as Bilingual,
  },

  caseStudy: {
    viewLive: { en: "View live ↗", pt: "Ver ao vivo ↗" } as Bilingual,
    imageAlt: (title: string): Bilingual => ({
      en: `${title} interface screenshot`,
      pt: `Captura de tela da interface do ${title}`,
    }),
  },

  productionProjects: {
    eyebrow: { en: "Production Projects", pt: "Projetos em Produção" } as Bilingual,
    heading: {
      en: "Built end to end, running in production.",
      pt: "Construído de ponta a ponta, rodando em produção.",
    } as Bilingual,
  },

  openSource: {
    eyebrow: { en: "Open Source", pt: "Open Source" } as Bilingual,
    heading: {
      en: "Six packages, maintained in the open.",
      pt: "Seis pacotes, mantidos em código aberto.",
    } as Bilingual,
    viewOnGithub: { en: "View on GitHub ↗", pt: "Ver no GitHub ↗" } as Bilingual,
  },

  about: {
    eyebrow: { en: "About", pt: "Sobre" } as Bilingual,
    heading: { en: "Precision is the job.", pt: "Precisão é o trabalho." } as Bilingual,
    facts: [
      {
        label: { en: "Role", pt: "Cargo" } as Bilingual,
        value: {
          en: "Full-Stack Software Engineer",
          pt: "Engenheiro de Software Full-Stack",
        } as Bilingual,
      },
      {
        label: { en: "Backend", pt: "Backend" } as Bilingual,
        value: { en: "Node.js · .NET / C# · REST APIs", pt: "Node.js · .NET / C# · REST APIs" } as Bilingual,
      },
      {
        label: { en: "Frontend", pt: "Frontend" } as Bilingual,
        value: {
          en: "React · Next.js · TypeScript · React Native",
          pt: "React · Next.js · TypeScript · React Native",
        } as Bilingual,
      },
      {
        label: { en: "Motion", pt: "Animação" } as Bilingual,
        value: { en: "GSAP · Three.js", pt: "GSAP · Three.js" } as Bilingual,
      },
      {
        label: { en: "Testing", pt: "Testes" } as Bilingual,
        value: { en: "Playwright · Jest · Vitest", pt: "Playwright · Jest · Vitest" } as Bilingual,
      },
    ],
    paragraphs: [
      {
        en: "I'm Kossi Houessou, a full-stack software engineer. I build across the whole stack, Node and .NET services on the back, React and motion-engineered interfaces on the front. A lot of that work is golden-standard: pixel-precise recreations of production interfaces used to train, evaluate, and benchmark AI models, where the tolerance for drift from a real, shipped brief is zero.",
        pt: "Sou Kossi Houessou, engenheiro de software full-stack. Construo em toda a stack: serviços em Node e .NET no back, interfaces com motion em React no front. Boa parte desse trabalho é padrão-ouro: recriações pixel-perfeitas de interfaces em produção, usadas para treinar, avaliar e comparar modelos de IA, onde a tolerância para desvio de um briefing real e já lançado é zero.",
      } as Bilingual,
      {
        en: "On the backend that means Node.js and .NET with C#, REST APIs, and the data access behind them. On the front it's React, Next.js, React Native, and TypeScript, with GSAP and Three.js for motion. Playwright, Jest, and Vitest cover the parts of a build that shouldn't depend on me noticing a regression by eye.",
        pt: "No backend isso significa Node.js e .NET com C#, APIs REST e o acesso a dados por trás delas. No front é React, Next.js, React Native e TypeScript, com GSAP e Three.js para motion. Playwright, Jest e Vitest cobrem as partes de um build que não deveriam depender de eu notar uma regressão a olho nu.",
      } as Bilingual,
      {
        en: "Prompt engineering shows up in this work even when it isn't labeled that way. The specs I write to guide tools like Claude Code and Cursor toward production-quality output follow the same logic as the training and evaluation material I build for AI models. Precision and structure in the instruction is what determines the quality of what comes back.",
        pt: "Engenharia de prompt aparece nesse trabalho mesmo quando não tem esse nome. As specs que escrevo para guiar ferramentas como Claude Code e Cursor até um resultado de qualidade de produção seguem a mesma lógica do material de treino e avaliação que construo para modelos de IA. Precisão e estrutura na instrução é o que determina a qualidade do que volta.",
      } as Bilingual,
      {
        en: "Visual QA happens while I build, not after it. A five-pixel drift or a hundred-millisecond mistiming is exactly the kind of thing this work exists to catch, so it gets caught early.",
        pt: "QA visual acontece enquanto eu construo, não depois. Um desvio de cinco pixels ou um erro de cem milissegundos no timing é exatamente o tipo de coisa que esse trabalho existe para pegar, então isso é pego cedo.",
      } as Bilingual,
    ],
  },

  contact: {
    eyebrow: { en: "Contact", pt: "Contato" } as Bilingual,
    heading: { en: "Say hello.", pt: "Diga olá." } as Bilingual,
    backToTop: { en: "Back to top ↑", pt: "Voltar ao topo ↑" } as Bilingual,
  },
};

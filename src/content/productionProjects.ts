import type { Bilingual } from "../lib/LanguageContext";

export interface ProductionProject {
  id: string;
  title: Bilingual;
  description: Bilingual;
  stack: string[];
}

/**
 * Placeholder-level detail: only "analytics dashboard" and ".NET API"
 * were named in the brief, with no stack specifics or descriptions.
 * Kept intentionally generic rather than inventing false specifics.
 * Needs real detail (metrics, stack, optional link) before this ships.
 */
export const productionProjects: ProductionProject[] = [
  {
    id: "analytics-dashboard",
    title: { en: "Analytics Dashboard", pt: "Painel de Analytics" },
    description: {
      en: "A real-time analytics dashboard for monitoring product usage and performance metrics, built for clarity across dense, high-frequency data.",
      pt: "Um painel de analytics em tempo real para monitorar uso do produto e métricas de performance, feito para manter clareza mesmo com dados densos e de alta frequência.",
    },
    stack: ["React", "TypeScript", "Data visualization"],
  },
  {
    id: "dotnet-api",
    title: { en: ".NET API", pt: ".NET API" },
    description: {
      en: "A .NET Web API providing authentication, data access, and business logic for a production application, built and maintained alongside its frontend.",
      pt: "Uma Web API em .NET responsável por autenticação, acesso a dados e regras de negócio de uma aplicação em produção, construída e mantida junto com seu frontend.",
    },
    stack: [".NET", "C#", "REST"],
  },
];

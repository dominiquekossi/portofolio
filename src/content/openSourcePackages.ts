import type { Bilingual } from "../lib/LanguageContext";

export interface OpenSourcePackage {
  id: string;
  name: string;
  description: Bilingual;
  href: string;
}

/**
 * GitHub links assume the dominiquekossi account (confirmed from the
 * Build in Amsterdam GitHub Pages URL used in FeaturedWork) and a repo
 * slug matching the npm package name exactly. Verify each of the six
 * before shipping, in case any repo is named differently. `name` is the
 * literal npm package name and is not translated.
 */
export const openSourcePackages: OpenSourcePackage[] = [
  {
    id: "cors-diagnoser",
    name: "cors-diagnoser",
    description: {
      en: "Automated CORS diagnostics with security recommendations.",
      pt: "Diagnóstico automatizado de CORS com recomendações de segurança.",
    },
    href: "https://github.com/dominiquekossi/cors-diagnoser",
  },
  {
    id: "llm-cost-tracker",
    name: "llm-cost-tracker",
    description: {
      en: "Usage and cost tracking across multiple LLM APIs.",
      pt: "Rastreamento de uso e custo entre múltiplas APIs de LLM.",
    },
    href: "https://github.com/dominiquekossi/llm-cost-tracker",
  },
  {
    id: "tanstack-api-generator",
    name: "tanstack-api-generator",
    description: {
      en: "Automated code generation for TanStack Query v5+.",
      pt: "Geração automatizada de código para TanStack Query v5+.",
    },
    href: "https://github.com/dominiquekossi/tanstack-api-generator",
  },
  {
    id: "json-to-toon-encoder-decoder",
    name: "json-to-toon-encoder-decoder",
    description: {
      en: "JSON to toon AI token encoder/decoder, also available as an MCP server.",
      pt: "Codificador/decodificador de tokens de IA de JSON para toon, também disponível como servidor MCP.",
    },
    href: "https://github.com/dominiquekossi/json-to-toon-encoder-decoder",
  },
  {
    id: "signal-status-js",
    name: "signal-status-js",
    description: {
      en: "Network and system connectivity monitoring.",
      pt: "Monitoramento de conectividade de rede e sistema.",
    },
    href: "https://github.com/dominiquekossi/signal-status-js",
  },
  {
    id: "mcp-agent-kit",
    name: "mcp-agent-kit",
    description: {
      en: "AI agent orchestration over the Model Context Protocol.",
      pt: "Orquestração de agentes de IA sobre o Model Context Protocol.",
    },
    href: "https://github.com/dominiquekossi/mcp-agent-kit",
  },
];

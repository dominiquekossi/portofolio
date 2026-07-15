export interface OpenSourcePackage {
  id: string;
  name: string;
  description: string;
  href: string;
}

/**
 * GitHub links assume the dominiquekossi account (confirmed from the
 * Build in Amsterdam GitHub Pages URL used in FeaturedWork) and a repo
 * slug matching the npm package name exactly. Verify each of the six
 * before shipping, in case any repo is named differently.
 */
export const openSourcePackages: OpenSourcePackage[] = [
  {
    id: "cors-diagnoser",
    name: "cors-diagnoser",
    description: "Automated CORS diagnostics with security recommendations.",
    href: "https://github.com/dominiquekossi/cors-diagnoser",
  },
  {
    id: "llm-cost-tracker",
    name: "llm-cost-tracker",
    description: "Usage and cost tracking across multiple LLM APIs.",
    href: "https://github.com/dominiquekossi/llm-cost-tracker",
  },
  {
    id: "tanstack-api-generator",
    name: "tanstack-api-generator",
    description: "Automated code generation for TanStack Query v5+.",
    href: "https://github.com/dominiquekossi/tanstack-api-generator",
  },
  {
    id: "json-to-toon-encoder-decoder",
    name: "json-to-toon-encoder-decoder",
    description: "JSON to toon AI token encoder/decoder, also available as an MCP server.",
    href: "https://github.com/dominiquekossi/json-to-toon-encoder-decoder",
  },
  {
    id: "signal-status-js",
    name: "signal-status-js",
    description: "Network and system connectivity monitoring.",
    href: "https://github.com/dominiquekossi/signal-status-js",
  },
  {
    id: "mcp-agent-kit",
    name: "mcp-agent-kit",
    description: "AI agent orchestration over the Model Context Protocol.",
    href: "https://github.com/dominiquekossi/mcp-agent-kit",
  },
];

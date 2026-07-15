export interface ProductionProject {
  id: string;
  title: string;
  description: string;
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
    title: "Analytics Dashboard",
    description:
      "A real-time analytics dashboard for monitoring product usage and performance metrics, built for clarity across dense, high-frequency data.",
    stack: ["React", "TypeScript", "Data visualization"],
  },
  {
    id: "dotnet-api",
    title: ".NET API",
    description:
      "A .NET Web API providing authentication, data access, and business logic for a production application, built and maintained alongside its frontend.",
    stack: [".NET", "C#", "REST"],
  },
];

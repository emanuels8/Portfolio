export type Keyword = {
  position: [number, number, number];
  color: string;
  text: string;
  size: number;
  speed: number;
};

export const leftKeywords: Keyword[] = [
  {
    position: [0, 5.5, 0],
    color: "#0d9488",
    text: "Cloud",
    size: 0.5,
    speed: 0.8,
  },
  {
    position: [0, 3.8, 0],
    color: "#1e3a5f",
    text: "Next.js",
    size: 0.5,
    speed: 0.7,
  },
  {
    position: [0, 2.1, 0],
    color: "#2563eb",
    text: "Scale",
    size: 0.5,
    speed: 0.9,
  },
  {
    position: [0, 0.4, 0],
    color: "#115e59",
    text: "Kubernetes",
    size: 0.4,
    speed: 0.75,
  },
  {
    position: [0, -1.3, 0],
    color: "#0891b2",
    text: "Docker",
    size: 0.5,
    speed: 0.85,
  },
  {
    position: [0, -3.0, 0],
    color: "#0f766e",
    text: "React",
    size: 0.5,
    speed: 0.7,
  },
  {
    position: [0, -4.7, 0],
    color: "#1d4ed8",
    text: "TypeScript",
    size: 0.4,
    speed: 0.8,
  },
  {
    position: [0, -6.4, 0],
    color: "#334155",
    text: "CI/CD",
    size: 0.5,
    speed: 0.75,
  },
];

// Right panel keywords — straight vertical column
export const rightKeywords: Keyword[] = [
  {
    position: [0, 5.5, 0],
    color: "#164e63",
    text: "Systems",
    size: 0.5,
    speed: 0.8,
  },
  {
    position: [0, 3.8, 0],
    color: "#0e7490",
    text: "API",
    size: 0.5,
    speed: 0.7,
  },
  {
    position: [0, 2.1, 0],
    color: "#1e3a5f",
    text: "Go",
    size: 0.5,
    speed: 0.9,
  },
  {
    position: [0, 0.4, 0],
    color: "#475569",
    text: "Terraform",
    size: 0.4,
    speed: 0.75,
  },
  {
    position: [0, -1.3, 0],
    color: "#0d9488",
    text: "Observability",
    size: 0.35,
    speed: 0.7,
  },
  {
    position: [0, -3.0, 0],
    color: "#1e40af",
    text: "Microservices",
    size: 0.35,
    speed: 0.85,
  },
  {
    position: [0, -4.7, 0],
    color: "#0891b2",
    text: "gRPC",
    size: 0.5,
    speed: 0.75,
  },
  {
    position: [0, -6.4, 0],
    color: "#134e4a",
    text: "AWS",
    size: 0.5,
    speed: 0.8,
  },
];

// Combined for backward compat
export const keywords: Keyword[] = [...leftKeywords, ...rightKeywords];

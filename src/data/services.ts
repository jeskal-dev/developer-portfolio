export interface Service {
  id: string;
  icon: string;
  stack: string[];
  titleKey: string;
  descKey: string;
}

export const services: Service[] = [
  {
    id: "web-app",
    icon: "web",
    stack: ["React", "Astro", "NestJS"],
    titleKey: "services.title1",
    descKey: "services.desc1",
  },
  {
    id: "desktop-app",
    icon: "desktop",
    stack: ["Rust", "Tauri", "Tokio"],
    titleKey: "services.title2",
    descKey: "services.desc2",
  },
  {
    id: "enterprise-backend",
    icon: "server",
    stack: ["Java", "Spring Boot", "PostgreSQL"],
    titleKey: "services.title3",
    descKey: "services.desc3",
  },
];

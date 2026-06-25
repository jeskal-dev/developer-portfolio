export interface SkillTech {
  name: string;
  descriptionKey: string;
  proficiency?: number;
}
export interface SkillEcosystem {
  id: string;
  name: string;
  levelKey: string;
  tech: SkillTech[];
  accent: "primary" | "success" | "warning";
}

export const skills: SkillEcosystem[] = [
  {
    id: "typescript",
    name: "TypeScript Ecosystem",
    levelKey: "skills.levelExpert",
    accent: "primary",
    tech: [
      {
        name: "React",
        descriptionKey: "skills.tech.react",
        proficiency: 95,
      },
      {
        name: "Astro",
        descriptionKey: "skills.tech.astro",
        proficiency: 90,
      },
      {
        name: "NestJS",
        descriptionKey: "skills.tech.nestjs",
        proficiency: 88,
      },
      {
        name: "TanStack Start",
        descriptionKey: "skills.tech.tanstack",
        proficiency: 78,
      },
      {
        name: "Express",
        descriptionKey: "skills.tech.express",
        proficiency: 92,
      },
    ],
  },
  {
    id: "rust",
    name: "Rust Ecosystem",
    levelKey: "skills.levelAdvanced",
    accent: "success",
    tech: [
      {
        name: "Tauri",
        descriptionKey: "skills.tech.tauri",
        proficiency: 82,
      },
      {
        name: "Tokio",
        descriptionKey: "skills.tech.tokio",
        proficiency: 75,
      },
      {
        name: "Serde",
        descriptionKey: "skills.tech.serde",
        proficiency: 80,
      },
    ],
  },
  {
    id: "java",
    name: "Java Ecosystem",
    levelKey: "skills.levelAdvanced",
    accent: "warning",
    tech: [
      {
        name: "Spring Boot",
        descriptionKey: "skills.tech.springboot",
        proficiency: 85,
      },
      {
        name: "Maven",
        descriptionKey: "skills.tech.maven",
        proficiency: 80,
      },
      {
        name: "Hibernate",
        descriptionKey: "skills.tech.hibernate",
        proficiency: 78,
      },
    ],
  },
];

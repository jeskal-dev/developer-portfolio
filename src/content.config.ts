import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    locale: z.string(),
    title: z.string(),
    code: z.string(),
    solutionType: z.string(),
    stack: z.array(z.string()),
    featured: z.boolean().default(false),
    date: z.coerce.date(),
    coverImage: z.string().default("/images/placeholder-cover.svg"),
    problem: z.string(),
    solution: z.string(),
    results: z.string(),
    client: z.string().optional(),
    duration: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    seoDescription: z.string().optional(),
  }),
});

export const collections = { projects };

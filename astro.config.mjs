// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import mermaid from "astro-mermaid";
import { unified } from "@astrojs/markdown-remark";

const SITE_URL = "http://localhost:4321";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [
    mdx(),
    mermaid({
      theme: "base",
      autoTheme: true,
      mermaidConfig: {
        themeVariables: {
          fontFamily: '"Inter Variable", Inter, system-ui, sans-serif',
          fontSize: "14px",
        },
        flowchart: {
          curve: "basis",
          padding: 15,
        },
      },
    }),
    react(),
    sitemap(),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
    fallback: {
      es: "en",
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url),
        ),
        "@data": fileURLToPath(new URL("./src/data", import.meta.url)),
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@i18n": fileURLToPath(new URL("./src/i18n", import.meta.url)),
      },
    },
  },
  build: { inlineStylesheets: "auto" },
  markdown: {
    processor: unified(),
    shikiConfig: {
      theme: "github-dark",
      wrap: false,
    },
  },
});

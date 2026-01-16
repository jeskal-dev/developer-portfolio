// @ts-check
import { defineConfig } from "astro/config";
// @ts-ignore
import path from "node:path";
// @ts-ignore
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";

import svelte from "@astrojs/svelte";

import preact from "@astrojs/preact";

// @ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@/styles": path.resolve(__dirname, "./src/styles"),
        "@/svelte": path.resolve(__dirname, "./src/components/islands/svelte"),
        "@/layouts": path.resolve(__dirname, "./src/components/layouts"),
        "@/components": path.resolve(__dirname, "./src/components"),
        "@/stores": path.resolve(__dirname, "./src/stores"),
        "@/helpers": path.resolve(__dirname, "./src/helpers"),
        "@lucide/preact": "lucide-preact",
        react: "preact/compat",
        "react-dom": "preact/compat",
      },
    },
  },

  integrations: [svelte(), preact({ compat: true })],
});

/**
 * 📝 CONFIGURACIÓN PRINCIPAL DEL SITIO
 * ──────────────────────────────────────────────────────────────
 * Cambia estos valores por tus datos reales.
 * Todos los elementos hardcodeados del sitio viven aquí o en
 * archivos dentro de `/src/data/`.
 */

export interface SiteConfig {
  name: string;
  shortName: string;
  author: string;
  email: string;
  url: string;
  cvUrl?: string;
  primaryStack: string[];
}

export const siteConfig: SiteConfig = {
  name: "DevPortfolio",
  shortName: "Portfolio",
  author: "Tu Nombre",
  email: "hello@tudominio.com",
  url: "https://your-portfolio.example.com",
  cvUrl: "/cv.pdf",
  primaryStack: ["TypeScript", "Rust", "Java"],
};

# 🚀 Portafolio de Desarrollador — Astro + Tailwind

Portafolio web personal orientado a captar clientes freelance y startups tecnológicas.
Construido con Astro (SSG), TypeScript, Tailwind CSS y React (para islas interactivas).

Implementa fielmente el sistema de diseño **Cut Corners** descrito en `DESIGN.md`.

---

## ⚙️ Stack

- **Framework principal:** Astro 4.x (SSG)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS + tokens CSS nativos (OKLCH)
- **Islas interactivas:** React 18 (Theme Toggle, Skills Board)
- **Contenido:** Content Collections + MDX
- **SEO:** `@astrojs/sitemap` + Open Graph + Twitter Cards + canonical
- **Transiciones:** View Transitions API nativa de Astro

---

## 📁 Estructura del Proyecto

```text
portfolio/
├── astro.config.mjs          ← Configuración Astro + alias Vite + SITE_URL
├── tailwind.config.mjs       ← Tokens OKLCH mapeados a Tailwind
├── tsconfig.json             ← Alias @data, @components, @layouts, @styles
│
├── public/
│   └── favicon.svg           ← Favicon SVG con cut-corner
│
└── src/
    ├── components/
    │   ├── layout/           ← Header, Footer, SEO
    │   ├── home/             ← Hero, Services, FeaturedProjects, SkillsBoard
    │   ├── projects/         ← (futuro)
    │   ├── contact/          ← ContactSection
    │   └── ui/               ← Card, Button, Badge, Icon, ThemeToggle
    │
    ├── content/
    │   ├── config.ts         ← Schema de proyectos (Zod)
    │   └── proyectos/        ← Casos de estudio en MDX (4 placeholders)
    │
    ├── data/                 ← 🔴 TODOS LOS VALORES EDITABLES AQUÍ
    │   ├── site.ts           ← Nombre, email, hero, CV, URL producción
    │   ├── nav.ts            ← Items de navegación
    │   ├── social.ts         ← GitHub, LinkedIn, X
    │   ├── services.ts       ← Tipos de solución (Web, Desktop, Backend)
    │   ├── skills.ts         ← Habilidades por ecosistema
    │   └── demos.ts          ← Enlaces a demos Tauri descargables
    │
    ├── layouts/
    │   └── BaseLayout.astro  ← HTML raíz + SEO + View Transitions + anti-flash
    │
    ├── pages/
    │   ├── index.astro       ← Home
    │   ├── 404.astro
    │   └── proyectos/
    │       ├── index.astro   ← Listado por tipo de solución
    │       └── [slug].astro  ← Caso de estudio dinámico
    │
    └── styles/
        └── global.css        ← Tokens OKLCH + clases geom-cut-* + utilidades
```

---

## 🔴 Dónde cambiar los valores hardcodeados

**TODOS los datos editables viven en `/src/data/`. No necesitas tocar componentes para reemplazar valores:**

| Archivo                       | Qué controlar                                            |
| ----------------------------- | -------------------------------------------------------- |
| `src/data/site.ts`            | Tu nombre, email, CV, URL de producción, textos del hero |
| `src/data/social.ts`          | Tus URLs de GitHub, LinkedIn, X                          |
| `src/data/nav.ts`             | Items del menú de navegación                             |
| `src/data/services.ts`        | Tipos de solución que ofreces                            |
| `src/data/skills.ts`          | Tu stack técnico por ecosistema                          |
| `src/data/demos.ts`           | Enlaces a demos Tauri (o cualquier otra demo)            |
| `astro.config.mjs`            | `SITE_URL` (línea 10) — tu dominio de producción         |
| `src/content/proyectos/*.mdx` | Casos de estudio (uno por archivo)                       |

---

## 🎨 Sistema de Diseño — Cut Corners

Implementado estrictamente según `DESIGN.md`:

- **Colores:** exclusivamente OKLCH (cero hexadecimales, cero RGB).
- **Geometría:** clases `.geom-cut-sm/md/lg` con `clip-path` diagonal opuesto (Top-Right + Bottom-Left).
- **Botones CTA:** corte direccional simple (Bottom-Right) para sugerir avance.
- **Inputs:** `border-radius: var(--radius-soft)` — **sin** `clip-path` (Regla 2).
- **Sombras:** patrón Wrapper + Inner (`filter: drop-shadow` en wrapper porque `clip-path` destruye `box-shadow`).
- **Dark mode por defecto.** Toggle persiste en `localStorage('theme')`. Script anti-flash inline en `<head>`.

### Tokens disponibles

```css
--background, --card, --card-hover
--text-primary, --text-secondary, --text-disabled
--border-default, --border-focus
--accent-primary (azul), --accent-success (verde), --accent-warning (ámbar), --accent-danger (coral)
--radius-soft (12px), --cut-size-sm (8px), --cut-size-md (16px), --cut-size-lg (24px)
```

---

## 🧩 Comandos

```bash
npm install      # instalar dependencias
npm run dev      # arrancar dev server en http://localhost:4321
npm run build    # build estático a /dist
npm run preview  # previsualizar build de producción
```

---

## 📝 Cómo añadir un nuevo proyecto

Crea un archivo `.mdx` en `src/content/proyectos/`. El nombre del archivo será el slug de la URL
(`/proyectos/<filename>/`).

```mdx
---
title: "Mi nuevo proyecto"
tipoSolucion: "Aplicacion Web" # debe coincidir con un services[].id
stack: ["React", "NestJS"]
destacado: false # true para mostrarlo en el home
fecha: 2025-01-15
cliente: "Nombre del cliente"
duracion: "2 meses"
problema: "Contexto del cliente y dolor a resolver."
solucion: "Qué construiste y cómo."
resultados: "Métricas concretas (+40%, -90%, etc.)."
seoDescription: "Descripción corta para SEO."
---

## Contexto del Cliente

Contenido MDX libre aquí. Puedes usar bloques de código, listas, blockquotes, etc.

> ⚠️ Evita usar `<` literal en el cuerpo del MDX (MDX lo parsea como JSX).
> Usa `&lt;` en su lugar, o reformula la frase.
```

---

## 🌗 Tema (Dark/Light)

- Dark mode por defecto (especificación SPEC §4).
- Persistencia en `localStorage('theme')`.
- Script anti-flash en `<head>` para evitar FOUC.
- Light mode override con `[data-theme='light']` en `global.css`.

---

## 📊 SEO

- `sitemap-index.xml` generado automáticamente en build.
- Open Graph + Twitter Cards en todas las páginas.
- `canonical` por página.
- HTML semántico (`<header>`, `<main>`, `<footer>`, `<article>`, `<nav>`, `<section>`, `<time>`).
- Override de SEO por proyecto vía frontmatter (`seoDescription`).

**Antes de desplegar:**

1. Cambia `SITE_URL` en `astro.config.mjs`.
2. Crea `/public/og-default.png` (1200×630 recomendado).
3. Sube tu CV a `/public/cv.pdf` y actualiza `cvUrl` en `src/data/site.ts`.

---

## 📈 Analíticas (preparado, no implementado)

El `BaseLayout.astro` incluye un placeholder que lee `PUBLIC_ANALYTICS_PROVIDER` de variables de entorno.
Para activar analytics (Vercel Analytics, Plausible, etc.), crea un `.env`:

```bash
PUBLIC_ANALYTICS_PROVIDER=plausible  # o vercel
```

E implementa la inyección del script según el proveedor elegido.

---

## 🚢 Despliegue

El sitio es 100% estático. Compatible con:

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages

Solo apunta el build a `npm run build` y el output a `/dist`.

# Spec del Portafolio de Desarrollador (v1.0)

## 1. Resumen Ejecutivo

Portafolio web personal orientado a captar clientes freelance y startups tecnológicas. El sitio destacará las habilidades del desarrollador Fullstack (TypeScript, Rust/Tauri, Java/Spring Boot) mediante casos de estudio detallados y organizados por tipo de solución. La arquitectura base será estática (SSG) priorizando SEO, rendimiento y tiempos de carga ultrarrápidos.

## 2. Objetivos y Audiencia

- **Audiencia Principal:** Startups tecnológicas, clientes potenciales freelance, reclutadores técnicos.
- **Objetivo Principal:** Conseguir empleo freelance.
- **Call to Action (CTA) Principal:** Enviar un email de contacto directo.
- **CTAs Secundarios:** Descargar CV, ir al perfil de GitHub/LinkedIn.

## 3. Stack Tecnológico

- **Framework Principal:** Astro (Generación de Sitios Estáticos - SSG).
- **Lenguaje:** TypeScript.
- **Interactividad (Islas):** React o Svelte (para el tablero de habilidades, toggle de tema y animaciones). _Nota: Elegir uno para mantener el bundle ligero._
- **Estilos:** Definido en `design.md` (Se asume Tailwind CSS o CSS nativo modular).
- **Gestión de Contenido:** Contenido hardcodeado en formato Markdown/MDX y archivos TypeScript con placeholders. Diseñado para escalar a un CMS/DB en el futuro.
- **Animaciones:** View Transitions API nativa de Astro o Framer Motion (en islas) para transiciones suaves de página y elementos.

## 4. Diseño y UX

- **Referencia de Diseño:** Este spec está subordinado al documento **`design.md`**. Cualquier regla de color, tipografía, espaciado o layout debe ser extraída de dicho archivo.
- **Tema (Theming):** Toggle de modo claro/oscuro. **Dark mode por defecto**. La persistencia del tema debe guardarse en `localStorage`.
- **UX:** Transiciones suaves entre rutas. Micro-interacciones en botones y tarjetas de proyectos. Cursor personalizado opcional según `design.md`.

## 5. Requisitos Funcionales (Estructura del Sitio)

### 5.1. Página de Inicio (Home)

- Hero section: Presentación concisa + Stack principal (TS, Rust, Java) + CTA principal (Email).
- Resumen de servicios/tipos de soluciones.
- Extracto de los 3 mejores proyectos destacados con link a su caso de estudio.
- Tablero de Habilidades Interactivo (Isla interactiva).

### 5.2. Casos de Estudio (Páginas de Proyectos)

- **Organización:** Categorizados por "Tipo de Solución" (Ej. Aplicaciones Web, Aplicaciones Desktop, Backends Empresariales).
- **Estructura del Caso de Estudio:**
  - Problema/Contexto del cliente.
  - Solución técnica implementada.
  - Stack utilizado (Etiquetas: React, Tauri, Spring Boot, etc.).
  - Resultados y aprendizajes.
  - Galería de imágenes/screenshots.
- **Routing:** Dinámico (`/proyectos/[slug]`) generado estáticamente a partir de archivos MDX.

### 5.3. Tablero de Habilidades (Interactive Skills Board)

- Componente interactivo (Isla) que muestre las tecnologías agrupadas por ecosistema (TypeScript/Nestjs, Rust/Tauri, Java/Spring).
- Interacción: Hover o click para ver una breve descripción o proyectos relacionados con esa skill.

### 5.4. Contacto

- Sección dedicada con un diseño limpio.
- Botón de email principal (`mailto:`).
- Enlaces a redes profesionales (GitHub, LinkedIn, X).

## 6. Demostraciones Técnicas Integradas (Especial Stack)

- **Estrategia:** Dado que dominas Tauri y Spring Boot, se incluirá en el Home o en un proyecto destacado:
  - Un enlace claro y atractivo para descargar una mini-app de demostración de Tauri (ej. un pequeño widget de productividad) compilada para Windows/Mac/Linux.
  - Mención de la capacidad de construir backends robustos con Spring Boot, idealmente mostrando un diagrama de arquitectura en uno de los casos de estudio.

## 7. Requisitos No Funcionales

- **SEO Crítico:**
  - Generación de `sitemap.xml` automática.
  - Etiquetas Open Graph y Twitter Cards dinámicas por página/proyecto.
  - Uso de la etiqueta `<link rel="canonical">`.
  - HTML semántico estricto.
- **Rendimiento:** Lighthouse Score > 95 en Performance, Accessibility, Best Practices y SEO.
- **Analíticas:** Preparar la arquitectura para inyectar un script de analíticas (Vercel Analytics o Plausible) mediante una variable de entorno, aunque no se implemente de inmediato.
- **Despliegue:** Por definir. Se configurará el proyecto para ser compatible con cualquier host estático (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

## 8. Modelo de Datos (Placeholders para MDX/TS)

Para la versión 1.0, los datos vivirán en archivos locales.

**Ejemplo Frontmatter para Proyectos (`/src/content/proyectos/ejemplo.mdx`):**

```yaml
---
title: "Plataforma E-commerce B2B"
slug: "ecommerce-b2b"
tipoSolucion: "Aplicacion Web"
stack: ["React", "Nestjs", "PostgreSQL"]
destacado: true
fecha: 2023-11-20
imagenPortada: "./portada.jpg"
problema: "El cliente necesitaba..."
solucion: "Se desarrolló una SPA con React..."
resultados: "Aumento del 40% en ventas..."
---
Contenido MDX del caso de estudio aquí...
```

**Ejemplo Placeholder para Habilidades (`/src/data/skills.ts`):**

```typescript
export const skills = {
  typescript: {
    name: "TypeScript Ecosystem",
    tech: ["React", "Astro", "Nestjs", "Tanstack Start", "Express"],
    level: "Experto",
  },
  rust: {
    name: "Rust Ecosystem",
    tech: ["Tauri", "Tokio"],
    level: "Avanzado",
  },
  java: {
    name: "Java Ecosystem",
    tech: ["Spring Boot", "Maven", "Hibernate"],
    level: "Avanzado",
  },
};
```

## 9. Plan de Ejecución (Milestones)

1. **M1: Configuración Base y Diseño.**
   - Inicializar proyecto Astro + TypeScript.
   - Configurar variables de entorno y estructura de carpetas.
   - Implementar el Theme Toggle (Dark/Light) leyendo `design.md`.
2. **M2: Arquitectura de Contenido.**
   - Configurar Astro Content Collections para los proyectos.
   - Crear los archivos placeholder de habilidades y proyectos.
3. **M3: Desarrollo de Páginas Estáticas.**
   - Layout base, Hero y Sección de Contacto.
   - Página índice de proyectos y página dinámica de Caso de Estudio.
4. **M4: Islas Interactivas.**
   - Desarrollar el Tablero de Habilidades (React/Svelte).
   - Implementar transiciones de página suaves (View Transitions API).
5. **M5: SEO y Pulido Final.**
   - Integrar metadatos SEO, Open Graph y sitemap.
   - Optimización de imágenes.
   - Pruebas de Lighthouse y preparación para despliegue.

import { useState } from "react";

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

interface Props {
  ecosystems: SkillEcosystem[];
  locale: string;
}

const accentMap: Record<
  "primary" | "success" | "warning",
  { badge: string; border: string; glow: string }
> = {
  primary: {
    badge: "badge-primary",
    border: "var(--accent-primary)",
    glow: "oklch(0.7 0.15 220 / 0.25)",
  },
  success: {
    badge: "badge-success",
    border: "var(--accent-success)",
    glow: "oklch(0.7 0.18 145 / 0.25)",
  },
  warning: {
    badge: "badge-warning",
    border: "var(--accent-warning)",
    glow: "oklch(0.75 0.15 85 / 0.25)",
  },
};

const localePlaceholders: Record<string, string> = {
  en: "▸ Hover over a technology to see its description.",
  es: "▸ Pasa el cursor sobre una tecnología para ver su descripción.",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dicts: Record<string, any> = {
  en: {
    skills: {
      levelExpert: "Expert",
      levelAdvanced: "Advanced",
      levelIntermediate: "Intermediate",
      tech: {
        react: "Component-based UIs with hooks and server components. Render optimization and scalable state architecture.",
        astro: "SSG and islands for ultra-fast sites. Technical SEO and green Core Web Vitals.",
        nestjs: "Modular backends with DI and decorators. Guards, interceptors, and hexagonal architecture.",
        tanstack: "Fullstack typed meta-framework. File-based routing with end-to-end types.",
        express: "Minimalist REST APIs and middleware chains. For small services that don't need a framework.",
        tauri: "Desktop apps with Rust backend and web frontend. 5-15MB binaries, instant startup, system access.",
        tokio: "Async runtime for high-concurrency I/O. Tasks, channels, and backpressure.",
        serde: "Typed serialization/deserialization with derive macros. Zero-copy when performance matters.",
        springboot: "Microservices and enterprise APIs. Auto-configuration, profiles, actuator, and out-of-the-box metrics.",
        maven: "Build and dependency management. Multi-module setups and reproducible releases.",
        hibernate: "ORM with JPA and HQL. N+1 optimization, lazy loading, and second-level caches.",
      } satisfies Record<string, string>,
    },
  },
  es: {
    skills: {
      levelExpert: "Experto",
      levelAdvanced: "Avanzado",
      levelIntermediate: "Intermedio",
      tech: {
        react: "UIs componentales con hooks y server components. Optimización de renders y arquitectura de estado escalable.",
        astro: "SSG e islas para sitios ultrarrápidos. SEO técnico y Core Web Vitals en verde.",
        nestjs: "Backends modulares con DI y decoradores. Guards, interceptors y arquitectura hexagonal.",
        tanstack: "Meta-framework fullstack tipado. File-based routing con tipos end-to-end.",
        express: "APIs REST minimalistas y middleware chains. Para servicios pequeños que no necesitan framework.",
        tauri: "Apps desktop con backend Rust y frontend web. Binarios de 5-15MB, arranque instantáneo, acceso al sistema.",
        tokio: "Runtime async para I/O de alta concurrencia. Tasks, channels y backpressure.",
        serde: "Serialización/deserialización tipada con derive macros. Zero-copy cuando importa el rendimiento.",
        springboot: "Microservicios y APIs empresariales. Autoconfiguración, profiles, actuator y métricas out-of-the-box.",
        maven: "Build y gestión de dependencias. Multi-module setups y releases reproducibles.",
        hibernate: "ORM con JPA y HQL. Optimización de N+1, lazy loading y caches de segundo nivel.",
      } satisfies Record<string, string>,
    },
  },
};

function lookup(dict: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let cur: unknown = dict;
  for (const k of keys) {
    if (cur === null || cur === undefined) return path;
    if (typeof cur === "object") {
      cur = (cur as Record<string, unknown>)[k];
    } else {
      return path;
    }
  }
  return typeof cur === "string" ? cur : path;
}

const t = (key: string, l: string): string => lookup(dicts[l] ?? dicts.en, key);

export default function SkillsBoard({ ecosystems, locale }: Props) {
  const placeholder = localePlaceholders[locale] ?? localePlaceholders.en;
  const [active, setActive] = useState<{ eco: string; tech: string } | null>(
    null,
  );

  const activeTech = active
    ? ecosystems
        .find((e) => e.id === active.eco)
        ?.tech.find((t) => t.name === active.tech)
    : null;

  const activeEco = active ? ecosystems.find((e) => e.id === active.eco) : null;

  return (
    <div className="skills-board">
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {ecosystems.map((eco) => {
          const a = accentMap[eco.accent];
          const isActiveEco = activeEco?.id === eco.id;
          return (
            <div
              key={eco.id}
              className="card-wrapper"
              style={{
                filter: isActiveEco
                  ? `drop-shadow(0 8px 24px ${a.glow})`
                  : "drop-shadow(0 4px 12px oklch(0 0 0 / 0.4))",
                transition: "filter 0.25s ease",
              }}
            >
              <div className="card-inner geom-cut-md p-cut-md">
                <div className="flex items-center justify-between mb-4 gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: a.border }}
                    />
                    <h3 className="text-[1.05rem] font-bold text-text-primary m-0 font-display">
                      {eco.name}
                    </h3>
                  </div>
                  <span className={`badge geom-cut-sm ${a.badge}`}>
                    {t(eco.levelKey, locale)}
                  </span>
                </div>

                <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                  {eco.tech.map((t) => {
                    const isActive =
                      active?.eco === eco.id && active?.tech === t.name;
                    const prof = t.proficiency ?? 80;
                    return (
                      <li key={t.name}>
                        <button
                          type="button"
                          onClick={() =>
                            setActive(
                              isActive ? null : { eco: eco.id, tech: t.name },
                            )
                          }
                          onMouseEnter={() =>
                            setActive({ eco: eco.id, tech: t.name })
                          }
                          className="w-full text-left rounded-soft px-3 py-[10px] font-mono text-[0.82rem] cursor-pointer"
                          style={{
                            background: isActive ? a.glow : "transparent",
                            color: isActive
                              ? a.border
                              : "var(--text-secondary)",
                            border: "1px solid",
                            borderColor: isActive
                              ? a.border
                              : "var(--border-default)",
                            transition:
                              "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
                          }}
                        >
                          <div
                            className={`flex items-center justify-between ${isActive ? "mb-2" : "mb-1.5"}`}
                            style={{ transition: "margin 0.2s ease" }}
                          >
                            <span className="font-semibold">{t.name}</span>
                            <span
                              className="text-[0.7rem] font-medium"
                              style={{
                                color: isActive
                                  ? a.border
                                  : "var(--text-disabled)",
                              }}
                            >
                              {prof}%
                            </span>
                          </div>
                          <div className="relative h-[3px] bg-bg rounded-sm overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full rounded-sm"
                              style={{
                                width: `${prof}%`,
                                background: `linear-gradient(90deg, ${a.border} 0%, ${a.border})`,
                                transition: "width 0.4s var(--ease-out-expo)",
                                opacity: isActive ? 1 : 0.5,
                              }}
                            />
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card-wrapper mt-4">
        <div className="card-inner geom-cut-md p-cut-md min-h-[80px] flex items-center">
          {activeTech ? (
            <div className="w-full">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="font-mono font-bold text-[0.95rem]"
                  style={{
                    color: activeEco
                      ? accentMap[activeEco.accent].border
                      : "var(--accent-primary)",
                  }}
                >
                  {activeTech.name}
                </span>
                {activeEco && (
                  <span className="font-mono text-[0.7rem] text-text-disabled tracking-wider uppercase">
                    {activeEco.name} · {t(activeEco.levelKey, locale)}
                  </span>
                )}
              </div>
              <p className="m-0 text-text-secondary text-[0.92rem] leading-relaxed">
                {t(activeTech.descriptionKey, locale)}
              </p>
            </div>
          ) : (
            <p className="m-0 text-text-disabled font-mono text-[0.85rem]">
              {placeholder}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

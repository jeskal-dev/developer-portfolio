import en from "./en";
import es from "./es";
import type { TranslationKeys } from "./en";

export type Locale = "en" | "es";
export type { TranslationKeys };

const translations: Record<Locale, TranslationKeys> = { en, es };

function getKey(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined) return path;
    if (typeof current === "object") {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === "string" ? current : path;
}

export function t(key: string, locale: Locale): string {
  const dict = translations[locale] ?? translations.en;
  return getKey(dict as unknown as Record<string, unknown>, key);
}

export function tInterpolate(
  key: string,
  locale: Locale,
  vars: Record<string, string | number>,
): string {
  let str = t(key, locale);
  for (const [k, v] of Object.entries(vars)) {
    str = str.replace(`{${k}}`, String(v));
  }
  return str;
}

export function localizePath(path: string, locale: Locale): string {
  return `/${locale}${path}`;
}

export function formatDate(d: Date, locale: Locale): string {
  return d.toLocaleDateString(
    locale === "es" ? "es-ES" : "en-US",
    { year: "numeric", month: "short" },
  );
}

export function formatDateFull(d: Date, locale: Locale): string {
  return d.toLocaleDateString(
    locale === "es" ? "es-ES" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );
}

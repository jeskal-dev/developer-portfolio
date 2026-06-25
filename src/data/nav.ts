/**
 * 🌐 NAVEGACIÓN PRINCIPAL
 * Cambia las rutas o etiquetas según tu estructura.
 */

export interface NavItem {
  labelKey: string;
  href: string;
  external?: boolean;
}

export const mainNav: NavItem[] = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.skills", href: "/#skills" },
  { labelKey: "nav.contact", href: "/#contact" },
  { labelKey: "nav.projects", href: "/proyectos" },
];

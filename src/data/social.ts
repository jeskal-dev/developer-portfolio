/**
 * 🔗 REDES Y CONTACTO PROFESIONAL
 * Cambia las URLs por tus perfiles reales.
 */

export interface SocialLink {
  labelKey: string;
  href: string;
  icon: string;
  handleKey: string;
}

export const socialLinks: SocialLink[] = [
  {
    labelKey: "social.github",
    href: "https://github.com/tu-usuario",
    icon: "github",
    handleKey: "social.githubHandle",
  },
  {
    labelKey: "social.linkedin",
    href: "https://linkedin.com/in/tu-usuario",
    icon: "linkedin",
    handleKey: "social.linkedinHandle",
  },
  {
    labelKey: "social.x",
    href: "https://x.com/tu_usuario",
    icon: "x",
    handleKey: "social.xHandle",
  },
];

export interface DemoAsset {
  titleKey: string;
  descriptionKey: string;
  platforms?: { label: string; href: string }[];
  href?: string;
  type: "download" | "link";
}

export const demos: DemoAsset[] = [
  {
    titleKey: "demos.heading",
    descriptionKey: "demos.description",
    platforms: [
      { label: "Windows", href: "#" },
      { label: "macOS", href: "#" },
      { label: "Linux", href: "#" },
    ],
    type: "download",
  },
];

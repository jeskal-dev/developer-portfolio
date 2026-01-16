import type { Paths } from "@/helpers/frame";
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "group/button font-bold mb-2 relative px-8 py-2 cursor-pointer transition-all duration-200 ease-out",
    "[&:hover_svg]:drop-shadow-xl outline-none",
    "[&>span]:relative [&>span]:flex [&>span]:items-center [&>span]:justify-center [&>span]:group-hover/button:text-shadow-lg",
    // Animaciones de clic
    "active:scale-[0.98] active:translate-y-px",
    "motion-reduce:transition-none motion-reduce:active:transform-none",
  ],
  {
    variants: {
      variant: {
        default:
          "[--color-frame-1-stroke:var(--color-primary)] [--color-frame-1-fill:var(--color-primary)]/22 [--color-frame-2-stroke:var(--color-primary)] [--color-frame-2-fill:var(--color-primary)]/10 text-primary-foreground [&:hover_svg]:drop-shadow-primary/50 [&>span]:group-hover/button:text-shadow-primary/50",
        accent:
          "[--color-frame-1-stroke:var(--color-accent)] [--color-frame-1-fill:var(--color-accent)]/40 [--color-frame-2-stroke:var(--color-accent)] [--color-frame-2-fill:var(--color-accent)]/20 text-accent-foreground [&:hover_svg]:drop-shadow-accent/50 [&>span]:group-hover/button:text-shadow-accent/50",
        destructive:
          "[--color-frame-1-stroke:var(--color-destructive)] [--color-frame-1-fill:var(--color-destructive)]/22 [--color-frame-2-stroke:var(--color-destructive)] [--color-frame-2-fill:var(--color-destructive)]/10 text-destructive-foreground [&:hover_svg]:drop-shadow-destructive/50 [&>span]:group-hover/button:text-shadow-destructive/50",
        secondary:
          "[--color-frame-1-stroke:var(--color-secondary)] [--color-frame-1-fill:var(--color-secondary)]/15 [--color-frame-2-stroke:var(--color-secondary)] [--color-frame-2-fill:var(--color-secondary)]/10 text-secondary-foreground [&:hover_svg]:drop-shadow-secondary/50 [&>span]:group-hover/button:text-shadow-secondary/50",
        success:
          "[--color-frame-1-stroke:var(--color-success)] [--color-frame-1-fill:var(--color-success)]/22 [--color-frame-2-stroke:var(--color-success)] [--color-frame-2-fill:var(--color-success)]/10 text-success-foreground [&:hover_svg]:drop-shadow-success/50 [&>span]:group-hover/button:text-shadow-success/50",
      },
      shape: {
        default: "",
        flat: "[--color-frame-2-stroke:transparent] [--color-frame-2-fill:transparent]",
        simple: "ps-8 pe-6",
        "tab-left": "",
        "tab-center": "",
        "tab-right": "",
      },
      animation: {
        default: "active:scale-[0.98]",
        pulse: "active:scale-[0.98] active:animate-pulse",
        bounce: "active:scale-[0.98] active:animate-bounce",
        "scale-down": "active:scale-95",
        "scale-up": "active:scale-105",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "default",
      animation: "default",
    },
  }
);

export const flatPaths: Paths = [
  {
    show: true,
    style: {
      strokeWidth: "1",
      stroke: "var(--color-frame-1-stroke)",
      fill: "var(--color-frame-1-fill)",
    },
    path: [
      ["M", "17", "0"],
      ["L", "100% - 7", "0"],
      ["L", "100% + 0", "0% + 9.5"],
      ["L", "100% - 18", "100% - 6"],
      ["L", "4", "100% - 6"],
      ["L", "0", "100% - 15"],
      ["L", "17", "0"],
    ],
  },
  {
    show: true,
    style: {
      strokeWidth: "1",
      stroke: "var(--color-frame-2-stroke)",
      fill: "var(--color-frame-2-fill)",
    },
    path: [
      ["M", "9", "100% - 6"],
      ["L", "100% - 22", "100% - 6"],
      ["L", "100% - 25", "100% + 0"],
      ["L", "12", "100% + 0"],
      ["L", "9", "100% - 6"],
    ],
  },
];

export const simplePaths: Paths = [
  {
    show: true,
    style: {
      strokeWidth: "1",
      stroke: "var(--color-frame-1-stroke)",
      fill: "var(--color-frame-1-fill)",
    },
    path: [
      ["M", "17", "0"],
      ["L", "100% - 0", "0"],
      ["L", "100% - 0", "100% - 6"],
      ["L", "0% + 3", "100% - 6"],
      ["L", "0% - 0", "100% - 16"],
      ["L", "17", "0"],
    ],
  },
  {
    show: true,
    style: {
      strokeWidth: "1",
      stroke: "var(--color-frame-2-stroke)",
      fill: "var(--color-frame-2-fill)",
    },
    path: [
      ["M", "8", "100% - 6"],
      ["L", "100% - 5", "100% - 6"],
      ["L", "100% - 7", "100% - 0"],
      ["L", "10", "100% - 0"],
      ["L", "8", "100% - 6"],
    ],
  },
];

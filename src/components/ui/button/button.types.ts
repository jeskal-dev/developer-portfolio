import type { VariantProps } from "class-variance-authority";

import type { buttonVariants } from "./button.styles"; 
import type { Paths } from "@/helpers/frame";
export type ButtonProps = VariantProps<typeof buttonVariants> & {
  customPaths?: Paths[];
  enableBackdropBlur?: boolean;
  enableViewBox?: boolean;
};

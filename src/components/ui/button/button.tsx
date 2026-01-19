import { cn } from "@/helpers/classname";
import type { ComponentProps } from "preact";
import Frame from "../frame/frame";
import { buttonVariants, flatPaths, simplePaths } from "./button.styles";
import type { ButtonProps } from "./button.types";

export function Button({
  className,
  children,
  animation,
  variant = "default",
  shape = "default",
  enableBackdropBlur = false,
  enableViewBox = false,
  customPaths,
  ...props
}: ButtonProps & ComponentProps<"button">) {
  return (
    <button
      className={cn(buttonVariants({ variant, shape, className, animation }))}
      {...props}
    >
      <div className="absolute inset-0 -mb-2">
        {!customPaths && (shape == "default" || shape == "flat") && (
          <Frame paths={flatPaths} />
        )}
        {!customPaths && shape == "simple" && <Frame paths={simplePaths} />}
        {customPaths?.map((customPath, customPathKey) => {
          return <Frame key={customPathKey} paths={customPath} />;
        })}
      </div>
      <span>{children}</span>
    </button>
  );
}

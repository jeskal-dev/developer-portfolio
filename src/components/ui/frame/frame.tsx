import { cn } from "@/helpers/classname";
import { setupSvgRenderer, type Paths } from "@/helpers/frame";
import type { ComponentProps } from "preact";
import { memo } from "preact/compat";
import { useEffect, useRef } from "preact/hooks";
import type { FrameProps } from "./frame.types";

const Frame = ({
  className,
  paths,
  enableBackdropBlur,
  enableViewBox,
  ...props
}: FrameProps & ComponentProps<"svg">) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current && svgRef.current.parentElement) {
      const instance = setupSvgRenderer({
        el: svgRef.current,
        paths,
        enableBackdropBlur,
        enableViewBox,
      });

      return () => instance.destroy();
    }
  }, [paths]);

  return (
    <svg
      {...props}
      className={cn(["absolute inset-0 size-full", className])}
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
    />
  );
};

export default memo(Frame);


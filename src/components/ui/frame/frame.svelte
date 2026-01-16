<script lang="ts">
  import type { FrameProps } from "./frame.types";
  import type { HTMLAttributes } from "svelte/elements";
  import { setupSvgRenderer } from "@/helpers/frame";
  import { cn } from "@/helpers/classname";
  import { onMount } from "svelte";

  let {
    paths,
    enableBackdropBlur = false,
    enableViewBox = false,
    class: className = "",
    ...rest
  }: FrameProps & HTMLAttributes<SVGSVGElement> = $props();
  let svgEl = $state<SVGSVGElement | null>(null);

  onMount(() => {
    if (svgEl?.parentElement) {
      const instance = setupSvgRenderer({
        el: svgEl,
        paths,
        enableBackdropBlur,
        enableViewBox,
      });
      return () => instance.destroy();
    }
  });
</script>

<svg
  {...rest}
  bind:this={svgEl}
  class={cn("absolute inset-0 size-full", className)}
/>

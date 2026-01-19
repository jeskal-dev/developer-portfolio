<script lang="ts">
  import { cn } from "@/helpers/classname";
  import Frame from "../frame/frame.svelte";
  import type { ButtonProps } from "./button.types";
  import type { HTMLAttributes } from "svelte/elements";
  import { buttonVariants, flatPaths, simplePaths } from "./button.styles";

  let {
    class: className,
    children,
    animation,
    variant = "default",
    shape = "default",
    enableBackdropBlur = false,
    enableViewBox = false,
    customPaths,
    ...restProps
  }: ButtonProps & HTMLAttributes<HTMLButtonElement> = $props();
</script>

<button
  {...restProps}
  class={cn(buttonVariants({ variant, shape, className, animation }))}
>
  <div class="absolute inset-0 -mb-2">
    {#if !customPaths && (shape === "default" || shape === "flat")}
      <Frame paths={flatPaths} />
    {/if}

    {#if !customPaths && shape === "simple"}
      <Frame paths={simplePaths} />
    {/if}

    {#if customPaths}
      {#each customPaths as customPath}
        <Frame paths={customPath} />
      {/each}
    {/if}
  </div>

  <span>
    {@render children?.()}
  </span>
</button>

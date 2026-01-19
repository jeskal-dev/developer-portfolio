<script lang="ts">
  import { cn } from "@/helpers/classname";
  import {
    Dialog as ArkDialog,
    type DialogTitleProps,
  } from "@ark-ui/svelte/dialog";

  let { children, class: className, ...restProps }: DialogTitleProps = $props();
</script>

{#snippet asChild()}
  <h1
    class={cn([
      "text-shadow-lg text-shadow-primary font-bold text-lg",
      className,
    ])}
  >
    {@render children?.()}
  </h1>
{/snippet}

<ArkDialog.Title {asChild} {...restProps} />

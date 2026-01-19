<script lang="ts">
  import { cn } from "@/helpers/classname";
  import {
    Dialog as ArkDialog,
    type DialogDescriptionProps,
  } from "@ark-ui/svelte/dialog";

  let {
    children,
    class: className,
    ...restProps
  }: DialogDescriptionProps = $props();
</script>

{#snippet asChild()}
  <h2 class={cn(["opacity-80 py-2", className])}>
    {@render children?.()}
  </h2>
{/snippet}

<ArkDialog.Description {asChild} {...restProps} />

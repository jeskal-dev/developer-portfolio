<script lang="ts">
  import { cn } from "@/helpers/classname";
  import {
    Dialog as ArkDialog,
    type DialogBackdropProps,
  } from "@ark-ui/svelte/dialog";

  let { class: className, ...restProps }: DialogBackdropProps = $props();
</script>

<ArkDialog.Backdrop
  class={cn([
    "fixed inset-0 bg-background/80 z-50 data-[state='open']:animate-in [&[data-state='open']]:fade-in-0 data-[state='closed']:animate-out [&[data-state='closed']]:fade-out-0",
    className,
  ])}
  {...restProps}
/>

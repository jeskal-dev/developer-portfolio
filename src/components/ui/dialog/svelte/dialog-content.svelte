<script lang="ts">
  import { cn } from "@/helpers/classname";
  import {
    Dialog as ArkDialog,
    type DialogContentProps,
  } from "@ark-ui/svelte/dialog";
  import { Portal } from "@ark-ui/svelte/portal";
  import Frame from "../../frame/frame.svelte";
  import DialogBackdrop from "./dialog-backdrop.svelte";
  import { dialogCard } from "../dialog.styles";

  let {
    children,
    class: className,
    ...restProps
  }: DialogContentProps = $props();
</script>

<Portal>
  <DialogBackdrop />
  <ArkDialog.Positioner>
    <ArkDialog.Content
      class={cn([
        "outline-none backdrop-blur-sm fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] sm:max-w-lg pb-14 pt-11 px-14",
        "data-[state='open']:animate-in data-[state='open']:fade-in-0 data-[state='open']:zoom-in-80 data-[state='open']:duration-250",
        "data-[state='closed']:animate-out data-[state='closed']:fade-out-0 data-[state='closed']:zoom-out-80 data-[state='closed']:duration-400",
        "[--color-frame-1-stroke:var(--color-primary)]/50",
        "[--color-frame-1-fill:var(--color-primary)]/20",
        "[--color-frame-2-stroke:var(--color-accent)]",
        "[--color-frame-2-fill:var(--color-accent)]/20",
        "[--color-frame-3-stroke:var(--color-accent)]",
        "[--color-frame-3-fill:var(--color-accent)]/20",
        "[--color-frame-4-stroke:var(--color-accent)]",
        "[--color-frame-4-fill:var(--color-accent)]/20",
        "[--color-frame-5-stroke:var(--color-primary)]/23",
        "[--color-frame-5-fill:transparent]",
        className,
      ])}
      {...restProps}
    >
      <Frame
        class={cn(["drop-shadow-2xl drop-shadow-primary/50"])}
        paths={dialogCard}
      />
      {@render children?.()}
    </ArkDialog.Content>
  </ArkDialog.Positioner>
</Portal>

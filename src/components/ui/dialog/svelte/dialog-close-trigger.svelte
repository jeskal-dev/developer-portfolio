<script lang="ts">
  import { cn } from "@/helpers/classname";
  import {
    Dialog as ArkDialog,
    type DialogCloseTriggerProps,
  } from "@ark-ui/svelte/dialog";

  import { X } from "@lucide/svelte";
  import Button from "../../button/button.svelte";
  let {
    children,
    class: className,
    asChild: child,
    ...restProps
  }: DialogCloseTriggerProps = $props();
</script>

<ArkDialog.CloseTrigger {...restProps}>
  {#snippet asChild(props)}
    {#if child}
      {@render child?.(props)}
    {:else}
      <Button
        shape="flat"
        variant="accent"
        animation="scale-down"
        class={cn([
          "absolute right-0 top-0 px-5 py-1.5 drop-shadow-[0_0px_20px_var(--color-accent)]",
          "data-[state='open']:animate-fade-in data-[state='open']:animate-duration-150",
          className,
        ])}
        {...props()}
      >
        <X class="size-4" />
      </Button>
    {/if}
  {/snippet}
</ArkDialog.CloseTrigger>

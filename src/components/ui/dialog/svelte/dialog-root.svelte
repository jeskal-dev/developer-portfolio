<script lang="ts">
  import { Dialog as ArkDialog, type DialogRootProps } from '@ark-ui/svelte/dialog';
  
  let { children, ...restProps }: DialogRootProps = $props();
</script>

<ArkDialog.Root {...restProps}>
  {@render children?.()}
</ArkDialog.Root>
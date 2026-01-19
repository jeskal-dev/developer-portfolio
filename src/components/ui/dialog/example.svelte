<script lang="ts">
  import { CheckCircle, Unplug, Save } from "@lucide/svelte";
  import Dialog from "./svelte";
  import Button from "../button/button.svelte";
</script>

<Dialog.Root>
  <Dialog.Trigger>
    {#snippet asChild(props)}
      <Button variant="secondary" {...props()}>
        <CheckCircle class="size-4 me-2.5" /> Accept
      </Button>
    {/snippet}
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Title>Edit Profile</Dialog.Title>
    <Dialog.Description>
      Make changes to your profile here. Click save when you're done.
    </Dialog.Description>
    <div class="py-5 flex flex-col gap-4"></div>
    <div class="flex flex-col sm:flex-row gap-y-3 justify-end mt-3 pb-2">
      <Dialog.Close>
        {#snippet asChild(props)}
          <Button variant="secondary" class="min-w-30" {...props()}>
            <Unplug class="size-4 me-2.5" />
            Cancel
          </Button>
        {/snippet}
      </Dialog.Close>
      <Button class="min-w-30">
        <Save class="size-4 me-2.5" />
        Save changes
      </Button>
    </div>
    <Dialog.Close />
  </Dialog.Content>
</Dialog.Root>

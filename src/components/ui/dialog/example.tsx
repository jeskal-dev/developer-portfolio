import { CheckCircle, Save, Unplug } from "lucide-preact";
import { Button } from "../button/button";
import Dialog from "./dialog";

const DialogExample = () => {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="success">
          <CheckCircle class="size-4 me-2.5" /> Accept
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Edit Profile</Dialog.Title>
        <Dialog.Description>
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description>
        <div class="py-5 flex flex-col gap-4"></div>
        <div class="flex flex-col sm:flex-row gap-y-3 justify-end mt-3 pb-2">
          <Dialog.Close>
            <Button variant="secondary" class="min-w-30">
              <Unplug class="size-4 me-2.5" />
              Cancel
            </Button>
          </Dialog.Close>
          <Button class="min-w-30" type="submit">
            <Save class="size-4 me-2.5" />
            Save changes
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export default DialogExample;

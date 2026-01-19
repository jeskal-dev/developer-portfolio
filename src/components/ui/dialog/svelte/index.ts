import DialogRoot from './dialog-root.svelte';
import DialogContent from './dialog-content.svelte';
import DialogTitle from './dialog-title.svelte';
import DialogDescription from './dialog-description.svelte';  
import DialogCloseTrigger from './dialog-close-trigger.svelte';

import { Dialog as ArkDialog } from '@ark-ui/svelte/dialog';

export const Dialog = {
  Root: DialogRoot,
  Trigger: ArkDialog.Trigger,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogCloseTrigger,
  CloseTrigger: DialogCloseTrigger,  
};

export default Dialog;
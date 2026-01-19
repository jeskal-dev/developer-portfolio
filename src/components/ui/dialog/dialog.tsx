import { cn } from "@/helpers/classname";
import Frame from "../frame/frame";
import { Button } from "../button/button";
import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { X } from "@lucide/preact";
import { dialogCard } from "./dialog.styles";

function DialogRoot(props: Readonly<React.ComponentProps<typeof Dialog.Root>>) {
  return <Dialog.Root {...props} />;
}

function DialogBackdrop({
  className,
  ...rest
}: React.ComponentProps<typeof Dialog.Backdrop>) {
  return (
    <Dialog.Backdrop
      className={cn([
        "fixed inset-0 bg-background/80 z-50 data-[state='open']:animate-in data-[state='open']:fade-in-0 data-[state='closed']:animate-out data-[state='closed']:fade-out-0",
        className,
      ])}
      {...rest}
    />
  );
}

function DialogContent({
  children,
  className,
  ...rest
}: React.ComponentProps<typeof Dialog.Content>) {
  return (
    <Portal>
      <DialogBackdrop />
      <Dialog.Positioner>
        <Dialog.Content
          className={cn([
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
          {...rest}
        >
          <Frame
            className={cn(["drop-shadow-2xl drop-shadow-primary/50"])}
            paths={dialogCard}
          />
          {children}
          <DialogCloseTrigger />
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
}

function DialogTitle({
  children,
  className,
  ...rest
}: React.ComponentProps<typeof Dialog.Title>) {
  return (
    <Dialog.Title asChild {...rest}>
      <h1
        className={cn([
          "text-shadow-lg text-shadow-primary font-bold text-lg",
          className,
        ])}
      >
        {children}
      </h1>
    </Dialog.Title>
  );
}

function DialogDescription({
  children,
  className,
  ...rest
}: React.ComponentProps<typeof Dialog.Description>) {
  return (
    <Dialog.Description asChild {...rest}>
      <h2 className={cn(["opacity-80 py-2", className])}>{children}</h2>
    </Dialog.Description>
  );
}

function DialogCloseTrigger({
  children,
  className,
  asChild,
  ...rest
}: React.ComponentProps<typeof Dialog.CloseTrigger>) {
  return (
    <Dialog.CloseTrigger asChild {...rest}>
      {children ?? (
        <Button
          shape="flat"
          variant="accent"
          animation="scale-down"
          className={cn([
            "absolute right-0 top-0 px-5 py-1.5 drop-shadow-[0_0px_20px_var(--color-accent)] z-50",
            "data-[state='open']:animate-fade-in data-[state='open']:animate-duration-150",
            className,
          ])}
        >
          <X className="size-4" />
        </Button>
      )}
    </Dialog.CloseTrigger>
  );
}

export default Object.assign(DialogRoot, {
  Trigger: Dialog.Trigger,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogCloseTrigger,
});

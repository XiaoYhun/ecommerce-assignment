import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import useConfirmation from "@/hooks/use-confirmation";

function ConfirmationModal() {
  const { isOpen, onCancel, title, message, onConfirm, confirmText } = useConfirmation();
  return (
    <Dialog open={isOpen} onOpenChange={(v) => v === false && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm} variant="destructive">
            {confirmText || "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationModal;

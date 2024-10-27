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
          <div className="flex gap-2 w-full justify-center">
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={onConfirm} variant="destructive">
              {confirmText || "Confirm"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationModal;

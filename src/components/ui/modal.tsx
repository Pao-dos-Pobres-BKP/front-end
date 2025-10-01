import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./dialog";

interface ModalProps {
  title: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  message: string;
  footer: React.ReactNode;
}

export const Modal = ({ title, message, footer, onOpenChange, open }: ModalProps) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="bg-white border-none" showCloseButton={false}>
        <DialogTitle className="text-[18px] font-semibold text-[#0F172A]">{title}</DialogTitle>
        <DialogDescription className="text-sm text-[var(--color-text-2)]">
          {message}
        </DialogDescription>

        <div className="flex items-center gap-2 justify-end mt-4">{footer}</div>
      </DialogContent>
    </Dialog>
  );
};

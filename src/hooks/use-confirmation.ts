import { create } from "zustand";

type Confirmation = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  confirmation: ({
    title,
    message,
    onConfirm,
    onCancel,
    confirmText,
  }: {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
  }) => void;
  onConfirm: () => void;
  onCancel: () => void;
};

const useConfirmation = create<Confirmation>((set) => ({
  isOpen: false,
  confirmation: ({ title, message, onConfirm, onCancel, confirmText }) => {
    set({
      isOpen: true,
      title,
      message,
      confirmText: confirmText,
      onConfirm: () => {
        onConfirm();
        set({ isOpen: false, title: "", message: "", onConfirm: () => {}, onCancel: () => {}, confirmText: "" });
      },
      onCancel: () => {
        onCancel();
        set({ isOpen: false, title: "", message: "", onConfirm: () => {}, onCancel: () => {}, confirmText: "" });
      },
    });
  },
  title: "",
  message: "",
  onConfirm: () => {},
  onCancel: () => {},
}));

export default useConfirmation;

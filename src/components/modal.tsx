import { X } from "lucide-react";
import { type ReactNode } from "react";

interface ModalProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

const Modal = ({ isOpen, handleClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div
        className="relative mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={handleClose}
            className="rounded-full border-gray-100 bg-white p-1 transition-colors duration-200 hover:bg-gray-200"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};
export default Modal;

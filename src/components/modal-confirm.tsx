import { X } from "lucide-react";
import Button from "./button";

interface ModalProps {
  title: string;
  msg: string;
  btnCloseTitle?: string;
  onBtnPosTap: () => void;
  isOpen: boolean;
  handleClose: () => void;
}

const ModalConfirm = ({
  isOpen,
  handleClose,
  onBtnPosTap,
  title,
  msg,
  btnCloseTitle = "Hapus",
}: ModalProps) => {
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
        <div className="mt-2 flex flex-col gap-4">
          <h2 className="text-base">{msg}</h2>
          <div className="flex flex-row gap-2">
            <Button
              text={btnCloseTitle}
              className="w-full  bg-red-600"
              onClick={() => {
                onBtnPosTap();
                handleClose();
              }}
            />
            <Button text="Tutup" className="w-full" onClick={handleClose} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalConfirm;

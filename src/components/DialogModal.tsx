import { type MouseEvent, useEffect, useRef } from "react";

const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
  const r = element.getBoundingClientRect();

  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

type Props = {
  title: string;
  isOpened: boolean;
  onProceed: () => void;
  onClose: () => void;
  children: React.ReactNode;
};

const DialogModal = ({
  title,
  isOpened,
  onProceed,
  onClose,
  children,
}: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      document.body.classList.add("overflow-hidden");
    } else {
      ref.current?.close();
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpened]);

  const proceedAndClose = () => {
    onProceed();
    onClose();
  };

  return (
    <dialog
      ref={ref}
      className="fixed left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-zinc-400 p-6 shadow-xl backdrop:bg-black/30"
      onCancel={onClose}
      onClick={(e) =>
        ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
      }
    >
      <h3 className="text-xl font-bold text-zinc-900">{title}</h3>

      <div className="mt-3 text-zinc-700">{children}</div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          className="cursor-pointer rounded-md bg-red-600 px-4 py-2 font-semibold text-white transition duration-100 hover:bg-red-700 active:scale-95"
          onClick={proceedAndClose}
        >
          Eliminar
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-md border border-zinc-300 px-4 py-2 font-semibold text-zinc-700 transition duration-100 hover:bg-zinc-100 active:scale-95"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </dialog>
  );
};

export default DialogModal;
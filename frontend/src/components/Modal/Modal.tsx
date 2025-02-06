import { FC, MouseEvent, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalBackdrop } from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export const Modal: FC<ModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    const handleEscapeClick = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscapeClick);
    return () => {
      window.removeEventListener("keydown", handleEscapeClick);
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!modalRoot) return null;

  return createPortal(
    <ModalBackdrop onMouseDown={handleBackdropClick}>{children}</ModalBackdrop>,
    modalRoot
  );
};

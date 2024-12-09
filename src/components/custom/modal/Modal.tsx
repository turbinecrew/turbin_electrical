import React, { ReactNode } from "react";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div
        className="relative w-full max-w-md rounded-xl bg-white shadow-lg" // 여기에 radius 적용
        onClick={(e) => e.stopPropagation()} // 내부 클릭 이벤트 전파 방지
      >
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};


export default Modal;

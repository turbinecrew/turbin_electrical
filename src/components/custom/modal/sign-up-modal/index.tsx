import React from "react";
import { Modal, ModalHeader } from "../Modal"; 

type SignUpModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, closeModal }) => {
  if (!isOpen) return null; // 상태가 false이면 모달 렌더링하지 않음

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="p-6">
        <ModalHeader className="mb-4 text-xl font-semibold">Sign Up</ModalHeader>
        <form>
          <input
            type="text"
            placeholder="Full Name"
            className="mb-4 w-full rounded border p-2"
          />
          <input
            type="email"
            placeholder="Email"
            className="mb-4 w-full rounded border p-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 w-full rounded border p-2"
          />
          <button
            type="submit"
            className="w-full rounded bg-blue-500 py-2 text-white"
          >
            Sign Up
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default SignUpModal;

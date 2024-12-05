// src/modal/sign-in-modal.tsx (클라이언트 전용)
"use client"

import React from "react"

type ModalProps = {
  closeModal: () => void
}

const SignInModal: React.FC<ModalProps> = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>
        <form>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignInModal

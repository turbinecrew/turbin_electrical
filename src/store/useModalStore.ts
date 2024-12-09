// src/store/useModalStore.ts
import { create } from "zustand"

type ModalType = "login" | "signup" | "trade" | null

type ModalStore = {
	modalType: ModalType
	isOpen: boolean
	openModal: (type: ModalType) => void
	closeModal: () => void
}

const useModalStore = create<ModalStore>((set) => ({
	modalType: null,
	isOpen: false,
	openModal: (type) => set({ modalType: type, isOpen: true }),
	closeModal: () => set({ modalType: null, isOpen: false }),
}))

export default useModalStore

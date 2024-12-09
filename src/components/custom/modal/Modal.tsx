import React, { ReactNode } from "react"
import { X } from "lucide-react"

type ModalProps = {
	isOpen: boolean
	closeModal: () => void
	children: ReactNode
}

export const Modal = ({ isOpen, closeModal, children }: ModalProps) => {
	if (!isOpen) return null

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50"
			onClick={(e) => {
				if (e.target === e.currentTarget) closeModal()
			}}
		>
			<div
				className="relative w-full max-w-md rounded-xl bg-white shadow-lg"
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
	)
}

// Modal Header
type ModalHeaderProps = {
	children: ReactNode
	className?: string
}

export const ModalHeader = ({ children, className }: ModalHeaderProps) => {
	return (
		<div className={`border-b p-4 text-lg font-bold ${className}`}>
			{children}
		</div>
	)
}

// Modal context
type ModalContextProps = {
	children: ReactNode
	className?: string
}

export const ModalContext = ({ children, className }: ModalContextProps) => {
	return <div className={`p-4 ${className}`}>{children}</div>
}

// Modal Footer
type ModalFooterProps = {
	children: ReactNode
	className?: string
}

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
	return (
		<div className={`flex justify-end space-x-2 border-t p-4 ${className}`}>
			{children}
		</div>
	)
}

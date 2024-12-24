import { X } from "lucide-react"
import type { ReactNode } from "react"
import React from "react"

type ModalPT = {
	isOpen: boolean
	setIsOpen: (state: boolean) => void
	children: ReactNode
}

export const Modal = ({ isOpen, setIsOpen, children }: ModalPT) => {
	if (!isOpen) return null

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50"
			onClick={(e) => {
				if (e.target === e.currentTarget) setIsOpen(false)
			}}
		>
			<div className="relative w-full max-w-[800px] rounded-xl bg-white shadow-lg">
				<button
					className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
					onClick={() => setIsOpen(false)}
				>
					<X size={24} />
				</button>
				{children}
			</div>
		</div>
	)
}

// Modal Header
type ModalHeaderPT = {
	children: ReactNode
	className?: string
}

export const ModalHeader = ({ children, className }: ModalHeaderPT) => {
	return (
		<div className={`border-b p-4 text-lg font-bold ${className || ""}`}>
			{children}
		</div>
	)
}

// Modal Context
type ModalContextPT = {
	children: ReactNode
	className?: string
}

export const ModalContext = ({ children, className }: ModalContextPT) => {
	return <div className={`p-4 ${className || ""}`}>{children}</div>
}

// Modal Footer
type ModalFooterPT = {
	children: ReactNode
	className?: string
}

export const ModalFooter = ({ children, className }: ModalFooterPT) => {
	return (
		<div
			className={`flex justify-end space-x-2 border-t p-4 ${className || ""}`}
		>
			{children}
		</div>
	)
}

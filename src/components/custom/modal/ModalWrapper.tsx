// src/components/Modal/ModalWrapper.tsx
import React from "react"

type ModalWrapperProps = {
	isOpen: boolean
	children: React.ReactNode
}

const ModalWrapper: React.FC<{
	isOpen: boolean
	children: React.ReactNode
}> = ({ isOpen, children }) => {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
			{children}
		</div>
	)
}

export default ModalWrapper;
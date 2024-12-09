// src/components/custom/modal/ModalOverlay.tsx
import React from "react"

type ModalOverlayProps = {
	onClick: () => void
}

const ModalOverlay: React.FC<{ onClick: () => void }> = ({ onClick }) => {
	return (
		<div
			className="fixed inset-0 bg-gray-700 bg-opacity-50"
			onClick={onClick}
		></div>
	)
}

export default ModalOverlay

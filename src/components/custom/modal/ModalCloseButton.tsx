// src/components/Modal/ModalCloseButton.tsx
import React from "react"
import { X } from "lucide-react"

type ModalCloseButtonProps = {
	onClick: () => void
}

const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({ onClick }) => {
	return (
		<button
			onClick={onClick}
			className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
		>
			<X size={24} />
		</button>
	)
}

export default ModalCloseButton

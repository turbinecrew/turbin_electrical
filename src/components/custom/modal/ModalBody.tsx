// src/components/Modal/ModalBody.tsx
import React from "react"

type ModalBodyProps = {
	children: React.ReactNode
}

const ModalBody: React.FC<ModalBodyProps> = ({ children }) => {
	return <div className="p-6">{children}</div>
}

export default ModalBody

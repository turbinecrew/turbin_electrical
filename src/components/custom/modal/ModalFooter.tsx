// src/components/Modal/ModalFooter.tsx
import React from "react"

type ModalFooterProps = {
	children: React.ReactNode
}

const ModalFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div className="border-t p-4">{children}</div>
}

export default ModalFooter

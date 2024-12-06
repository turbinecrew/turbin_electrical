import React, { Children, cloneElement, isValidElement } from "react"

type CardProps = {
	children?: React.ReactNode
	className?: string
	isColored?: boolean
}
export default function CardComponent({
	children,
	className = "",
	isColored = true,
}: CardProps) {
	return (
		<div
			className={`${className} rounded-2xl shadow-md ${isColored ? "bg-gradient-to-br from-[#DBEFC58f] from-40% to-[#49993390]" : "bg-white bg-opacity-50"}`}
		>
			{children}
		</div>
	)
}

import React, { Children, cloneElement, isValidElement } from "react"

type CardProps = {
	children?: React.ReactNode
	className?: string
}
export default function CardComponent({ children, className = "" }: CardProps) {
	return (
		<div
			className={`${className} m-3 flex h-[360px] w-[400px] flex-col rounded-2xl bg-gradient-to-br from-[#c3e6b68f] from-40% to-[#49993390] p-5 shadow-md`}
		>
			{children}
		</div>
	)
}

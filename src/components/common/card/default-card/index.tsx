import type { ReactNode } from "react"
import React from "react"

type CardPT = {
	children?: ReactNode
	className?: string
	isColored?: boolean
}
export function CardComponent({
	children,
	className = "",
	isColored = true,
}: CardPT) {
	const colorClass = isColored
		? "bg-gradient-to-br from-[#DBEFC58f] from-40% to-[#49993390]"
		: "bg-white bg-opacity-50"

	;<div className={`rounded-2xl shadow-md ${className} ${colorClass}`}>
		{children}
	</div>

	return (
		<div className={`rounded-2xl shadow-md ${className} ${colorClass}`}>
			{children}
		</div>
	)
}

type TitlePT = {
	title?: string
	lowerTitle?: string
	children?: ReactNode
	className?: string
}
export function TitleCard({ title, lowerTitle, children, className }: TitlePT) {
	return (
		<CardComponent
			className={`${className} "flex flex-col p-5`}
			isColored={true}
		>
			<div className="flex flex-col">
				{title && (
					<span className="mb-1 text-start text-xl font-bold text-black">
						{title}
					</span>
				)}
				{lowerTitle && (
					<span className="mb-1 text-start text-sm font-normal text-black/75">
						{lowerTitle}
					</span>
				)}
			</div>
			{children}
		</CardComponent>
	)
}

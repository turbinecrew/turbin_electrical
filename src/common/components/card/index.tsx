"use client"
import * as React from "react"

type CardPT = {
	children?: React.ReactNode
	className?: string
	isColored?: boolean
}

const CardComponent = ({
	children,
	className = "",
	isColored = false,
}: CardPT) => {
	const colorClass = isColored ? "bg-tbPastelGreen" : "bg-[#FAFAFA]"

	return (
		<div
			className={`border-1 rounded-2xl border p-5 ${className} ${colorClass}`}
		>
			{children}
		</div>
	)
}

type TitlePT = {
	title?: string
	rightArea?: React.ReactNode
	lowerTitle?: string
	children?: React.ReactNode
	className?: string
	isColored?: boolean
}
const TitleCard = ({
	title,
	rightArea,
	lowerTitle,
	children,
	className,
	isColored,
}: TitlePT) => {
	return (
		<CardComponent
			className={`${className} "flex flex-col p-5`}
			isColored={isColored}
		>
			<div className="flex flex-col">
				{title && (
					<div className="flex h-fit justify-between">
						<span className="text-start text-lg font-bold text-black">
							{title}
						</span>
						{rightArea || <div></div>}
					</div>
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

export type MiniCardPT = {
	title: string
	value: string | number
	unit?: string
	isColored?: boolean
	isIncreased?: boolean | null
	amount?: number | null
	className?: string
	color?: string
}

const MiniCard = ({
	title,
	value,
	unit,
	amount,
	isIncreased,
	className,
	color,
}: MiniCardPT) => {
	return (
		<div
			className={`w-full flex-col gap-2 rounded-xl p-6 shadow-md ${color} ${className}`}
		>
			<div className="text-xs font-semibold">{title}</div>

			<div className="flex items-center justify-between">
				<div className="flex items-baseline gap-1">
					<span className="scroll-m-20 text-2xl font-semibold tracking-tight">
						{value}
					</span>
					<span className="scroll-m-20 text-lg font-semibold tracking-tight">
						{unit}
					</span>
				</div>
				{(isIncreased != null || "") &&
					(isIncreased ? (
						<div className="text-xs font-bold text-red-600">+{amount}</div>
					) : (
						<div className="text-xs font-bold text-blue-600">-{amount}</div>
					))}
			</div>
		</div>
	)
}

type Props = {
	children?: React.ReactNode
	className?: string
}
const TitleContent = ({ children, className }: Props) => {
	return <div className={`${className}`}>{children}</div>
}

CardComponent.TitleCard = TitleCard
CardComponent.MiniCard = MiniCard
CardComponent.TitleContent = TitleContent

TitleCard.displayName = "TitleCard"
MiniCard.displayName = "MiniCard"
TitleContent.displayName = "TitleContent"

export { CardComponent, TitleCard, MiniCard, TitleContent }

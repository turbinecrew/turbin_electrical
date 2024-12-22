"use client"
import * as React from "react"

type CardContextType = {
	children?: React.ReactNode
	className?: string
	isColored?: boolean
}
type CardPT = CardContextType & React.PropsWithChildren<{}>

const CardContext = React.createContext<CardContextType>({ isColored: false })

const CardComponent = ({
	children,
	className = "",
	isColored = false,
}: CardPT) => {
	const colorClass = isColored
		? "bg-tbPastelGreen"
		: "bg-[#FAFAFA] bg-opacity-50"

	return (
		<CardContext.Provider value={{ isColored }}>
			<div
				className={`border-1 rounded-2xl border shadow-md ${className} ${colorClass}`}
			>
				{children}
			</div>
		</CardContext.Provider>
	)
}

type TitlePT = {
	title?: string
	lowerTitle?: string
	children?: React.ReactNode
	className?: string
	isColored?: boolean
}
const TitleCard = ({
	title,
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

type MiniCardPT = {
	title: string
	value: string | number
	unit: string
	isColored?: boolean
}

const MiniCard = ({ title, value, unit, isColored }: MiniCardPT) => {
	return (
		<div
			className={`h-[100px] flex-col rounded-xl p-5 shadow-md ${isColored ? "bg-tbPastelGreen" : "bg-white bg-opacity-50"}`}
		>
			<span className="text-sm font-light text-teal-950">{title}</span>
			<div className="flex items-baseline justify-end gap-1">
				<span className="scroll-m-20 text-xl font-semibold tracking-tight text-emerald-600">
					{value}
				</span>
				<span className="scroll-m-20 text-sm font-semibold tracking-tight text-slate-600">
					{unit}
				</span>
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

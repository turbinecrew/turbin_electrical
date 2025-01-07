"use client"
import { cn } from "@/util/utils"

type CardPT = {
	className?: string
	isColored?: boolean
	ref?: LegacyRef<HTMLDivElement>
}
const tbCard = ({ ref, className, isColored = false }: CardPT) => {
	return (
		<div
			ref={ref}
			className={cn("rounded-2xl shadow-md", className, {
				"bg-tbPastelGreen": isColored,
				"bg-[#FAFAFA]": !isColored,
			})}
		/>
	)
}

const tbCardTitle = ({ className, ref }: CardPT) => {
	return (
		<div
			ref={ref}
			className={cn(className, "text-start text-lg font-bold text-black")}
		/>
	)
}

const tbCardSubTitle = ({ className, ref }: CardPT) => {
	return (
		<div
			ref={ref}
			className={cn(
				className,
				"mb-1 text-start text-sm font-normal text-black/75",
			)}
		/>
	)
}

const tbCardHeader = ({ className, ref }: CardPT) => {
	return (
		<div
			ref={ref}
			className={cn(
				className,
				"flex flex-col gap-3 space-y-1.5 p-3 md:gap-5 md:p-5",
			)}
		/>
	)
}

const tbCardContent = ({ className, ref }: CardPT) => {
	return <div ref={ref} className={cn(className, "p-3 pt-0 md:p-5")} />
}

const DividedArea = ({ className }: CardPT) => {
	return <div className={cn(className, "flex h-fit justify-between")} />
}

export type MiniCardPT2 = {
	title: string
	value: string | number
	unit?: string
	isColored?: boolean
	isIncreased?: boolean
	amount?: number
	className?: string
	color?: string
}

const MiniCard2 = ({
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
			className={cn(
				className,
				"w-full flex-col gap-2 rounded-xl p-6 shadow-md",
			)}
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

tbCardTitle.displayNme = "tbCardTitle"
tbCardSubTitle.displayNme = "tbCardSubTitle"
tbCardHeader.displayNme = "tbCardHeader"
tbCardContent.displayNme = "tbCardContent"
DividedArea.displayNme = "DividedArea"

export {
	tbCard,
	tbCardTitle,
	tbCardSubTitle,
	tbCardHeader,
	tbCardContent,
	MiniCard2,
}

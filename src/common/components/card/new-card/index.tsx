"use client"
import { cn } from "@/util/utils"

type CardPT = {
	className?: string
	children?: ReactNode
	isColored?: boolean
}
export function TbCard({ className, children, isColored = false }: CardPT) {
	return (
		<div
			className={cn("rounded-2xl shadow-md", className, {
				"bg-tbPastelGreen": isColored,
				"bg-[#FAFAFA]": !isColored,
			})}
		>
			{children}
		</div>
	)
}

type TitlePT = {
	className?: string
	children?: React.ReactNode
	title?: string
	rightArea?: React.ReactNode
	lowerTitle?: string
}

export function TbCardHeader({
	className,
	children,
	title,
	rightArea,
	lowerTitle,
}: TitlePT) {
	return (
		<div
			className={cn(
				className,
				"flex flex-col gap-3 space-y-1.5 p-3 md:gap-5 md:p-5",
			)}
		>
			<div className="flex flex-col">
				{title && (
					<div className="flex h-fit justify-between">
						<span className="text-start text-lg font-bold text-black">
							{title}
						</span>
						{rightArea}
					</div>
				)}
				{lowerTitle && (
					<span className="mb-1 text-start text-sm font-normal text-black/75">
						{lowerTitle}
					</span>
				)}
			</div>
			{children}
		</div>
	)
}

export function TbCardContent({ className, children }: CardPT) {
	return (
		<div className={cn(className, "p-3 pt-0 text-left text-sm md:p-5 md:pt-0")}>
			{children}
		</div>
	)
}

TbCardHeader.displayName = "TbCardHeader"
TbCardContent.displayName = "TbCardContent"

export type MiniCardPT = {
	title: string
	value?: string | number
	unit?: string
	amount?: number
	isIncreased?: boolean
	children?: React.ReactNode
	className?: string
}
export function MiniCard({ title, children, className }: MiniCardPT) {
	return (
		<div
			className={`bg-[#EFF6F1], w-full flex-col gap-2 rounded-xl p-6 shadow-md ${className}`}
		>
			<div className="text-xs font-semibold">{title}</div>
			{children}
		</div>
	)
}

export function MiniCardContent({
	value,
	unit,
	amount,
	isIncreased,
}: MiniCardPT) {
	return (
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
	)
}

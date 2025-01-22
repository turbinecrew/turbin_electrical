import {
	cardVariants,
	MiniCardPT,
	TbCardHeaderPT,
	TbCardPT,
} from "@/common/components/card/new-card/types"
import { cn } from "@/util/utils"

export function TbCard({
	className,
	children,
	size,
	color,
	...rest
}: TbCardPT) {
	return (
		<div {...rest} className={cn(cardVariants({ size, color }), className)}>
			{children}
		</div>
	)
}

export function TbCardHeader({
	className,
	children,
	title,
	rightArea,
	sideTitle,
}: TbCardHeaderPT) {
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
				{sideTitle && (
					<span className="mb-1 text-start text-sm font-normal text-black/75">
						{sideTitle}
					</span>
				)}
			</div>
			{children}
		</div>
	)
}

export function TbCardContent({ className, children }: TbCardPT) {
	return (
		<div className={cn(className, "p-3 pt-0 text-left text-sm md:p-5 md:pt-0")}>
			{children}
		</div>
	)
}

export function MiniCardHeader({ title, children, className }: MiniCardPT) {
	return (
		<div>
			{title && (
				<div className={cn(className, "text-xs font-semibold")}>{title}</div>
			)}
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
		<div className="flex flex-wrap items-center justify-between gap-1 break-words">
			<div className="flex items-baseline gap-1 font-semibold tracking-tight">
				<span className="text-lg md:text-2xl">{value}</span>
				<span className="text-xs md:text-lg">{unit}</span>
			</div>
			{isIncreased != null &&
				(isIncreased === true ? (
					<div className="text-xs font-medium text-red-600">(▲{amount})</div>
				) : isIncreased === false ? (
					<div className="text-xs font-medium text-blue-600">(▼{amount})</div>
				) : isIncreased === "noChange" ? (
					<div className="text-xs font-medium text-green-600">( - )</div>
				) : null)}
		</div>
	)
}

TbCard.displayName = "TbCard"
TbCardHeader.displayName = "TbCardHeader"
TbCardContent.displayName = "TbCardContent"
MiniCardHeader.displayName = "MiniCardHeader"
MiniCardContent.displayName = "MiniCardContent"

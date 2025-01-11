type CardItemPT = {
	value?: string | number
	unit?: string
	amount?: number
	isIncreased?: boolean
}
export function CardItem({ value, unit, amount, isIncreased }: CardItemPT) {
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

export type MiniCardPT = {
	title: string
	Children: React.ReactNode
	className?: string
}
export const CardForm = ({
	title,
	Children,
	className,
	// color,
}: MiniCardPT) => {
	return (
		<div
			className={`bg-[#EFF6F1], w-full flex-col gap-2 rounded-xl p-6 shadow-md ${className}`}
		>
			<div className="text-xs font-semibold">{title}</div>
			{Children}
		</div>
	)
}

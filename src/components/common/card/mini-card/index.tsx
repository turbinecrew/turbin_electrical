import CardComponent from "../default-card"

type MiniCardPT = {
	title: string
	value: string | number
	unit: string
	className?: string
}
export default function MiniCard({
	title = "",
	value = 0,
	unit = "",
	className = "",
}: MiniCardPT) {
	return (
		<CardComponent
			className={`${className} h-[100px] flex-col rounded-xl p-5`}
			isColored={false}
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
		</CardComponent>
	)
}

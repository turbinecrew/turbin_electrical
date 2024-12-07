import CardComponent from ".."

type TitleProps = {
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
}: TitleProps) {
	return (
		<CardComponent
			className={`${className} h-[100px] flex-col rounded-xl p-5`}
			isColored={false}
		>
			<span className="text-sm text-muted-foreground">{title}</span>

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

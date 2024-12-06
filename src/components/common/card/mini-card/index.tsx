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
			<div>
				<span>{title}</span>
			</div>
			<div className="flex justify-end">
				<span>{value}</span>
				<span>{unit}</span>
			</div>
		</CardComponent>
	)
}

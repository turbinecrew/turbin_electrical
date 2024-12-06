import CardComponent from ".."

type TitleProps = {
	title: string
	value: string | number
	unit: string
}
export default function MiniCard({
	title = "",
	value = 0,
	unit = "",
}: TitleProps) {
	return (
		<CardComponent className="h-fit flex-col">
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

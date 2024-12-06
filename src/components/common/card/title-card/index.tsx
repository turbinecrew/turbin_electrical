import CardComponent from ".."

type TitleProps = {
	title?: string
	lowerTitle?: string
	children?: React.ReactNode
	className?: string
}
export default function TitleCard({
	title,
	lowerTitle,
	children,
	className,
}: TitleProps) {
	return (
		<CardComponent className={className}>
			{title && (
				<span className="text-start text-lg font-bold text-black">{title}</span>
			)}
			{lowerTitle && (
				<span className="mb-1 mt-1 text-start text-sm font-normal text-black/75">
					{lowerTitle}
				</span>
			)}
			{children}
		</CardComponent>
	)
}

import { CardComponent } from "@/components/common/card"

type TitlePT = {
	title?: string
	lowerTitle?: string
	children?: React.ReactNode
	className?: string
}
export function TitleCard({ title, lowerTitle, children, className }: TitlePT) {
	return (
		<CardComponent
			className={`${className} "flex flex-col p-5`}
			isColored={true}
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

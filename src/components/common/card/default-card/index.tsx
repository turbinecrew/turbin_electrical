type CardPT = {
	children?: React.ReactNode
	className?: string
	isColored?: boolean
}
export default function CardComponent({
	children,
	className = "",
	isColored = true,
}: CardPT) {
	const baseClass = "rounded-2xl shadow-md"
	const colorClass = isColored
		? "bg-gradient-to-br from-[#DBEFC58f] from-40% to-[#49993390]"
		: "bg-white bg-opacity-50"

	;<div className={`${baseClass} ${className} ${colorClass}`}>{children}</div>

	return (
		<div className={`${baseClass} ${className} ${colorClass}`}>{children}</div>
	)
}

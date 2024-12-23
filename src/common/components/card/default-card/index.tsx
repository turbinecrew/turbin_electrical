type CardPT = {
	children?: React.ReactNode
	className?: string
}

export default function CardComponent({ children, className = "" }: CardPT) {
	const baseClass = "rounded-2xl shadow-md"
	const colorClass = "bg-white bg-opacity-50"

	return (
		<div className={`${baseClass} ${className} ${colorClass}`}>{children}</div>
	)
}

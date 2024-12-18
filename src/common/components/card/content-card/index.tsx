type Props = {
	children?: React.ReactNode
	className?: string
}
export function TitleContent({ children, className }: Props) {
	return <div className={`${className}`}>{children}</div>
}

type Props = {
	children?: React.ReactNode
	className?: string
}
export default function TitleContent({ children, className }: Props) {
	return <div className={`${className}`}>{children}</div>
}

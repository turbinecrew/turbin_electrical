import cn from "clsx"
import type { ButtonHTMLAttributes } from "react"
type ButtonPT = ButtonHTMLAttributes<HTMLButtonElement> & {
	className?: string
	children?: React.ReactNode
}
export default function Button(props: ButtonPT) {
	const { className, ...rest } = props
	return (
		<button
			{...rest}
			className={cn(
				className,
				"inline-flex items-center justify-center rounded-xl border border-input bg-background px-2 py-1 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
			)}
		>
			{props.children}
		</button>
	)
}

import cn from "clsx"
import { ButtonHTMLAttributes } from "react"
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
}
const Button = (props: ButtonProps) => {
	const { className, ...rest } = props
	return (
		<button
			{...rest}
			className={cn(
				className,
				"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-input bg-background p-1 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
			)}
		>
			{props.children}
		</button>
	)
}
export default Button

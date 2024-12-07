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
				"flex items-center justify-center rounded-xl border p-1 text-sm font-medium disabled:pointer-events-none disabled:opacity-50",
			)}
		>
			{props.children}
		</button>
	)
}

export default Button

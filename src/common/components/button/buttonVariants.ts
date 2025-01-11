import { cva } from "class-variance-authority"

export const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/80",
				outline:
					"border border-input bg-background text-primary hover:bg-accent hover:text-accent-foreground",
				ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				sm: "px-2 py-1 text-xs",
				md: "px-4 py-2 text-sm",
				lg: "px-6 py-3 text-base",
			},
			color: {
				tbGreen: "bg-green-500 text-white hover:bg-green-600",
				white: "bg-white text-black hover:bg-gray-100",
				gray: "bg-gray-500 text-white hover:bg-gray-600",
				black: "bg-black text-white hover:bg-gray-800",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
			color: "tbGreen",
		},
	},
)

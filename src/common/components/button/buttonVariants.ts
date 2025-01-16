import { cva } from "class-variance-authority"

export const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			size: {
				sm: "px-2 py-1 text-xs",
				md: "px-4 py-2 text-sm",
				lg: "px-6 py-3 text-base",
			},
			color: {
				green: "bg-green-500 text-white hover:bg-green-600",
				gray: "bg-gray-400 text-white hover:bg-gray-500",
				black: "bg-black text-white hover:bg-gray-800",
				blue: "bg-sky-600 text-white hover:bg-sky-500",
				red: "bg-rose-600 text-white hover:bg-rose-800",
			},
		},
		defaultVariants: {
			size: "md",
			color: "green",
		},
	},
)

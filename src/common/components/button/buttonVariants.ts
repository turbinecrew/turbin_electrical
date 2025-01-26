import { cva } from "class-variance-authority"

export const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			size: {
				fit: "text-sm",
				sm: "px-2 py-1 text-xs",
				md: "px-4 py-2 text-sm",
				lg: "px-6 py-3 text-base",
				table: "px-2 py-1 text-xs md:text-sm",
			},
			color: {
				green: "bg-green-500 text-white hover:bg-green-600",
				gray: "bg-gray-400 text-white hover:bg-gray-500",
				black: "bg-black text-white hover:bg-gray-800",
				blue: "bg-sky-600 text-white hover:bg-sky-500",
				red: "bg-rose-600 text-white hover:bg-rose-800",
				transparent: "bg-transparent text-gray-500 hover:text-gray-300",
				tableWhite:
					"border border-gray-300 bg-white text-slate-700 focus:ring-2 focus:ring-gray-200",
				tableGray:
					"bg-gray-200 text-gray-500 hover:bg-gray-300 focus:ring-2 focus:ring-gray-200",
			},
		},
		defaultVariants: {
			size: "md",
			color: "green",
		},
	},
)

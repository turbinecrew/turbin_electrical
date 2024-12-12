import { ChartConfig } from "@/components/ui/chart"

export const chartD = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]

export const chartC = {
	visitors: {
		label: "Visitors",
	},
	chrome: {
		label: "REC",
		color: "hsl(var(--chart-1))",
	},
	safari: {
		label: "SMP",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig

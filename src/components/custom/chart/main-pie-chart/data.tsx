import { ChartConfig } from "@/components/ui/chart"

export const chartData = [
	{ type: "REC", revenue: 275, fill: "var(--color-REC)" },
	{ type: "SMP", revenue: 200, fill: "var(--color-SMP)" },
]

export const chartConfig = {
	revenue: {
		label: "Revenue",
	},
	REC: {
		label: "REC",
		color: "hsl(var(--chart-1))",
	},
	SMP: {
		label: "SMP",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig

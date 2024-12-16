import { ChartConfig } from "@/components/ui/chart"

export function getChartConfig() {
	const chartConfig = {
		price: {
			label: "price",
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

	return chartConfig
}

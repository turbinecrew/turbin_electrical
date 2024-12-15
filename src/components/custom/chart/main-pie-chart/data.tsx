import { ChartConfig } from "@/components/ui/chart"

export function getChartData() {
	const chartData = [
		{ type: "REC", price: 275, fill: "var(--color-REC)" },
		{ type: "SMP", price: 200, fill: "var(--color-SMP)" },
	]
	return chartData
}

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

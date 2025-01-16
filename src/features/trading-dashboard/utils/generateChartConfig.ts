import type { ChartDataPT } from "@/features/trading-dashboard/types/price-chart/ChartDataPT"
import type { ChartConfig } from "@/shadcn/components/chart"

export const generateChartConfig = (data: ChartDataPT[]): ChartConfig => {
	const config: ChartConfig = {}
	const colors = [
		"hsl(var(--chart-1))",
		"hsl(var(--chart-2))",
		"hsl(var(--chart-3))",
		"hsl(var(--chart-4))",
	]

	if (data.length > 0) {
		Object.keys(data[0]).forEach((key, index) => {
			if (key !== "date") {
				config[key] = {
					label: key,
					color: colors[index - 1] || `hsl(${Math.random() * 360}, 70%, 50%)`,
				}
			}
		})
	}

	return config
}

import { generateChartConfig } from "@/components/custom/chart/generate-chartConfig"
import { ChartConfig } from "@/components/ui/chart"
import { chartData } from "./mock"

export function getChartConfig() {
	const chartConfig: ChartConfig = generateChartConfig({ data: chartData })
	return chartConfig
}

import { generateChartConfig } from "@/features/realtime/hooks/generate-chartConfig"
import type { ChartConfig } from "@/shadcn/components/chart"
import { chartData } from "./mock"

export const recTimeRange = [
	{ value: "30d", label: "Month" },
	{ value: "90d", label: "Quarter" },
	{ value: "180d", label: "Half" },
]

export function getChartConfig() {
	const chartConfig: ChartConfig = generateChartConfig({ data: chartData })

	return chartConfig
}

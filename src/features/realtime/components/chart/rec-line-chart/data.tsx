import { generateChartConfig } from "@/features/realtime/hooks/generate-chartConfig"
import type { ChartConfig } from "@/shadcn/components/chart"

import { chartData } from "./mock"

export function getChartConfig() {
	const chartConfig: ChartConfig = generateChartConfig({ data: chartData })

	return chartConfig
}

import { generateChartConfig } from "@/features/region/hooks/chart/generate-chartConfig"
import type { ChartConfig } from "@/shadcn/components/chart"

import { chartData } from "./mock"

export function getChartConfig() {
	const chartConfig: ChartConfig = generateChartConfig({ data: chartData })
	return chartConfig
}

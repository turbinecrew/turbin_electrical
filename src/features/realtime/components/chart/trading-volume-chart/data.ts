import { generateChartConfig } from "@/features/trading-dashboard/utils/generateChartConfig"
import type { ChartConfig } from "@/shadcn/components/chart"

import { chartData } from "./mock"

export function getChartConfig() {
	const chartConfig: ChartConfig = generateChartConfig({ data: chartData })
	return chartConfig
}

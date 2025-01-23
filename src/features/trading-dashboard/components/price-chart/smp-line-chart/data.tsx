import { rawData } from "@/features/trading-dashboard/components/price-chart/smp-line-chart/mock"
import { generateChartConfig } from "@/features/trading-dashboard/hook/generate-chartConfig"
import type { ChartConfig } from "@/shadcn/components/chart"

function getDailyData() {
	const ProcessedData: typeof rawData = []
	const today = new Date(2024, 11, 28, 22, 0, 0)

	const dailyAverageData: { [key: string]: number[] } = {}

	const twentyFourHoursAgo = new Date(today.getTime() - 24 * 60 * 60 * 1000)
	rawData.map((item) => {
		const itemDate = new Date(item.date)

		if (itemDate >= twentyFourHoursAgo) {
			ProcessedData.push({ date: item.date, smp: item.smp })
			if (itemDate.getDate() == today.getDate() - 1) {
				const dateKey = item.date.split(" ")[0]
				if (!dailyAverageData[dateKey]) {
					dailyAverageData[dateKey] = []
				}
				dailyAverageData[dateKey].push(item.smp)
			}
		} else {
			const dateKey = item.date.split(" ")[0]
			if (!dailyAverageData[dateKey]) {
				dailyAverageData[dateKey] = []
			}
			dailyAverageData[dateKey].push(item.smp)
		}
	})

	Object.entries(dailyAverageData).forEach(([dateKey, values]) => {
		const avgSmp = values.reduce((sum, value) => sum + value, 0) / values.length

		ProcessedData.push({ date: dateKey, smp: Math.round(avgSmp) })
	})

	ProcessedData.sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
	)

	return ProcessedData
}

export const chartData: typeof rawData = getDailyData()

export function getChartConfig() {
	const chartConfig: ChartConfig = generateChartConfig({ data: chartData })

	return chartConfig
}

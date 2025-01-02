import { generateChartConfig } from "@/features/realtime/hooks/generate-chartConfig"
import type { ChartConfig } from "@/shadcn/components/chart"
import { rawData } from "@/features/realtime/components/chart/smp-line-chart/mock"

function getDailyData() {
	let ProcessedData: typeof rawData = []
	const today = new Date(2024, 11, 28, 22, 0, 0)

	const dailyAverageData: { [key: string]: number[] } = {}

	const twentyFourHoursAgo = new Date(today.getTime() - 24 * 60 * 60 * 1000)
	rawData.map((item, idx) => {
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

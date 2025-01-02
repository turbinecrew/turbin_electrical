import { generateChartConfig } from "@/features/realtime/hooks/generate-chartConfig"
import type { ChartConfig } from "@/shadcn/components/chart"
import { RECData, SmpRawData } from "./mock"

function getDailyData() {
	let ProcessedData: typeof SmpRawData = []

	const dailyAverageData: { [key: string]: number[] } = {}
	SmpRawData.map((item, idx) => {
		const itemDate = new Date(item.date)

		const dateKey = item.date.split(" ")[0]
		if (!dailyAverageData[dateKey]) {
			dailyAverageData[dateKey] = []
		}
		dailyAverageData[dateKey].push(item.smp)
	})
	Object.entries(dailyAverageData).forEach(([dateKey, values]) => {
		const avgSmp = values.reduce((sum, value) => sum + value, 0) / values.length

		ProcessedData.push({ date: dateKey, smp: Math.round(avgSmp) })
	})

	ProcessedData.sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
	)
	console.log(ProcessedData, "ProcessedData")
	return ProcessedData
}

type MergedDataPT = { date: string; smp?: number; rec?: number }

function mergeData(
	recData: { date: string; rec: number }[],
	smpData: { date: string; smp: number }[],
): MergedDataPT[] {
	// REC 데이터를 날짜를 기준으로 정렬
	const sortedRecData = [...recData].sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
	)

	let lastRecValue: number | null = null // 가장 가까운 이전 날짜의 rec 값을 저장

	return smpData.map(({ date, smp }) => {
		// 가장 가까운 이전 날짜의 rec 값 찾기
		while (
			sortedRecData.length &&
			new Date(sortedRecData[0].date).getTime() <= new Date(date).getTime()
		) {
			lastRecValue = sortedRecData.shift()?.rec || lastRecValue
		}

		return {
			date,
			smp,
			rec: lastRecValue ?? 0, // 초기 값이 없으면 0
		}
	})
}
// Usage
const mergedData = mergeData(RECData, getDailyData())
console.log(mergedData)

export const chartData: MergedDataPT[] = mergedData

export function getChartConfig() {
	const chartConfig = {
		smp: {
			label: "smp",
			color: "hsl(var(--chart-1))",
		},
		rec: {
			label: "rec",
			color: "hsl(var(--chart-2))",
		},
	} satisfies ChartConfig

	return chartConfig
}

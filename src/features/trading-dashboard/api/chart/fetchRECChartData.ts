import { fetchPastRECData } from "@/features/trading-dashboard/api/fetchPastRECData"
import { fetchTodayRECData } from "@/features/trading-dashboard/api/fetchTodayRECData"
import { processRECData } from "@/features/trading-dashboard/utils/processRECData"

export const fetchRECChartData = async () => {
	const [pastData, todayData] = await Promise.all([
		fetchPastRECData(),
		fetchTodayRECData(),
	])

	const processedPastData = processRECData(pastData || [])
	const processedTodayData = processRECData(todayData || [])

	const mergeAndSortData = [...processedPastData, ...processedTodayData]
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.slice(0, 53) // 최대 출력 일수가 180일

	return mergeAndSortData
}

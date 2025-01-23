export const smpTimeRange = [
	{ value: "1d", label: "Day" },
	{ value: "7d", label: "Week" },
	{ value: "30d", label: "Month" },
]

export const recTimeRange = [
	{ value: "30d", label: "Month" },
	{ value: "90d", label: "Quarter" },
	{ value: "180d", label: "Half" },
]

export function dateFilteredData({
	type,
	chartData,
	timeRange,
}: dateFilteredDataPT) {
	if (type === "rec") {
		let daysToSubtract = 30 // 기본값 설정

		if (timeRange === "30d") {
			daysToSubtract = Math.max(1, Math.floor((30 / 7) * 2)) // 최소 1로 설정
		} else if (timeRange === "90d") {
			daysToSubtract = Math.max(1, Math.floor((90 / 7) * 2)) // 최소 1로 설정
		} else if (timeRange === "180d") {
			daysToSubtract = Math.max(1, Math.floor((180 / 7) * 2)) // 최소 1로 설정
		}

		if (!Array.isArray(chartData) || chartData.length === 0) {
			console.log("No data available")
			return []
		}

		// 데이터를 daysToSubtract만큼 잘라서 리턴
		const filteredData = chartData.slice(0, daysToSubtract)

		return filteredData
	}
	if (type === "smp") {
		let daysToSubtract = 0
		// smpTimeRange에 따라 daysToSubtract 값 설정
		if (timeRange === "1d") {
			daysToSubtract = 0
		} else if (timeRange === "7d") {
			daysToSubtract = 7
		} else if (timeRange === "30d") {
			daysToSubtract = 30
		}
		const filteredData = chartData.slice(-daysToSubtract)
		return filteredData
	}
	return chartData
}

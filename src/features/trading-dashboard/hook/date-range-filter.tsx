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
		const filteredData = chartData.filter((item) => {
			// item.date를 Date 객체로 변환 후, 시간은 0으로 설정
			const date = new Date(item.date)
			date.setHours(0, 0, 0, 0) // 시간, 분, 초, 밀리초를 0으로 설정

			// 기준 날짜를 설정 (현재 날짜 기준으로 수정)
			const referenceDate = new Date(2025, 0, 2) // 2025년 1월 2일을 기준으로 설정
			referenceDate.setHours(0, 0, 0, 0) // 기준 날짜의 시간도 0으로 설정
			let daysToSubtract = 30

			// recTimeRange에 따라 daysToSubtract 값 설정
			if (timeRange === "30d") {
				daysToSubtract = 30
			} else if (timeRange === "90d") {
				daysToSubtract = 90
			} else if (timeRange === "180d") {
				daysToSubtract = 180
			}

			const startDate = new Date(referenceDate)
			startDate.setDate(referenceDate.getDate() - daysToSubtract)
			startDate.setHours(0, 0, 0, 0) // startDate의 시간은 0으로 설정

			return date >= startDate // 날짜 비교
		})
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

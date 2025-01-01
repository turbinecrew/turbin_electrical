export function dateFilteredData({
	type,
	chartData,
	timeRange,
}: dateFilteredDataPT) {
	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date)
		const referenceDate = new Date(2024, 11, 28, 22, 0, 0)
		let daysToSubtract = 30

		if (type == "rec") {
			if (timeRange === "30d") {
				daysToSubtract = 30
			} else if (timeRange === "90d") {
				daysToSubtract = 90
			} else if (timeRange === "180d") {
				daysToSubtract = 180
			}

			const startDate = new Date(referenceDate)

			startDate.setDate(startDate.getDate() - daysToSubtract)

			return date >= startDate
		} else if (type == "smp") {
			const startDate = new Date(referenceDate)
			const endDate = new Date(referenceDate)

			if (timeRange === "1d") {
				daysToSubtract = 1
			} else if (timeRange === "7d") {
				daysToSubtract = 7
				endDate.setDate(startDate.getDate() - 2)
			} else if (timeRange === "30d") {
				daysToSubtract = 30
				endDate.setDate(startDate.getDate() - 2)
			}

			startDate.setDate(endDate.getDate() - daysToSubtract)

			return endDate >= date && date >= startDate
		}
	})

	return filteredData
}

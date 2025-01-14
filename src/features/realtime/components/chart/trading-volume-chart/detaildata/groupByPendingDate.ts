type MockData = {
	createdAt: string
	updatedAt: string
	status: string
}

type Result = {
	date: Date
	volume: number
}

export function groupByPendingDate(data: MockData[]): Result[] {
	const ProcessedData: Result[] = []

	const monthlyPendingData: { [key: string]: number } = {}

	data.forEach((item) => {
		const dateKey = new Date(item.updatedAt).toISOString().slice(0, 7)

		if (!monthlyPendingData[dateKey]) {
			monthlyPendingData[dateKey] = 0
		}

		if (item.status === "Pending") {
			monthlyPendingData[dateKey] += 1
		}
	})

	Object.entries(monthlyPendingData).forEach(([key, value]) => {
		const [year, month] = key.split("-")
		ProcessedData.push({
			date: new Date(Number(year), Number(month), 0, 0, 0, 0), // 'n월 0일'로 설정
			volume: value,
		})
	})

	ProcessedData.sort((a, b) => a.date.getTime() - b.date.getTime())
	console.log(ProcessedData)
	return ProcessedData
}

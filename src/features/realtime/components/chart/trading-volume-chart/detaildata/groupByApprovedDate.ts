type MockData = {
	createdAt: {
		$date: string
	}
}

type Result = {
	date: Date
	volume: number
}

export function groupByApprovedDate(data: MockData[]): Result[] {
	const ProcessedData: Result[] = []

	const monthlyApprovedData: { [key: string]: number } = {}

	data.forEach((item) => {
		const dateKey = new Date(item.createdAt.$date).toISOString().slice(0, 7)

		if (!monthlyApprovedData[dateKey]) {
			monthlyApprovedData[dateKey] = 0
		}

		if (item) {
			monthlyApprovedData[dateKey] += 1
		}
	})

	Object.entries(monthlyApprovedData).forEach(([key, value]) => {
		const [year, month] = key.split("-")
		ProcessedData.push({
			date: new Date(Number(year), Number(month), 0, 0, 0, 0), // 'n월 0일'로 설정
			volume: value,
		})
	})

	ProcessedData.sort((a, b) => a.date.getTime() - b.date.getTime())

	return ProcessedData
}

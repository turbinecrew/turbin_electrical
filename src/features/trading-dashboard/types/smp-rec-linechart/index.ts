export type dateFilteredDataPT = {
	chartData: { date: Date | string; smp?: number; rec?: number }[]
	timeRange: string
	type: string
}

export type TSMPChartData = {
	_id?: { $oid: string }
	date: string | Date
	smp?: number
	Land?: number
	Jeju?: number
	scraped_date?: string
}[]

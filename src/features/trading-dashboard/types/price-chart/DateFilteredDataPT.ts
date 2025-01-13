export type DateFilteredDataPT = {
	chartData: { date: Date | string; smp?: number; rec?: number }[]
	timeRange: string
	type: string
}

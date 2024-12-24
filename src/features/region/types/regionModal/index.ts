export type TimeSeriesData = {
	시간: string
	"발전량(kW)": number
}

export type RegionalModalPT = {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	region: string | null
	timeSeriesData: TimeSeriesData[]
}

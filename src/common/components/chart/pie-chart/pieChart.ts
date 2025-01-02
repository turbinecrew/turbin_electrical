export type TChartData = {
	type: string
	price: number
	fill: string
}

// ChartConfig의 타입 정의
export type TChartConfig = {
	price: TConfig
	REC: TConfig
	SMP: TConfig
}

export type TConfig = {
	label: string
	color?: string
}

export type PieChartComponentPT = {
	data: TChartData[]
	config: TChartConfig
	totalVisitors: number
}

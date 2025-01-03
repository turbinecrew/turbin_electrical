export type DotsLineChartData = {
	날짜: string
	발전량: number
}
export type DotsLineConfig = {
	label: string
	color?: string
}
export type DotsLineChartComponentPT = {
	data: any[]
	dataKey: string
	xAxisKey: string
	color: string
	yAxisConfig?: {
		tickCount?: number
		domain?: number[]
	}
}

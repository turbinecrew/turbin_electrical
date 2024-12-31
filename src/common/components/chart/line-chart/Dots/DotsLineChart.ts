export type DotsLineChartData = {
	날짜: string
	발전량: number
}

export type DotsLineConfig = {
	label: string
	color?: string
}

export type DotsLineChartComponentPT = {
	data: DotsLineChartData[]
	dataKey: string
	xAxisKey: string
	title: string
	color: string
}

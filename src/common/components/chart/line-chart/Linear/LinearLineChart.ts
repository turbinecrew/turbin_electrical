export type LinearLineChartData = Record<string, string | number>

export type LinearLineChartConfig = {
	[key: string]: {
		label: string
		color?: string
	}
}

export type LinearLineChartComponentPT = {
	data: LinearLineChartData[]
	config: LinearLineChartConfig
	dataKey: string
	xAxisKey: string
	title?: string
}

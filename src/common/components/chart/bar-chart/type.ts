export type TChartConfig = {
	primary: {
		label: string
		color: string
	}
	secondary?: {
		label: string
		color: string
	}
}

export type TChartDataItem = {
	_id?: { $oid: string }
	[key: string]: string | number | { $oid: string } | undefined
}

export type BarChartComponentPT = {
	data: TChartDataItem[]
	config: TChartConfig
	xAxisKey: string
	dataKeys: {
		primary: string
		secondary?: string
	}
}

import type { AxisDomainItem } from "recharts/types/util/types"

import type { ChartConfig } from "@/shadcn/components/chart"

type TChartData = {
	date: string
	amgo: number
}

export type BarChartComponentPT = {
	chartConfig: ChartConfig
	chartData: TChartData[]
	BarDataKey: string
	XAxisDataKey: string
	Ymin: AxisDomainItem
	Ymax: AxisDomainItem
	// AxisDomainItem : string | number | Function | 'auto' | 'dataMin' | 'dataMax'
}

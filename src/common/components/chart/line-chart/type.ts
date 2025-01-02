import type { CurveType } from "recharts/types/shape/Curve"
import type { AxisDomainItem } from "recharts/types/util/types"

import type { ChartConfig } from "@/shadcn/components/chart"

type TChartData = {
	date: string
	smp?: number
	rec?: number
}
export type LineChartComponentPT = {
	chartConfig: ChartConfig
	chartData: TChartData[]
	LineDataKey: string
	XAixsDataKey: string
	type: CurveType
	dot: boolean
	Ymin: AxisDomainItem
	Ymax: AxisDomainItem
	// AxisDomainItem : string | number | Function | 'auto' | 'dataMin' | 'dataMax'
}

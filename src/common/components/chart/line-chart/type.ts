import type { ChartConfig } from "@/shadcn/components/chart"
import { CurveType } from "recharts/types/shape/Curve"
import { AxisDomainItem } from "recharts/types/util/types"

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

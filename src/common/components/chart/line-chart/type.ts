import type { CurveType } from "recharts/types/shape/Curve"
import type { AxisDomainItem } from "recharts/types/util/types"

import type { ChartConfig } from "@/shadcn/components/chart"

type TChartData = {
	date: string | Date
	smp?: number
	rec?: number
}
export type LineChartComponentPT = {
	chartConfig: ChartConfig
	chartData: TChartData[]
	lineDataKey: string
	xAixsDataKey: string
	type: CurveType
	dot: boolean
	xAxisFormat: "MD" | "DT" | "YM"
	yMin: AxisDomainItem
	yMax: AxisDomainItem
	// AxisDomainItem : string | number | Function | 'auto' | 'dataMin' | 'dataMax'
}

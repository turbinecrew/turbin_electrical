import type { ChartConfig } from "@/shadcn/components/chart"

type TChartData = {
	date: string
	smp: number
	rec: number
}
export type AreaChartComponentPT = {
	chartConfig: ChartConfig
	chartData: TChartData[]
}

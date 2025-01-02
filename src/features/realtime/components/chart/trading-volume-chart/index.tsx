"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shadcn/components/chart"

import { getChartConfig } from "./data"
import { chartData } from "./mock"
import { TitleCard } from "@/common/components/card"
import { LineChartComponent } from "@/common/components/chart/line-chart"

export function VolumeChart() {
	const chartConfig = getChartConfig()

	return (
		<TitleCard title="월별 거래량">
			<div className="pt-4">
				<LineChartComponent
					chartConfig={chartConfig}
					chartData={chartData}
					LineDataKey={"volume"}
					XAixsDataKey={"date"}
					type={"monotone"}
					dot={false}
					Ymin={1000}
					Ymax={2500}
				/>
			</div>
		</TitleCard>
	)
}

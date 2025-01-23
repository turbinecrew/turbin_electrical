"use client"

import { TitleCard } from "@/common/components/card"
import { LineChartComponent } from "@/common/components/chart/line-chart"

import { getChartConfig } from "./data"
import { chartData } from "./mock"

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

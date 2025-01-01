"use client"

import { chartData, getChartConfig } from "./data"
import { useState } from "react"
import {
	dateFilteredData,
	smpTimeRange,
} from "@/features/realtime/hooks/date-range-filter"
import { LineChartComponent } from "@/common/components/chart/line-chart"
import { TitleCard } from "@/common/components/card"
import { TimeRangeOptions } from "@/common/components/chart/time-range-options"

export function SmpLineChart() {
	const chartConfig = getChartConfig()
	const [timeRange, setTimeRange] = useState("1d")

	const filteredData = dateFilteredData({ chartData, timeRange, type: "smp" })
	const timeRangeOptions = smpTimeRange

	return (
		<div>
			<TitleCard
				title="SMP 가격"
				className="h-full"
				rightArea={TimeRangeOptions(timeRange, setTimeRange, timeRangeOptions)}
			>
				<div className="pt-2">
					<LineChartComponent
						chartConfig={chartConfig}
						chartData={filteredData}
						LineDataKey={"smp"}
						XAixsDataKey={"date"}
						type={"monotone"}
						dot={false}
						Ymin={100}
						Ymax={250}
					/>
				</div>
			</TitleCard>
		</div>
	)
}

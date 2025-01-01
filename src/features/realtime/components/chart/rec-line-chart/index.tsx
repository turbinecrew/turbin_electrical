"use client"

import { useState } from "react"
import { getChartConfig, recTimeRange } from "./data"
import { chartData } from "./mock"
import { dateFilteredData } from "@/features/realtime/hooks/date-range-filter"
import { LineChartComponent } from "@/common/components/chart/line-chart"
import { TitleCard } from "@/common/components/card"
import { TimeRangeOptions } from "@/common/components/chart/line-chart/time-rage-options"

export function RecLineChart() {
	const chartConfig = getChartConfig()
	const [timeRange, setTimeRange] = useState("30d")

	const filteredData = dateFilteredData({ chartData, timeRange, type: "rec" })
	const timeRangeOptions = recTimeRange

	return (
		<TitleCard
			title="REC 가격"
			className="h-full"
			rightArea={TimeRangeOptions(timeRange, setTimeRange, timeRangeOptions)}
		>
			<div className="pt-2">
				<LineChartComponent
					chartConfig={chartConfig}
					chartData={filteredData}
					LineDataKey={"rec"}
					XAixsDataKey={"date"}
					type={"linear"}
					dot={false}
					Ymin={0}
					Ymax={600}
				/>
			</div>
		</TitleCard>
	)
}

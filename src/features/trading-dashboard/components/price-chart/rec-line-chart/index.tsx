"use client"

import { useState } from "react"

import { TitleCard } from "@/common/components/card"
import { LineChartComponent } from "@/common/components/chart/line-chart"
import { TimeRangeOptions } from "@/common/components/chart/time-range-options"
import {
	dateFilteredData,
	recTimeRange,
} from "@/features/trading-dashboard/hook/date-range-filter"

import { getChartConfig } from "./data"
import { useRECChartData } from "@/features/trading-dashboard/hook/useRECChartData"

export function RecLineChart() {
	const chartConfig = getChartConfig()
	const [timeRange, setTimeRange] = useState("30d")

	const { data, isLoading, isError } = useRECChartData()

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (isError) {
		return <div>Error loading data</div>
	}

	const filteredData = dateFilteredData({
		chartData: data,
		timeRange: timeRange,
		type: "rec",
	})
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
					Ymax={400000}
				/>
			</div>
		</TitleCard>
	)
}

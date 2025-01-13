"use client"

import { useState } from "react"

import { TitleCard } from "@/common/components/card"
import { LineChartComponent } from "@/common/components/chart/line-chart"
import { TimeRangeOptions } from "@/common/components/chart/time-range-options"
import {
	dateFilteredData,
	recTimeRange,
} from "@/features/trading-dashboard/hook/date-range-filter"
import { useRECChartData } from "@/features/trading-dashboard/hook/useRECChartData"

import { getChartConfig } from "./data"

export function RecLineChart() {
	const chartConfig = getChartConfig()
	const [timeRange, setTimeRange] = useState("30d")

	const { data, isLoading, isError } = useRECChartData()

	const filteredData = dateFilteredData({
		chartData: data || [], //data가 undefined인 경우 []
		timeRange: timeRange,
		type: "rec",
	})
	const timeRangeOptions = recTimeRange

	if (isLoading) {
		return (
			<TitleCard
				title="REC 가격"
				className="h-full"
				rightArea={TimeRangeOptions(timeRange, setTimeRange, timeRangeOptions)}
			>
				<div className="pt-2">Loading...</div>
			</TitleCard>
		)
	}

	if (isError) {
		return (
			<TitleCard
				title="REC 가격"
				className="h-full"
				rightArea={TimeRangeOptions(timeRange, setTimeRange, timeRangeOptions)}
			>
				<div className="pt-2">Error loading data</div>
			</TitleCard>
		)
	}

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
					Ymax={"auto"}
				/>
			</div>
		</TitleCard>
	)
}

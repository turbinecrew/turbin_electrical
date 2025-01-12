"use client"

import { useState } from "react"

import { TitleCard } from "@/common/components/card"
import { LineChartComponent } from "@/common/components/chart/line-chart"
import { TimeRangeOptions } from "@/common/components/chart/time-range-options"
import {
	DateConverter,
	TodaySMPDateConverter,
	WeeklySMPDateConverter,
} from "@/features/trading-dashboard/hook/date-converter"
import {
	dateFilteredData,
	smpTimeRange,
} from "@/features/trading-dashboard/hook/date-range-filter"
import { useSMPChartData } from "@/features/trading-dashboard/hook/useSMPChartData"

import { getChartConfig } from "./data"

export function SmpLineChart() {
	const chartConfig = getChartConfig()
	const [timeRange, setTimeRange] = useState("1d")

	// timeRange에 맞는 데이터를 가져옵니다.
	const { data, isLoading, isError } = useSMPChartData(timeRange)

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (isError) {
		return <div>Error loading data</div>
	}

	const chartData: TChartData[] =
		data?.map((item) => ({
			date:
				timeRange == "1d"
					? TodaySMPDateConverter(item.date)
					: WeeklySMPDateConverter(item.date),
			smp: item.Land || (item.smp == undefined ? null : item.smp),
		})) || []

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error occurred while fetching data</div>

	const filteredData = dateFilteredData({
		chartData: chartData,
		timeRange,
		type: "smp",
	})

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
						Ymin={0}
						Ymax={200}
					/>
				</div>
			</TitleCard>
		</div>
	)
}

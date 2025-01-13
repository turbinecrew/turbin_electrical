"use client"

import { useState } from "react"

import { TitleCard } from "@/common/components/card"
import { LineChartComponent } from "@/common/components/chart/line-chart"
import { TimeRangeOptions } from "@/common/components/chart/time-range-options"
import {
	dateFilteredData,
	smpTimeRange,
} from "@/features/trading-dashboard/hook/date-range-filter"
import {
	TodaySMPDateConverter,
	WeeklySMPDateConverter,
} from "@/features/trading-dashboard/hook/smp-date-converter"
import { useSMPChartData } from "@/features/trading-dashboard/hook/useSMPChartData"
import type { TSMPData } from "@/features/trading-dashboard/types/TSMPData"

import { getChartConfig } from "./data"

export function SmpLineChart() {
	const chartConfig = getChartConfig()
	const [timeRange, setTimeRange] = useState("1d")

	// timeRange에 맞는 데이터를 가져옵니다.
	const { data, isLoading, isError } = useSMPChartData(timeRange)

	const chartData: { date: Date; smp: number }[] =
		data?.map((item: TSMPData) => ({
			date:
				timeRange == "1d"
					? TodaySMPDateConverter(item.date)
					: WeeklySMPDateConverter(item.date),
			smp: item.Land || (item.smp == undefined ? null : item.smp),
		})) || []

	const filteredData = dateFilteredData({
		chartData: chartData,
		timeRange,
		type: "smp",
	})

	const timeRangeOptions = smpTimeRange

	if (isLoading) {
		return (
			<TitleCard
				title="SMP 가격"
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
				title="SMP 가격"
				className="h-full"
				rightArea={TimeRangeOptions(timeRange, setTimeRange, timeRangeOptions)}
			>
				<div className="pt-2">Error loading data</div>
			</TitleCard>
		)
	}

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

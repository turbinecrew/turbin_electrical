"use client"

import { useState } from "react"

import { TitleCard } from "@/common/components/card"
import { LineChartComponent } from "@/common/components/chart/line-chart"
import { TimeRangeOptions } from "@/common/components/chart/time-range-options"
import { useSMPChartData } from "@/features/trading-dashboard/hooks/useSMPChartData"
import type { TSMPData } from "@/features/trading-dashboard/types/TSMPData"
import {
	TodaySMPDateConverter,
	WeeklySMPDateConverter,
} from "@/features/trading-dashboard/utils/SMPDateConverter"
import {
	dateFilteredData,
	smpTimeRange,
} from "@/features/trading-dashboard/utils/dateFilteredData"
import { generateChartConfig } from "@/features/trading-dashboard/utils/generateChartConfig"

export function SmpLineChart() {
	const [timeRange, setTimeRange] = useState("1d")
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
	const contents = () => {
		if (isLoading) {
			return <div className="pt-2">Loading...</div>
		}

		if (isError) {
			return <div className="pt-2">Error loading data</div>
		}
		if (data) {
			const chartConfig = generateChartConfig(chartData)
			return (
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
			)
		}
	}

	return (
		<div>
			<TitleCard
				title="SMP 가격"
				className="h-full"
				rightArea={TimeRangeOptions(timeRange, setTimeRange, timeRangeOptions)}
			>
				{contents()}
			</TitleCard>
		</div>
	)
}

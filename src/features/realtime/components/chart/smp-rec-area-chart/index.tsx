"use client"

import { useState } from "react"

import { AreaChartComponent } from "@/common/components/chart/area-chart"
import { TimeRangeOptions } from "@/common/components/chart/time-range-options"
import {
	dateFilteredData,
	recTimeRange,
} from "@/features/realtime/hooks/date-range-filter"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shadcn/components/card"

import { chartData, getChartConfig } from "./data"

type MockChartPT = {
	cardTitle: string
}
export function MockAreaChart({ cardTitle }: MockChartPT) {
	const chartConfig = getChartConfig()
	const [timeRange, setTimeRange] = useState("1d")

	const filteredData = dateFilteredData({ chartData, timeRange, type: "rec" })
	const timeRangeOptions = recTimeRange
	return (
		<Card>
			<CardHeader>
				<CardTitle>{cardTitle}</CardTitle>
				<CardDescription>
					{TimeRangeOptions(timeRange, setTimeRange, timeRangeOptions)}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<AreaChartComponent
					chartConfig={chartConfig}
					chartData={filteredData}
					AreaDataKeyOne={"rec"}
					AreaDataKeyTwo={"smp"}
					XAixsDataKey={"date"}
					Ymin={0}
					Ymax={350}
				/>
			</CardContent>
		</Card>
	)
}

"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { CardContent } from "@/shadcn/components/card"
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shadcn/components/chart"

import { useState } from "react"
import { getChartConfig, recTimeRange } from "./data"
import { chartData } from "./mock"
import { dateFilteredData } from "@/features/realtime/hooks/date-range-filter"
import { LineChartComponent } from "@/common/components/chart/line-chart"

export function RecLineChart() {
	const chartConfig = getChartConfig()
	const [timeRange, setTimeRange] = useState("30d")

	const filteredData = dateFilteredData({ chartData, timeRange, type: "rec" })
	const timeRangeOptions = recTimeRange

	return (
		<div>
			<div className="flex items-center justify-end gap-3">
				{timeRangeOptions.map((option, idx) => (
					<label
						key={idx}
						className={`${
							timeRange === option.value
								? "font-bold text-[#0D9172]"
								: "font-thin text-[#9FA0A0]"
						}`}
					>
						<input
							className="hidden"
							name="range"
							type="radio"
							value={option.value}
							checked={timeRange === option.value}
							onChange={() => setTimeRange(option.value)}
						/>
						<span>{option.label}</span>
					</label>
				))}
			</div>
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
	)
}

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

import { chartData, getChartConfig, smpTimeRange } from "./data"
import { useState } from "react"
import { dateFilteredData } from "@/features/realtime/hooks/date-range-filter"
import { LineChartComponent } from "@/common/components/chart/line-chart"

export function SmpLineChart() {
	const chartConfig = getChartConfig()
	const [timeRange, setTimeRange] = useState("1d")

	const filteredData = dateFilteredData({ chartData, timeRange, type: "smp" })
	const timeRangeOptions = smpTimeRange

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
				LineDataKey={"smp"}
				XAixsDataKey={"date"}
				type={"monotone"}
				dot={true}
				Ymin={100}
				Ymax={250}
			/>
		</div>
	)
}

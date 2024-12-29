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

import { chartData, getChartConfig } from "./data"
import { useState } from "react"

export function SmpLineChart() {
	const chartConfig = getChartConfig()
	const [timeRange, setTimeRange] = useState("7d")

	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date)
		const referenceDate = new Date(2024, 11, 28, 22, 0, 0)
		const startDate = new Date(referenceDate)
		const endDate = new Date(referenceDate)

		let daysToSubtract = 90
		if (timeRange === "1d") {
			daysToSubtract = 1
		} else if (timeRange === "7d") {
			daysToSubtract = 7
			endDate.setDate(startDate.getDate() - 2)
		} else if (timeRange === "30d") {
			daysToSubtract = 30
			endDate.setDate(startDate.getDate() - 2)
		}

		startDate.setDate(endDate.getDate() - daysToSubtract)

		return endDate >= date && date >= startDate
	})

	const timeRangeOptions = [
		{ value: "1d", label: "Day" },
		{ value: "7d", label: "Week" },
		{ value: "30d", label: "Month" },
	]

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
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={filteredData}
						margin={{
							left: 0,
							right: 12,
						}}
					>
						<CartesianGrid vertical={true} horizontal={true} />
						<XAxis
							dataKey="date"
							tickLine={true}
							axisLine={{ stroke: "#000000", strokeWidth: 1 }}
							tickMargin={8}
							tickFormatter={(value) => {
								const date = new Date(value)
								const options: Intl.DateTimeFormatOptions = {
									month: "short",
									day: "numeric",
								}

								if (date.getHours() !== 0 || date.getMinutes() !== 0) {
									options.hour = "numeric"
								}

								return date.toLocaleString("en-US", options)
							}}
						/>

						<YAxis tickLine={true} axisLine={true} tickMargin={8} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />

						<Line
							dataKey="smp"
							type="monotone"
							stroke="var(--color-smp)"
							strokeWidth={2}
						/>
						<ChartLegend>
							<ChartLegendContent />
						</ChartLegend>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</div>
	)
}

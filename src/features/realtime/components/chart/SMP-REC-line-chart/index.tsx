"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/shadcn/components/card"
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shadcn/components/chart"

import { getChartConfig } from "./data"
import { chartData } from "./mock"
import { useState } from "react"
import Button from "@/common/components/button"

export function LineComponent() {
	const chartConfig = getChartConfig()
	const [timeRange, setTimeRange] = useState("7d")

	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date)
		const referenceDate = new Date()
		let daysToSubtract = 90
		if (timeRange === "30d") {
			daysToSubtract = 30
		} else if (timeRange === "7d") {
			daysToSubtract = 7
		}
		const startDate = new Date(referenceDate)
		startDate.setDate(startDate.getDate() - daysToSubtract)
		return date >= startDate
	})

	const timeRangeOptions = [
		{ value: "7d", label: "7Days" },
		{ value: "30d", label: "4Weeks" },
		{ value: "90d", label: "3Months" },
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
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								})
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
			{/* <CardFooter>
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div className="flex items-center gap-2 font-medium leading-none"></div>
					</div>
				</div>
			</CardFooter> */}
		</div>
	)
}

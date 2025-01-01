"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shadcn/components/chart"

import { getChartConfig } from "./data"
import { chartData } from "./mock"
import { TitleCard } from "@/common/components/card"

export function VolumeChart() {
	const chartConfig = getChartConfig()

	return (
		<div className="">
			<ChartContainer config={chartConfig}>
				<LineChart
					accessibilityLayer
					data={chartData}
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
						dataKey="volume"
						type="monotone"
						stroke="var(--color-volume)"
						strokeWidth={2}
					/>

					<ChartLegend>
						<ChartLegendContent />
					</ChartLegend>
				</LineChart>
			</ChartContainer>
		</div>
	)
}

"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shadcn/components/chart"

import type { AreaChartComponentPT } from "./type"

export function AreaChartComponent({
	chartConfig,
	chartData,
}: AreaChartComponentPT) {
	return (
		<ChartContainer config={chartConfig}>
			<AreaChart
				accessibilityLayer
				data={chartData}
				margin={{
					left: 0,
					right: 12,
				}}
			>
				<CartesianGrid vertical={false} horizontal={true} />
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
				<YAxis
					tickLine={true}
					axisLine={true}
					tickMargin={8}
					ticks={[0, 100, 200, 300, 400]}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="dot" />}
				/>
				<Area
					dataKey="smp"
					type="monotone"
					fill="var(--color-smp)"
					fillOpacity={0.4}
					stroke="var(--color-smp)"
				/>
			</AreaChart>
		</ChartContainer>
	)
}

"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shadcn/components/chart"

import type { BarChartComponentPT } from "./type"

export function BarChartComponent({
	chartConfig,
	chartData,
	BarDataKey,
	XAxisDataKey,
	Ymin,
	Ymax,
}: BarChartComponentPT) {
	return (
		<ChartContainer config={chartConfig}>
			<BarChart data={chartData}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey={XAxisDataKey}
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<YAxis
					domain={[Ymin, Ymax]}
					axisLine={false}
					tickLine={false}
					tickMargin={10}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="dashed" />}
				/>
				<Bar
					dataKey={BarDataKey}
					fill={`var(--color-${BarDataKey})`}
					radius={4}
				/>
			</BarChart>
		</ChartContainer>
	)
}

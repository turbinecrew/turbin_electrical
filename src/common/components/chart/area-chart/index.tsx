"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shadcn/components/chart"
import type { AreaChartComponentPT } from "./type"
import { AxisDomainItem } from "recharts/types/util/types"

export function AreaChartComponent({
	chartConfig,
	chartData,
	AreaDataKeyOne,
	AreaDataKeyTwo,
	XAixsDataKey,
	Ymin,
	Ymax = "auto",
}: AreaChartComponentPT) {
	function generateTicks(
		Ymin: AxisDomainItem,
		Ymax: AxisDomainItem,
		step: number,
	) {
		if (typeof Ymin == "number" && typeof Ymax == "number") {
			const ticks = []
			for (let i = Math.ceil(Ymin / step) * step; i <= Ymax; i += step) {
				ticks.push(i)
			}
			return ticks
		}
	}
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
					dataKey={XAixsDataKey}
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
					ticks={generateTicks(Ymin, Ymax, 50)}
					domain={["dataMin", "dataMax"]}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="dot" />}
				/>
				<Area
					dataKey={AreaDataKeyOne}
					type="linear"
					fill={`var(--color-${AreaDataKeyOne})`}
					fillOpacity={0.4}
					stroke={`var(--color-${AreaDataKeyOne})`}
				/>
				<Area
					dataKey={AreaDataKeyTwo}
					type="natural"
					fill={`var(--color-${AreaDataKeyTwo})`}
					fillOpacity={0.4}
					stroke={`var(--color-${AreaDataKeyTwo})`}
				/>
			</AreaChart>
		</ChartContainer>
	)
}

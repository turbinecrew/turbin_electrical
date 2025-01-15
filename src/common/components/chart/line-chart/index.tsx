"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import type { AxisDomainItem } from "recharts/types/util/types"

import type { LineChartComponentPT } from "@/common/components/chart/line-chart/type"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shadcn/components/chart"

export function LineChartComponent({
	chartConfig,
	chartData,
	LineDataKey,
	XAixsDataKey,
	Ymin,
	Ymax = "auto",
	type,
	dot,
	xAxisFormat,
}: LineChartComponentPT) {
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
			<LineChart
				accessibilityLayer
				data={chartData}
				margin={{
					left: 0,
					right: 12,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey={XAixsDataKey}
					tickLine={true}
					axisLine={{ stroke: "#000000", strokeWidth: 1 }}
					tickMargin={8}
					tickFormatter={(value) => {
						if (xAxisFormat == "MD") {
							const date = new Date(value)

							const options: Intl.DateTimeFormatOptions = {
								month: "numeric",
								day: "numeric",
								weekday: "short",
							} // 1일 (월) 10시

							return new Intl.DateTimeFormat("ko-KR", options).format(date)
						}

						if (xAxisFormat == "DT") {
							const date = new Date(value)

							const options: Intl.DateTimeFormatOptions = {
								day: "numeric",
								hour: "numeric",
								weekday: "short",
							} // 1. 1. (월)

							return new Intl.DateTimeFormat("ko-KR", options).format(date)
						}

						if (xAxisFormat === "YM") {
							const date = new Date(value)
							const options: Intl.DateTimeFormatOptions = {
								year: "numeric",
								month: "numeric",
							} // 2025.10.
							return new Intl.DateTimeFormat("ko-KR", options).format(date)
						}

						return value
					}}
				/>

				<YAxis
					tickLine={true}
					axisLine={true}
					tickMargin={8}
					ticks={generateTicks(Ymin, Ymax, 10)}
					domain={[Ymin, Ymax]}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Line
					dataKey={LineDataKey}
					type={type}
					stroke={`var(--color-${LineDataKey})`}
					strokeWidth={2}
					dot={dot}
				/>
			</LineChart>
		</ChartContainer>
	)
}

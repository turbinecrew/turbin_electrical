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
	lineDataKey,
	xAixsDataKey,
	yMin,
	yMax = "auto",
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

	const dateFormatter = (value: string | Date) => {
		if (!value) return "-"

		const date = new Date(value)
		if (isNaN(date.getTime())) return "-"

		const option: Record<"MD" | "DT" | "YM", Intl.DateTimeFormatOptions> = {
			MD: { month: "long", day: "numeric", weekday: "short" },
			DT: { day: "numeric", hour: "numeric", weekday: "short" },
			YM: { year: "numeric", month: "long" },
		}

		const options = option[xAxisFormat]
		return options
			? new Intl.DateTimeFormat("ko-KR", options).format(date)
			: value.toLocaleString()
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
					dataKey={xAixsDataKey}
					tickLine={true}
					axisLine={{ stroke: "#000000", strokeWidth: 1 }}
					tickMargin={8}
					tickFormatter={dateFormatter}
				/>

				<YAxis
					tickLine={true}
					axisLine={true}
					tickMargin={8}
					ticks={generateTicks(yMin, yMax, 10)}
					domain={[yMin, yMax]}
				/>
				<ChartTooltip
					cursor={false}
					labelFormatter={(_, payload) => {
						if (!payload || payload.length === 0) return "날짜 정보 없음"
						const xAxisValue = dateFormatter(payload[0].payload[xAixsDataKey])
						return xAxisValue
					}}
					content={<ChartTooltipContent indicator="dashed" />}
				/>
				<Line
					dataKey={lineDataKey}
					type={type}
					stroke={`var(--color-${lineDataKey})`}
					strokeWidth={2}
					dot={dot}
				/>
			</LineChart>
		</ChartContainer>
	)
}

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
						const date = new Date(value)
						const isOnTime = date.getMinutes() !== 0 //협정 세계시 0시가 한국 시간 9시로 기본설정 되므로 9시로 했다

						const options: Intl.DateTimeFormatOptions = isOnTime
							? { month: "numeric", day: "numeric", weekday: "short" } // 00일 형식
							: { hour: "numeric", weekday: "short" } // 시간 포함 형식

						// 한국어 날짜 및 시간 포맷
						return new Intl.DateTimeFormat("ko-KR", options).format(date)
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

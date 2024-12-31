import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shadcn/components/chart"

import type { LinearLineChartComponentPT } from "./LinearLineChart"

// LinearLineChart 컴포넌트
export function LinearLineChartComponent({
	data,
	config,
}: LinearLineChartComponentPT) {
	return (
		<ChartContainer config={config}>
			<LineChart
				accessibilityLayer
				data={data}
				margin={{
					left: 12,
					right: 12,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="day"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Line
					dataKey="day"
					type="linear"
					stroke="var(--color-desktop)"
					strokeWidth={2}
					dot={false}
				/>
			</LineChart>
		</ChartContainer>
	)
}

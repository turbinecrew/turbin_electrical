"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shadcn/components/chart"

// 차트 설정 타입
const data = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
]

const config = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
	mobile: {
		label: "Mobile",
		color: "hsl(var(--chart-2))",
	},
}
export function AreaChartComponent() {
	return (
		<ChartContainer config={config}>
			<AreaChart
				accessibilityLayer
				data={data}
				margin={{
					left: 12,
					right: 12,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="month"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="dot" />}
				/>
				<Area
					dataKey="mobile"
					type="natural"
					fill={config.mobile.color}
					fillOpacity={0.4}
					stroke={config.mobile.color}
					stackId="a"
				/>
				<Area
					dataKey="desktop"
					type="natural"
					fill={config.desktop.color}
					fillOpacity={0.4}
					stroke={config.desktop.color}
					stackId="a"
				/>
			</AreaChart>
		</ChartContainer>
	)
}

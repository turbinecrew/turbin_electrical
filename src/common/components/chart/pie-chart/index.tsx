"use client"

import { Label, Pie, PieChart } from "recharts"

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shadcn/components/chart"

// 데이터 항목의 타입 정의
interface ChartDataItem {
	browser: string
	visitors: number
	fill: string
}

// ChartConfig의 타입 정의
interface ChartConfig {
	innerRadius?: number
	strokeWidth?: number
	label: string
	[key: string]: any
}

// PieChart 컴포넌트
export function PieChartComponent({
	data,
	config,
	totalVisitors,
}: {
	data: ChartDataItem[]
	config: ChartConfig
	totalVisitors: number
}) {
	return (
		<ChartContainer config={config}>
			<PieChart width={400} height={400}>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Pie
					data={data}
					dataKey="visitors"
					nameKey="browser"
					innerRadius={config.innerRadius || 60} // config에서 innerRadius 사용
				>
					<Label
						content={({ viewBox }) => {
							if (viewBox && "cx" in viewBox && "cy" in viewBox) {
								return (
									<text
										x={viewBox.cx}
										y={viewBox.cy}
										textAnchor="middle"
										dominantBaseline="middle"
									>
										<tspan className="text-3xl font-bold">
											{totalVisitors.toLocaleString()}
										</tspan>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) + 24}
											className="fill-muted-foreground"
										>
											Visitors
										</tspan>
									</text>
								)
							}
						}}
					/>
				</Pie>
			</PieChart>
		</ChartContainer>
	)
}

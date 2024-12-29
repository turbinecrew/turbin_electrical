import { Label, Pie, PieChart } from "recharts"

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shadcn/components/chart"

import type { PieChartComponentPT } from "./pieChart"

// PieChart 컴포넌트
export function PieChartComponent({
	data,
	config,
	totalVisitors,
}: PieChartComponentPT) {
	return (
		<ChartContainer config={config}>
			<PieChart width={400} height={400}>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Pie
					data={data}
					dataKey="price"
					nameKey="type"
					innerRadius={60} // config에서 innerRadius 사용
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

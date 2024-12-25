"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/shadcn/components/card"
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shadcn/components/chart"

import { getChartConfig } from "./data"
import { chartData } from "./mock"

export function LineComponent() {
	const chartConfig = getChartConfig()

	return (
		<div>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 0,
							right: 12,
						}}
					>
						<CartesianGrid vertical={true} horizontal={true} />
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
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<Line
							dataKey="rec"
							type="monotone"
							stroke="var(--color-rec)"
							strokeWidth={2}
						/>
						<Line
							dataKey="smp"
							type="monotone"
							stroke="var(--color-smp)"
							strokeWidth={2}
						/>
						<ChartLegend>
							<ChartLegendContent />
						</ChartLegend>
					</LineChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div className="flex items-center gap-2 font-medium leading-none">
							이번 달 SMP : 상승
						</div>
					</div>
				</div>
			</CardFooter>
		</div>
	)
}

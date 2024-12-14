"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"

import { chartConfig, chartData } from "./data"

export function LineComponent() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>REC 및 SMP 가격</CardTitle>
				<CardDescription>X축: 최근 7일, Y축: 가격(₩/kWh)</CardDescription>
			</CardHeader>
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
							dot={{
								fill: "var(--color-rec)",
							}}
							activeDot={{
								r: 1,
							}}
						/>
						<Line
							dataKey="smp"
							type="monotone"
							stroke="var(--color-smp)"
							strokeWidth={2}
							dot={{
								fill: "var(--color-smp)",
							}}
							activeDot={{
								r: 1,
							}}
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
							전력 생산 총량 예측값 카드
							<TrendingUp className="h-4 w-4" />
						</div>
						<div className="flex items-center gap-2 leading-none text-muted-foreground">
							X축: 최근 7일, Y축: 가격(₩/kWh).
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}

"use client"

import { TrendingUp } from "lucide-react"
import { Label, LabelList, Pie, PieChart } from "recharts"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shadcn/components/card"
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shadcn/components/chart"

import { chartConfig, chartData } from "./mock"
import { useMemo } from "react"

export function BidPieChart() {
	const total = useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.number, 0)
	}, [])
	return (
		<div className="flex flex-col">
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
				>
					<PieChart>
						<ChartTooltip
							content={<ChartTooltipContent nameKey="type" hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="number"
							nameKey="type"
							fill="transparent"
							innerRadius={60}
							stroke="none"
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
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) - 28}
													className="fill-muted-foreground"
												>
													TOTAL
												</tspan>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold"
												>
													{total.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													건
												</tspan>
											</text>
										)
									}
								}}
							/>
						</Pie>
						<ChartLegend content={<ChartLegendContent />} />
					</PieChart>
				</ChartContainer>
			</CardContent>
		</div>
	)
}

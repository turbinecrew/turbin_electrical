"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"

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

export function PieComponent() {
	return (
		<div className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>REC와 SMP의 수익 비율</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
				>
					<PieChart>
						<ChartTooltip
							content={<ChartTooltipContent nameKey="price" hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="price"
							fill="transparent"
							stroke="none"
						>
							<LabelList
								dataKey="type"
								className="fill-background"
								stroke="none"
								fontSize={12}
								formatter={(value: keyof typeof chartConfig) =>
									chartConfig[value]?.label
								}
							/>
						</Pie>
						<ChartLegend content={<ChartLegendContent />} />
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 font-medium leading-none">
					수익 내역 <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					(REC: ₩XX, SMP: ₩XX)
				</div>
			</CardFooter>
		</div>
	)
}

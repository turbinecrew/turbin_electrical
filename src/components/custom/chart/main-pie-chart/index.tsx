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
} from "@/components/ui/card"
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"

import { chartC, chartD } from "./data"

export function PieComponent() {
	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>REC와 SMP의 수익 비율</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartC}
					className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
				>
					<PieChart>
						<ChartTooltip
							content={<ChartTooltipContent nameKey="visitors" hideLabel />}
						/>
						<Pie data={chartD} dataKey="visitors">
							<LabelList
								dataKey="browser"
								className="fill-background"
								stroke="none"
								fontSize={12}
								formatter={(value: keyof typeof chartC) => chartC[value]?.label}
							/>
						</Pie>
						<ChartLegend content={<ChartLegendContent />} />
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total visitors for the last 6 months
				</div>
			</CardFooter>
		</Card>
	)
}

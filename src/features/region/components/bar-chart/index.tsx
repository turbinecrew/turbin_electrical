"use client"

import { BarChartComponent } from "@/common/components/chart/bar"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shadcn/components/card"

import type { MockChartPT } from "./type"
import { chartConfig, chartData } from "./type"

export function MockChart({ cardTitle }: MockChartPT) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{cardTitle}</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent>
				<BarChartComponent data={chartData} config={chartConfig} />
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Trending up by 5.2% this month
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total visitors for the last 6 months
				</div>
			</CardFooter>
		</Card>
	)
}

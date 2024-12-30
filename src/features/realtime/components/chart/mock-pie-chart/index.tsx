"use client"

import { TrendingUp } from "lucide-react"

import { PieChartComponent } from "@/common/components/chart/pie-chart"
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shadcn/components/card"

import { chartConfig, chartData } from "./mock"

// 몫 파이차트 데이터

export function MockPieChart({ cardTitle }: { cardTitle: string }) {
	const totalVisitors = chartData.reduce((acc, curr) => acc + curr.price, 0)

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>{cardTitle}</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<PieChartComponent
				data={chartData}
				config={chartConfig}
				totalVisitors={totalVisitors}
			/>

			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 font-medium leading-none">
					수익 내역 <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					(REC: ₩XX, SMP: ₩XX)
				</div>
			</CardFooter>
		</Card>
	)
}

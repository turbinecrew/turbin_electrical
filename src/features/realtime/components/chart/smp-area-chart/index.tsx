"use client"

import { TrendingUp } from "lucide-react"

import { AreaChartComponent } from "@/common/components/chart/area-chart"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shadcn/components/card"

import { getChartConfig } from "./data"
import { chartData } from "./mock"

type MockChartPT = {
	cardTitle: string
}
export function MockAreaChart({ cardTitle }: MockChartPT) {
	const chartConfig = getChartConfig()
	return (
		<Card>
			<CardHeader>
				<CardTitle>{cardTitle}</CardTitle>
				<CardDescription>X축: 최근 7일, Y축: 가격(₩/kWh)</CardDescription>
			</CardHeader>
			<CardContent>
				<AreaChartComponent chartConfig={chartConfig} chartData={chartData} />
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

"use client"

import { BidPieChart } from "@/features/realtime/components/chart/bid-pie-chart"
import WeeklyPowerChart from "@/features/realtime/components/chart/weekly-power-chart"
import { RegionalEnergyChart } from "@/features/region/components/RegionalEnergyChart"
import { MainPageSummaryCard } from "@/features/summary-data/components/main-page-mini-card"
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "@/shadcn/components/card"

export default function Home() {
	return (
		<div className="mx-[5vw] flex flex-col gap-8 p-8">
			<MainPageSummaryCard />

			<div className="grid grid-cols-5 gap-4">
				<div className="col-span-3">
					<RegionalEnergyChart />
				</div>

				<Card className="col-span-2 items-center justify-center">
					<CardHeader>
						<CardTitle>지도 영역</CardTitle>
					</CardHeader>
					<CardContent className="flex items-center justify-center p-2">
						<div className="h-[40vh] w-[80%] bg-green-400 text-center text-lg font-bold text-white">
							지도지도
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-5 gap-4">
				<Card className="col-span-2">
					<CardHeader>
						<CardTitle>Bid Pie Chart</CardTitle>
					</CardHeader>
					<CardContent>
						<BidPieChart />
					</CardContent>
				</Card>

				<div className="col-span-3">
					<WeeklyPowerChart />
				</div>
			</div>
		</div>
	)
}

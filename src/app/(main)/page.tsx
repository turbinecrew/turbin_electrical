"use client"

import { MiniCard } from "@/common/components/card"
import { BidPieChart } from "@/features/realtime/components/chart/bid-pie-chart"
import WeeklyPowerChart from "@/features/realtime/components/chart/weekly-power-chart"
import { miniCardData } from "@/features/realtime/types/miniCard"
import { RegionalEnergyChart } from "@/features/region/components/RegionalEnergyChart"
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "@/shadcn/components/card"

export default function Home() {
	return (
		<div className="mx-[5vw] flex flex-col gap-8 p-8">
			<div className="grid grid-cols-4 gap-4">
				{miniCardData.map((item, idx) => (
					<MiniCard
						key={idx}
						title={item.title}
						value={item.value}
						unit={item.unit}
						isIncreased={item.isIncreased}
						amount={item.amount}
						color={item.color}
					/>
				))}
			</div>

			<div className="grid grid-cols-5 gap-4">
				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>지역별 에너지 차트</CardTitle>
					</CardHeader>
					<CardContent>
						<RegionalEnergyChart />
					</CardContent>
				</Card>

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

				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>주간 전력 생산량</CardTitle>
					</CardHeader>
					<CardContent>
						<WeeklyPowerChart />
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

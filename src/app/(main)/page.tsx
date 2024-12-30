"use client"

import { MiniCard } from "@/common/components/card"
import { BidPieChart } from "@/features/realtime/components/chart/bid-pie-chart"
import WeeklyPowerChart from "@/features/realtime/components/chart/weekly-power-chart"
import { RegionalEnergyChart } from "@/features/region/components/RegionalEnergyChart"
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "@/shadcn/components/card"

export default function Home() {
	const miniCardDatas = [
		{
			title: "일일전력생산량",
			value: 721,
			unit: "Mwh",
			isIncreased: true,
			amount: 320,
			color: "bg-[#F6FCF3]",
		},
		{
			title: "일일",
			value: 433,
			unit: "Mwh",
			isIncreased: false,
			amount: 0.35,
			color: "bg-[#EFF6F1]",
		},
		{
			title: "SMP 현재가",
			value: 1144,
			unit: "원",
			isIncreased: false,
			amount: 1.95,
			color: "bg-[#F6FCF3]",
		},
		{
			title: "REC 현재가",
			value: 456,
			unit: "원",
			isIncreased: true,
			amount: 4.5,
			color: "bg-[#EFF6F1]",
		},
	]

	return (
		<div className="mx-[5vw] flex flex-col gap-8 p-8">
			{/* Mini Cards Section */}
			<div className="grid grid-cols-4 gap-4">
				{miniCardDatas.map((item, idx) => (
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
				<div className="col-span-3">
					<RegionalEnergyChart />
				</div>

				<Card className="col-span-2">
					<CardHeader>
						<CardTitle>지도 영역</CardTitle>
					</CardHeader>
					<CardContent className="flex items-center justify-center p-2">
						<div className="h-[40vh] w-[90%] bg-green-400 text-center text-lg font-bold text-white">
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
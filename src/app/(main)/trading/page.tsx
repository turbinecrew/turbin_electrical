"use client"
import type { MiniCardPT } from "@/common/components/card"
import { TitleCard, CardComponent, MiniCard } from "@/common/components/card"
import { VolumeChart } from "@/features/realtime/components/chart/trading-volume-chart"
import { TradingDataTable } from "@/features/realtime/components/trading-table"
import { TradingVolumeCards } from "@/features/realtime/components/slide-card"
import { useState } from "react"
import { SmpLineChart } from "@/features/realtime/components/chart/smp-line-chart"
import { RecLineChart } from "@/features/realtime/components/chart/rec-line-chart"

export default function Trading() {
	const [activeChart, setActiveChart] = useState<number | null>(0)
	const miniCardDatas = [
		{
			title: "현재 SMP 가격",
			value: 148.32,
			unit: "원/kWh",
			isIncreased: false,
			amount: 0.35,
			color: "bg-[#F6FCF3]",
		},
		{
			title: "현재 REC 가격",
			value: 39921,
			unit: "원/REC",
			isIncreased: true,
			amount: 320,
			color: "bg-[#EFF6F1]",
		},
	]

	return (
		<div className="flex flex-col gap-8 p-8">
			<div className="flex w-full flex-col gap-4">
				<div className="grid w-full grid-cols-4 gap-4">
					{miniCardDatas.map((items: MiniCardPT, idx) => (
						<button
							key={idx}
							onClick={() => {
								setActiveChart(idx)
							}}
							className="text-left"
						>
							<MiniCard
								title={items.title}
								value={items.value}
								unit={items.unit}
								isIncreased={items.isIncreased}
								amount={items.amount}
								color={items.color}
								className="h-full"
							/>
						</button>
					))}

					<div className="col-span-2">
						<TradingVolumeCards />
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					{activeChart === 0 && (
						<TitleCard title="SMP 가격">
							<div className="pt-2">
								<SmpLineChart />
							</div>
						</TitleCard>
					)}
					{activeChart === 1 && (
						<div>
							<TitleCard title="REC 가격">
								<div className="pt-2"></div>
							</TitleCard>
						</div>
					)}
					<TitleCard title="월별 거래량">
						<div className="pt-4">
							<VolumeChart />
						</div>
					</TitleCard>
				</div>
			</div>
			<div className="flex w-full justify-center">
				<TradingDataTable />
			</div>
		</div>
	)
}

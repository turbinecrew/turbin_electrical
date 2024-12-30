"use client"
import type { MiniCardPT } from "@/common/components/card"
import { TitleCard, CardComponent, MiniCard } from "@/common/components/card"
import { VolumeChart } from "@/features/realtime/components/chart/trading-volume-chart"
import { TradingDataTable } from "@/features/realtime/components/trading-table"
import { TradingVolumeCards } from "@/features/realtime/components/slide-card"
import { useState } from "react"
import { SmpLineChart } from "@/features/realtime/components/chart/smp-line-chart"
import { RecLineChart } from "@/features/realtime/components/chart/rec-line-chart"
import { PriceCard } from "@/features/realtime/components/price-card"

export default function Trading() {
	const [activeChart, setActiveChart] = useState<number | null>(0)

	return (
		<div className="flex flex-col gap-8 p-8">
			<div className="flex w-full flex-col gap-4">
				<div className="grid w-full grid-cols-4 gap-4">
					<PriceCard
						activeChart={activeChart}
						setActiveChart={setActiveChart}
					/>
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
								<div className="pt-2">
									<RecLineChart />
								</div>
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

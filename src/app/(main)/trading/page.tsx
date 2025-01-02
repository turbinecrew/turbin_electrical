"use client"

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
					{activeChart === 0 && <SmpLineChart />}
					{activeChart === 1 && <RecLineChart />}
					<VolumeChart />
				</div>
			</div>
			<div className="flex w-full justify-center">
				<TradingDataTable />
			</div>
		</div>
	)
}

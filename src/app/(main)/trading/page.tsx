"use client"

import { useState } from "react"

import { VolumeChart } from "@/features/realtime/components/chart/trading-volume-chart"
import { TradingDataTable } from "@/features/realtime/components/trading-table"
import { PriceCard } from "@/features/trading-dashboard/components/price-card"
import { RecLineChart } from "@/features/trading-dashboard/components/price-chart/rec-line-chart"
import { SmpLineChart } from "@/features/trading-dashboard/components/price-chart/smp-line-chart"
import { TradingVolumeCards } from "@/features/trading-dashboard/components/slide-card"

export default function Trading() {
	const [activeChart, setActiveChart] = useState<number | null>(0)

	return (
		<div className="flex flex-col gap-8 p-8">
			<div className="flex w-full flex-col gap-4 md:grid md:grid-cols-2">
				<PriceCard activeChart={activeChart} setActiveChart={setActiveChart} />
				<TradingVolumeCards />
			</div>
			<div className="grid h-fit grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-1">
				{activeChart === 0 && <SmpLineChart />}
				{activeChart === 1 && <RecLineChart />}
				<VolumeChart />
			</div>
			<div className="flex h-fit w-full justify-center">
				<TradingDataTable />
			</div>
		</div>
	)
}

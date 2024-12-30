"use client"
import type { MiniCardPT } from "@/common/components/card"
import { TitleCard, CardComponent, MiniCard } from "@/common/components/card"

import { priceCardDatas } from "@/features/realtime/components/trading-dashboard/price-card/data"
interface PriceCardPT {
	activeChart: number | null
	setActiveChart: (index: number) => void
}

export function PriceCard({ activeChart, setActiveChart }: PriceCardPT) {
	return (
		<>
			{priceCardDatas.map((items: MiniCardPT, idx) => (
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
		</>
	)
}

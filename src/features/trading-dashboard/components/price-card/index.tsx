"use client"
import type { MiniCardPT } from "@/common/components/card"
import { MiniCard } from "@/common/components/card"
import { usePriceCardData } from "@/features/trading-dashboard/hook/usePriceCardData"

type PriceCardPT = {
	activeChart: number | null
	setActiveChart: (index: number) => void
}

export function PriceCard({ setActiveChart }: PriceCardPT) {
	const priceCardData = usePriceCardData()

	return (
		<>
			{priceCardData.map((items: MiniCardPT, idx: number) => (
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

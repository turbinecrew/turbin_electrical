import type { MiniCardPT } from "@/common/components/card/new-card/types"
import {
	MiniCardContent,
	MiniCardHeader,
	TbCard,
} from "@/common/components/card/new-card"
import { usePriceCardData } from "@/features/trading-dashboard/hook/usePriceCardData"

type PriceCardPT = {
	activeChart: number | null
	setActiveChart: (index: number) => void
}

export function PriceCard({ setActiveChart }: PriceCardPT) {
	const priceCardData = usePriceCardData()

	return (
		<div className="grid w-full grid-cols-2 gap-4">
			{priceCardData.map((items: MiniCardPT, idx: number) => (
				<button
					key={idx}
					onClick={() => {
						setActiveChart(idx)
					}}
					className="text-left"
				>
					<TbCard size="mini" color={idx ? "deep" : "light"} className="h-full">
						<MiniCardHeader title={items.title} />
						<MiniCardContent
							value={items.value}
							unit={items.unit}
							isIncreased={items.isIncreased}
							amount={items.amount}
						/>
					</TbCard>
				</button>
			))}
		</div>
	)
}

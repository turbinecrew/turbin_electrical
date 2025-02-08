import { useEffect, useState } from "react"

import {
	MiniCardContent,
	MiniCardHeader,
	TbCard,
} from "@/common/components/card/new-card"
import type { MiniCardPT } from "@/common/components/card/new-card/types"
import { timeCardDatas } from "@/features/trading-dashboard/components/slide-card/data"

export function TradingVolumeCards() {
	const [data, setData] = useState(timeCardDatas[0])

	useEffect(() => {
		setInterval(() => {
			setData((prevData) =>
				prevData === timeCardDatas[0] ? timeCardDatas[1] : timeCardDatas[0],
			)
		}, 3000)
	}, [])

	return (
		<div className="grid w-full grid-cols-2 gap-4">
			{data.map((items: MiniCardPT, idx) => (
				<TbCard
					key={idx}
					variant="mini"
					color={idx ? "deep" : "light"}
					className="h-full"
				>
					<MiniCardHeader title={items.title} />
					<MiniCardContent value={items.value} unit={items.unit} />
				</TbCard>
			))}
		</div>
	)
}

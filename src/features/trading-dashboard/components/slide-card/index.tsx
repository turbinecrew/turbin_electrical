"use client"
import { useEffect, useState } from "react"

import type { MiniCardPT } from "@/common/components/card"
import { MiniCard } from "@/common/components/card"
import { timeCardDatas } from "@/features/trading-dashboard/components/slide-card/data"

export function TradingVolumeCards() {
	const [data, setData] = useState(timeCardDatas[0])

	useEffect(() => {
		const transformCard = setInterval(() => {
			setData((prevData) =>
				prevData === timeCardDatas[0] ? timeCardDatas[1] : timeCardDatas[0],
			)
		}, 3000)
	}, [])

	return (
		<div className="grid w-full transform grid-cols-2 gap-4">
			{data.map((items: MiniCardPT, idx) => (
				<MiniCard
					title={items.title}
					value={items.value}
					unit={items.unit}
					color={items.color}
					key={idx}
					className="h-fit"
				/>
			))}
		</div>
	)
}

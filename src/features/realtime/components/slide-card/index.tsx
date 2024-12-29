"use client"
import { MiniCard, MiniCardPT } from "@/common/components/card"
import { useEffect, useState } from "react"

export function TradingVolumeCards() {
	const timeCardDatas = [
		[
			{
				title: "누적 거래량",
				value: 21373415,
				unit: "원",
				color: "bg-[#F6FCF3]",
			},

			{
				title: "이번 달 거래량",
				value: 342252,
				unit: "원",
				color: "bg-[#EFF6F1]",
			},
		],
		[
			{
				title: "누적 거래량",
				value: 17424144,
				unit: "kWh",
				color: "bg-[#F6FCF3]",
			},
			{
				title: "이번 달 거래량",
				value: 41011,
				unit: "kWh",
				color: "bg-[#EFF6F1]",
			},
		],
	]

	const [data, setData] = useState(timeCardDatas[0])

	useEffect(() => {
		const transformCard = setInterval(() => {
			setData((prevData) =>
				prevData === timeCardDatas[0] ? timeCardDatas[1] : timeCardDatas[0],
			)
		}, 1000)
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

"use client"

import { useState } from "react"

import PlantDetails from "@/features/trading/components/CardSection/PlantDetails"
import PlantList from "@/features/trading/components/CardSection/PlantList"
import TradeModal from "@/features/trading/components/modal"

const mockData = [
	{
		발전소: "발전소 A",
		누적발전량: 1000,
		거래가능: 400,
		SMP: [
			{ month: "01월", SMP: 200, REC: 150 },
			{ month: "02월", SMP: 300, REC: 250 },
			{ month: "03월", SMP: 500, REC: 350 },
		],
	},
	{
		발전소: "발전소 B",
		누적발전량: 800,
		거래가능: 300,
		SMP: [
			{ month: "01월", SMP: 180, REC: 100 },
			{ month: "02월", SMP: 280, REC: 200 },
			{ month: "03월", SMP: 400, REC: 300 },
		],
	},
]

export default function TradePage() {
	const [selectedPlantName, setSelectedPlantName] = useState<string | null>(
		null,
	)
	const [isTradeModalOpen, setIsTradeModalOpen] = useState(false)

	const selectedPlant = mockData.find(
		(plant) => plant.발전소 === selectedPlantName,
	)

	return (
		<div className="mx-auto flex flex-col items-center justify-center gap-8 p-8">
			<PlantList
				plants={mockData}
				selectedPlant={selectedPlantName}
				onSelect={setSelectedPlantName}
			/>
			{selectedPlant && (
				<PlantDetails
					plant={selectedPlant}
					onBid={() => setIsTradeModalOpen(true)}
				/>
			)}
		</div>
	)
}

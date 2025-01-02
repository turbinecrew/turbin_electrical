"use client"

import { useState } from "react"

import PlantDetails from "@/features/trading/components/CardSection/PlantDetails"
import PlantList from "@/features/trading/components/CardSection/PlantList"
import RealTimeTradeCard from "@/features/trading/components/RealTimeTradeTable"
import TradeModal from "@/features/trading/components/modal"

const mockData = [
	{
		발전소: "발전소 A",
		누적발전량: 1000,
		거래가능: 400,
		SMP: [
			{ month: "01월", SMP: 180, REC: 100 },
			{ month: "02월", SMP: 280, REC: 200 },
			{ month: "03월", SMP: 400, REC: 300 },
		],
		변화지표: [
			{ month: "01월", 누적발전량: 200, 거래가능발전량: 150 },
			{ month: "02월", 누적발전량: 300, 거래가능발전량: 250 },
			{ month: "03월", 누적발전량: 500, 거래가능발전량: 350 },
		],
	},
]

export default function TradePage() {
	const [selectedPlantName, setSelectedPlantName] = useState<string | null>(
		"발전소 A",
	)
	const [isTradeModalOpen, setIsTradeModalOpen] = useState(false)
	const [modalData, setModalData] = useState<{
		누적발전량: number
		거래가능발전량: number
	} | null>(null)

	const selectedPlant = mockData.find(
		(plant) => plant.발전소 === selectedPlantName,
	)

	const lastData =
		selectedPlant?.변화지표 && selectedPlant.변화지표.length > 0
			? selectedPlant.변화지표[selectedPlant.변화지표.length - 1]
			: null

	const handleBidOpen = (currentData: {
		누적발전량: number
		거래가능발전량: number
	}) => {
		setModalData(currentData)
		setIsTradeModalOpen(true)
	}

	return (
		<div className="mx-auto flex flex-col gap-8 p-8">
			{/* 발전소 선택 리스트 */}
			<PlantList
				plants={mockData}
				selectedPlant={selectedPlantName}
				onSelect={setSelectedPlantName}
			/>

			<div className="flex flex-row gap-4">
				<div className="flex-1">
					{selectedPlant && (
						<PlantDetails
							plant={selectedPlant}
							current누적발전량={lastData?.누적발전량 || 0}
							current거래가능={lastData?.거래가능발전량 || 0}
							handleBidOpen={handleBidOpen}
						/>
					)}
				</div>

				{/* RealTimeTradeCard */}
				<div className="flex-1">
					<RealTimeTradeCard />
				</div>
			</div>

			{isTradeModalOpen && modalData && (
				<TradeModal
					isOpen={isTradeModalOpen}
					setIsOpen={setIsTradeModalOpen}
					current누적발전량={modalData.누적발전량}
					current거래가능발전량={modalData.거래가능발전량}
				/>
			)}
		</div>
	)
}

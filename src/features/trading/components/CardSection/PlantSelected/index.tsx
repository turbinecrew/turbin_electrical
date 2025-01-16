"use client"

import TbButton from "@/common/components/button/TbButton"

interface PlantSelectedPT {
	plants: Array<{
		발전소: string
		누적발전량: number
		거래가능: number
	}>
	selectedPlant: string | null
	onSelect: (plant: string) => void
}

export default function PlantSelected({
	plants,
	selectedPlant,
	onSelect,
}: PlantSelectedPT) {
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{plants.map((plant) => (
				<div
					key={plant.발전소}
					className={`flex flex-col justify-between rounded-lg border p-4 shadow-sm transition ${
						selectedPlant === plant.발전소
							? "border-blue-500 bg-blue-50"
							: "border-gray-200 bg-white hover:shadow-md"
					}`}
				>
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-gray-800">
							{plant.발전소}
						</h3>
						<p className="text-sm text-gray-600">
							<strong>누적 발전량:</strong>{" "}
							<span className="text-gray-800">
								{plant.누적발전량.toLocaleString()} MWh
							</span>
						</p>
						<p className="text-sm text-gray-600">
							<strong>거래 가능 발전량:</strong>{" "}
							<span className="text-gray-800">
								{plant.거래가능.toLocaleString()} MWh
							</span>
						</p>
					</div>
					<TbButton
						onClick={() => onSelect(plant.발전소)}
						color={selectedPlant === plant.발전소 ? "green" : "gray"}
						size="md"
						className={`mt-4 w-full ${
							selectedPlant === plant.발전소
								? "bg-blue-500 text-white hover:bg-blue-600"
								: "bg-gray-200 text-gray-700 hover:bg-gray-300"
						}`}
					>
						{selectedPlant === plant.발전소 ? "선택됨" : "선택"}
					</TbButton>
				</div>
			))}
		</div>
	)
}

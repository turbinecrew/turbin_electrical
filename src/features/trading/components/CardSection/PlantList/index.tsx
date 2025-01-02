"use client"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shadcn/components/table"

interface PlantListPT {
	plants: Array<{
		발전소: string
		누적발전량: number
		거래가능: number
	}>
	selectedPlant: string | null
	onSelect: (plant: string) => void
}

export default function PlantList({
	plants,
	selectedPlant,
	onSelect,
}: PlantListPT) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>발전소</TableHead>
					<TableHead>누적 발전량 (MWh)</TableHead>
					<TableHead>거래 가능 발전량 (MWh)</TableHead>
					<TableHead>선택</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{plants.map((plant) => (
					<TableRow key={plant.발전소}>
						<TableCell>{plant.발전소}</TableCell>
						<TableCell>{plant.누적발전량}</TableCell>
						<TableCell>{plant.거래가능}</TableCell>
						<TableCell>
							<button
								onClick={() => onSelect(plant.발전소)}
								className={`rounded px-4 py-2 text-sm font-semibold ${
									selectedPlant === plant.발전소
										? "bg-blue-500 text-white"
										: "bg-gray-200 text-gray-700 hover:bg-gray-300"
								}`}
							>
								{selectedPlant === plant.발전소 ? "선택됨" : "선택"}
							</button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

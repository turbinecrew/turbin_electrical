"use client"

import { useState } from "react"

import {
	Modal,
	ModalContext,
	ModalFooter,
	ModalHeader,
} from "@/features/trading/components/modal"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shadcn/components/card"
import { AreaChart } from "@/shadcn/components/chart/area"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shadcn/components/table"

const mockData = [
	{ 발전소: "발전소 A", 누적발전량: 1000, 거래가능: 400 },
	{ 발전소: "발전소 B", 누적발전량: 800, 거래가능: 300 },
	{ 발전소: "발전소 C", 누적발전량: 1200, 거래가능: 600 },
]

export default function TradePage() {
	const [selectedPlant, setSelectedPlant] = useState<
		(typeof mockData)[0] | null
	>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [tradeType, setTradeType] = useState<"buy" | "sell" | null>(null)

	const handleTrade = (type: "buy" | "sell") => {
		setTradeType(type)
		setIsModalOpen(true)
	}

	return (
		<div className="mx-auto p-8">
				<div>area그래프 영역</div>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>발전소 목록</CardTitle>
				</CardHeader>
				<CardContent>
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
							{mockData.map((plant) => (
								<TableRow key={plant.발전소}>
									<TableCell>{plant.발전소}</TableCell>
									<TableCell>{plant.누적발전량}</TableCell>
									<TableCell>{plant.거래가능}</TableCell>
									<TableCell>
										<button
											onClick={() => setSelectedPlant(plant)}
											className={`rounded px-4 py-2 text-sm font-semibold ${
												selectedPlant?.발전소 === plant.발전소
													? "bg-blue-500 text-white"
													: "bg-gray-200 text-gray-700 hover:bg-gray-300"
											}`}
										>
											{selectedPlant?.발전소 === plant.발전소
												? "선택됨"
												: "선택"}
										</button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{selectedPlant && (
				<div className="grid grid-cols-2 gap-4">
					<Card>
						<CardHeader>
							<CardTitle>{selectedPlant.발전소} - 누적 발전량</CardTitle>
						</CardHeader>
						<CardContent>
							<AreaChart
								data={[
									{ name: "01월", value: 200 },
									{ name: "02월", value: 400 },
									{ name: "03월", value: selectedPlant.누적발전량 },
								]}
								label="누적 발전량 (MWh)"
								color="blue"
							/>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>{selectedPlant.발전소} - 거래 가능 발전량</CardTitle>
						</CardHeader>
						<CardContent>
							<AreaChart
								data={[
									{ name: "01월", value: 100 },
									{ name: "02월", value: 200 },
									{ name: "03월", value: selectedPlant.거래가능 },
								]}
								label="거래 가능 발전량 (MWh)"
								color="green"
							/>
						</CardContent>
					</Card>

					<div className="col-span-2 flex justify-between gap-4">
						<button
							onClick={() => handleTrade("buy")}
							className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
						>
							매수
						</button>
						<button
							onClick={() => handleTrade("sell")}
							className="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
						>
							매도
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

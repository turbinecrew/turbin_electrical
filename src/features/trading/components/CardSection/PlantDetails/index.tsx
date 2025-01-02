"use client"

import React, { useState } from "react"
import {
	Area,
	AreaChart,
	CartesianGrid,
	Tooltip,
	XAxis,
	YAxis,
	Legend,
} from "recharts"

import TradeModal from "@/features/trading/components/modal"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shadcn/components/card"

type PlantDetailsPT = {
	plant: {
		발전소: string
		누적발전량: number
		거래가능: number
		SMP: { month: string; SMP: number; REC: number }[]
	}
	onBid: () => void
}

export default function PlantDetails({ plant, onBid }: PlantDetailsPT) {
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<>
			<Card className="w-full max-w-4xl">
				<CardHeader className="text-center">
					<CardTitle className="text-xl font-semibold">
						{plant.발전소} - SMP 및 REC 가격 변동
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-8 md:flex-row md:items-center">
					<div className="flex-1">
						<AreaChart
							width={500}
							height={300}
							data={plant.SMP}
							margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="month" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Area
								type="monotone"
								dataKey="SMP"
								stroke="#8884d8"
								fillOpacity={0.3}
								fill="#8884d8"
								name="SMP 가격"
							/>
							<Area
								type="monotone"
								dataKey="REC"
								stroke="#82ca9d"
								fillOpacity={0.3}
								fill="#82ca9d"
								name="REC 가격"
							/>
						</AreaChart>
					</div>
					<div className="flex w-full flex-col justify-between rounded-lg p-4 md:w-1/3">
						<div>
							<h2 className="mb-4 text-center text-lg font-semibold">
								현재 가격
							</h2>
							<div className="mb-4">
								<p className="text-center text-sm font-medium text-gray-700">
									SMP 현재가
								</p>
								<p className="text-center text-xl font-bold text-blue-500">
									₩{plant.SMP[plant.SMP.length - 1].SMP.toLocaleString()}
								</p>
							</div>
							<div>
								<p className="text-center text-sm font-medium text-gray-700">
									REC 현재가
								</p>
								<p className="text-center text-xl font-bold text-green-500">
									₩{plant.SMP[plant.SMP.length - 1].REC.toLocaleString()}
								</p>
							</div>
						</div>
						<div className="mt-8">
							<button
								className="w-full rounded border bg-gray-200 px-4 py-2 font-medium text-black hover:bg-blue-50"
								onClick={() => {
									onBid()
									setIsModalOpen(true)
								}}
							>
								입찰
							</button>
						</div>
					</div>
				</CardContent>
			</Card>

			<TradeModal
				isOpen={isModalOpen}
				setIsOpen={() => setIsModalOpen(false)}
				currentSMP={plant.SMP[plant.SMP.length - 1].SMP}
				currentREC={plant.SMP[plant.SMP.length - 1].REC}
			/>
		</>
	)
}

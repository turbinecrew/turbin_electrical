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

interface PlantDetailsProps {
	plant: {
		발전소: string
		SMP: Array<{ month: string; SMP: number; REC: number }>
	}
}

export default function PlantDetails({ plant }: PlantDetailsProps) {
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
					{/* 그래프 */}
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

					{/* 현재 SMP 및 REC 가격 */}
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
								onClick={() => setIsModalOpen(true)}
							>
								입찰
							</button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* 모달 */}
			<TradeModal
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
				currentSMP={plant.SMP[plant.SMP.length - 1].SMP}
				currentREC={plant.SMP[plant.SMP.length - 1].REC}
			/>
		</>
	)
}

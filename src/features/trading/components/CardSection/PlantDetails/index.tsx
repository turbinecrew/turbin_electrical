"use client"

import React from "react"
import {
	AreaChart,
	CartesianGrid,
	Tooltip,
	XAxis,
	YAxis,
	Legend,
	Area,
} from "recharts"

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
		변화지표: { month: string; 누적발전량: number; 거래가능발전량: number }[]
	}
	current누적발전량: number
	current거래가능: number
	handleBidOpen: (currentData: {
		누적발전량: number
		거래가능발전량: number
	}) => void
}

export default function PlantDetails({
	plant,
	current누적발전량,
	current거래가능,
	handleBidOpen,
}: PlantDetailsPT) {
	return (
		<Card className="w-full max-w-4xl">
			<CardHeader className="text-center">
				<CardTitle className="text-xl font-semibold">
					{plant.발전소} - 발전량 변화 지표
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-8 md:flex-row md:items-center">
				<div className="flex-1">
					<AreaChart
						width={500}
						height={300}
						data={plant.변화지표}
						margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Area
							type="monotone"
							dataKey="누적발전량"
							stroke="#8884d8"
							fillOpacity={0.3}
							fill="#8884d8"
							name="누적 발전량"
						/>
						<Area
							type="monotone"
							dataKey="거래가능발전량"
							stroke="#82ca9d"
							fillOpacity={0.3}
							fill="#82ca9d"
							name="거래 가능량"
						/>
					</AreaChart>
				</div>
				<div className="flex w-full flex-col justify-between rounded-lg p-4 md:w-1/3">
					<div>
						<h2 className="mb-4 text-center text-lg font-semibold">
							현재 상태
						</h2>
						<p className="text-center text-sm font-medium text-gray-700">
							현재 누적 발전량:
							<span className="font-bold text-blue-500">
								{current누적발전량.toLocaleString()} MWh
							</span>
						</p>
						<p className="text-center text-sm font-medium text-gray-700">
							현재 거래 가능량:
							<span className="font-bold text-green-500">
								{current거래가능.toLocaleString()} MWh
							</span>
						</p>
					</div>
					<div className="mt-8">
						<button
							className="w-full rounded border bg-gray-200 px-4 py-2 font-medium text-black hover:bg-blue-50"
							onClick={() =>
								handleBidOpen({
									누적발전량: current누적발전량,
									거래가능발전량: current거래가능,
								})
							}
						>
							입찰
						</button>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shadcn/components/card"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shadcn/components/chart"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shadcn/components/table"

const mockData = [
	{
		발전소: "발전소 A",
		누적발전량: 1000,
		거래가능: 400,
		SMP: [
			{ month: "01월", value: 200 },
			{ month: "02월", value: 300 },
			{ month: "03월", value: 500 },
		],
		REC: [
			{ month: "01월", value: 150 },
			{ month: "02월", value: 250 },
			{ month: "03월", value: 350 },
		],
	},
	{
		발전소: "발전소 B",
		누적발전량: 800,
		거래가능: 300,
		SMP: [
			{ month: "01월", value: 180 },
			{ month: "02월", value: 280 },
			{ month: "03월", value: 400 },
		],
		REC: [
			{ month: "01월", value: 100 },
			{ month: "02월", value: 200 },
			{ month: "03월", value: 300 },
		],
	},
]

export default function TradePage() {
	const [selectedPlant, setSelectedPlant] = useState<
		(typeof mockData)[0] | null
	>(null)

	return (
		<div className="mx-auto p-8">
			{/* 발전소 목록 */}
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

			{/* 선택된 발전소 데이터 시각화 */}
			{selectedPlant && (
				<div className="grid grid-cols-2 gap-4">
					{/* SMP 그래프 */}
					<Card>
						<CardHeader>
							<CardTitle>{selectedPlant.발전소} - SMP 가격 변동</CardTitle>
						</CardHeader>
						<CardContent>
							<ChartContainer children={undefined} config={undefined}>
								<AreaChart
									width={500}
									height={300}
									data={selectedPlant.SMP}
									margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis
										dataKey="month"
										tickFormatter={(value) => value}
										axisLine={false}
										tickLine={false}
										tickMargin={8}
									/>
									<ChartTooltip
										cursor={{ stroke: "#8884d8", strokeWidth: 2 }}
										content={<ChartTooltipContent indicator="dot" />}
									/>
									<Area
										type="monotone"
										dataKey="value"
										stroke="#8884d8"
										fillOpacity={0.3}
										fill="#8884d8"
									/>
								</AreaChart>
							</ChartContainer>
						</CardContent>
					</Card>

					{/* REC 그래프 */}
					<Card>
						<CardHeader>
							<CardTitle>{selectedPlant.발전소} - REC 가격 변동</CardTitle>
						</CardHeader>
						<CardContent>
							<ChartContainer children={undefined} config={undefined}>
								<AreaChart
									width={500}
									height={300}
									data={selectedPlant.REC}
									margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis
										dataKey="month"
										tickFormatter={(value) => value}
										axisLine={false}
										tickLine={false}
										tickMargin={8}
									/>
									<ChartTooltip
										cursor={{ stroke: "#82ca9d", strokeWidth: 2 }}
										content={<ChartTooltipContent indicator="dot" />}
									/>
									<Area
										type="monotone"
										dataKey="value"
										stroke="#82ca9d"
										fillOpacity={0.3}
										fill="#82ca9d"
									/>
								</AreaChart>
							</ChartContainer>
						</CardContent>
					</Card>
				</div>
			)}
		</div>
	)
}

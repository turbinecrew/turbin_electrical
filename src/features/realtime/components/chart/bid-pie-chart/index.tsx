"use client"

import { useMemo } from "react"
import {
	Label,
	Pie,
	PieChart,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts"

import { chartData } from "./mock"

export function BidPieChart() {
	const total = useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.number, 0)
	}, [])

	return (
		<div className="mx-auto h-[40vh] w-[100%] max-w-lg p-4">
			<div className="flex h-full items-center justify-center">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Tooltip
							contentStyle={{
								backgroundColor: "#f9f9f9",
								border: "1px solid #ddd",
							}}
							itemStyle={{ color: "#333" }}
							cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
						/>
						<Legend
							verticalAlign="bottom"
							height={36}
							align="center"
							iconType="circle"
							wrapperStyle={{ color: "#555", fontSize: "14px" }}
						/>
						<Pie
							data={chartData}
							dataKey="number"
							nameKey="type"
							cx="50%"
							cy="50%"
							innerRadius="40%"
							outerRadius="60%"
							fill="#8884d8"
							paddingAngle={5}
							label={({ name, percent }) =>
								`${name}: ${(percent * 100).toFixed(0)}%`
							}
							labelStyle={{
								fontSize: "12px",
								fill: "#444",
							}}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) - 20}
													className="text-sm text-gray-500"
												>
													TOTAL
												</tspan>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="text-lg font-bold text-gray-700"
												>
													{total.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 20}
													className="text-sm text-gray-500"
												>
													건
												</tspan>
											</text>
										)
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

"use client"
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Legend,
	ResponsiveContainer,
	Tooltip,
} from "recharts"

// import { Skeleton } from "@/common/components/skeleton"
import { useMockData } from "@/features/region/hooks/data/useMockData"

import type { DotsLineChartComponentPT } from "./type"

export function DotsLineChartComponent({
	data,
	dataKey,
	xAxisKey,
	color,
	yAxisConfig,
}: DotsLineChartComponentPT) {
	const { data: chartData } = useMockData(data)

	// if (isLoading) {
	// 	return (
	// 		<div className="h-96 w-full p-4">
	// 			<Skeleton className="h-[300px] w-full rounded-lg" />
	// 		</div>
	// 	)
	// }

	return (
		<div className="h-96 w-full p-4">
			<ResponsiveContainer width="100%" height={300}>
				<LineChart
					data={chartData}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid vertical={false} />
					<XAxis dataKey={xAxisKey} />
					<YAxis {...yAxisConfig} />
					<Tooltip
						cursor={false}
						contentStyle={{
							backgroundColor: "#fff",
							border: "1px solid #ccc",
							borderRadius: "4px",
						}}
					/>
					<Legend />
					<Line
						type="natural"
						dataKey={dataKey}
						stroke={color}
						strokeWidth={2}
						dot={{
							fill: "#FFFFFF",
						}}
						activeDot={{
							r: 6,
						}}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}

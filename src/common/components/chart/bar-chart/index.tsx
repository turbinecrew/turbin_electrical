"use client"

import {
	Bar,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Tooltip,
} from "recharts"

import { Skeleton } from "@/common/components/skeleton"
import { useMockData } from "@/features/region/hooks/data/useMockData"

import type { BarChartComponentPT } from "./BarChart"

export function BarChartComponent({
	data,
	xAxisKey,
	dataKeys,
	config,
}: BarChartComponentPT) {
	const { data: chartData, isLoading } = useMockData(data)

	if (isLoading) {
		return (
			<div className="h-96 w-full p-4">
				<Skeleton className="h-[300px] w-full rounded-lg" />
			</div>
		)
	}

	return (
		<div className="h-96 w-full p-4">
			<ResponsiveContainer width="100%" height={300}>
				<BarChart
					accessibilityLayer
					data={chartData}
					margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
				>
					<CartesianGrid
						vertical={false}
						strokeDasharray="3 3"
						stroke="#f0f0f0"
						strokeWidth={1}
					/>
					<XAxis
						dataKey={xAxisKey}
						tickLine={false}
						tickMargin={10}
						axisLine={false}
					/>
					<YAxis
						tickCount={10}
						axisLine={false}
						tickLine={false}
						tickMargin={10}
						domain={[0, "auto"]}
					/>
					<Tooltip
						cursor={false}
						contentStyle={{
							backgroundColor: "#fff",
							border: "1px solid #ccc",
							borderRadius: "4px",
						}}
					/>
					<Bar
						dataKey={dataKeys.primary}
						fill={config.primary.color}
						radius={4}
						barSize={20}
					/>
					{dataKeys.secondary && config.secondary && (
						<Bar
							dataKey={dataKeys.secondary}
							fill={config.secondary.color}
							radius={4}
							barSize={20}
						/>
					)}
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

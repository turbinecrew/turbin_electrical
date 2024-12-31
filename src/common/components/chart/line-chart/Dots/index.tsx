"use client"

import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Legend,
	ResponsiveContainer,
} from "recharts"
import type { DotsLineChartComponentPT } from "./DotsLineChart"

export function DotsLineChartComponent({
	data,
	dataKey,
	xAxisKey,
	title,
	color,
}: DotsLineChartComponentPT) {
	return (
		<div className="h-96 w-full p-4">
			<h2 className="mb-4 text-xl font-bold">{title}</h2>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart
					data={data}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid vertical={false} />
					<XAxis dataKey={xAxisKey} />
					<YAxis />
					<Legend />
					<Line
						type="natural"
						dataKey={dataKey}
						stroke={color}
						strokeWidth={2}
						dot={{
							fill: "#000000",
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

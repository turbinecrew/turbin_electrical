// src/features/prediction/components/DailyChart.tsx
"use client"

import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
} from "recharts"

// 예시: 하드코딩된 날짜별 발전량
const lineChartData = [
	{ 날짜: "17일", 발전량: 500 },
	{ 날짜: "18일", 발전량: 1200 },
	{ 날짜: "19일", 발전량: 900 },
	{ 날짜: "20일", 발전량: 1000 },
	{ 날짜: "21일", 발전량: 800 },
]

export default function DailyChart() {
	return (
		<div className="p-4 shadow-md">
			<h2 className="mb-2 text-xl font-bold">날짜별 발전량</h2>
			<LineChart
				width={600}
				height={300}
				data={lineChartData}
				margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="날짜" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type="monotone"
					dataKey="발전량"
					stroke="#82ca9d"
					strokeWidth={2}
				/>
			</LineChart>
		</div>
	)
}

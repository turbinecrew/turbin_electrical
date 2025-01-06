"use client"

import { LinearLineChartComponent } from "@/common/components/chart/line-chart/Linear"
const lineChartData = [
	{ 날짜: "17일", 발전량: 500 },
	{ 날짜: "18일", 발전량: 1200 },
	{ 날짜: "19일", 발전량: 900 },
	{ 날짜: "20일", 발전량: 1000 },
	{ 날짜: "21일", 발전량: 800 },
]

export default function DailyChart() {
	return (
		<LinearLineChartComponent
			data={lineChartData}
			dataKey="발전량"
			xAxisKey="날짜"
			color="#82ca9d"
		/>
	)
}

"use client"

import { DotsLineChartComponent } from "@/common/components/chart/line-chart/Dots"

import { WeeklyWeatherData } from "./mocks"

export default function DailyChart() {
	return (
		<DotsLineChartComponent
			data={WeeklyWeatherData}
			dataKey="발전량"
			xAxisKey="날짜"
			title="날짜별 발전량"
			color="#82ca9d"
		/>
	)
}

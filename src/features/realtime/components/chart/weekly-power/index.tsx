"use client"

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
} from "chart.js"
import React from "react"
import { Line } from "react-chartjs-2"

import { mockData } from "./mock"

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
)

type ProcessedData = {
	날짜: string
	발전량: number
	잔여거래량: number
}

export default function WeeklyPower() {
	const processedData: ProcessedData[] = mockData.reduce(
		(acc: ProcessedData[], item) => {
			const existingItem = acc.find((data) => data.날짜 === item.날짜)
			if (!existingItem) {
				acc.push({
					날짜: item.날짜,
					발전량: item["발전량(kW)"],
					잔여거래량: item["누적발전량(kWh)"] - item["누적거래량(kWh)"],
				})
			}
			return acc
		},
		[],
	)

	const chartData = {
		labels: [...new Set(processedData.map((item) => item.날짜))],
		datasets: [
			{
				label: "발전량 (kW)",
				data: processedData.map((item) => item.발전량),
				fill: true,
				backgroundColor: "rgba(135, 206, 250, 0.2)",
				borderColor: "rgba(70, 130, 180, 1)",
				borderWidth: 2,
				tension: 0.4,
			},
		],
	}

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: "top",
			},
			title: {
				display: true,
				text: "주간 전력 생산량",
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						const index = context.dataIndex
						const item = processedData[index]
						return [
							`발전량: ${item.발전량} kW`,
							`잔여 거래량: ${item.잔여거래량.toLocaleString()} kWh`,
						]
					},
				},
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: "날짜",
				},
			},
			y: {
				title: {
					display: true,
					text: "발전량 (kW)",
				},
			},
		},
	}

	return (
		<div style={{ width: "100%", height: "400px" }}>
			<Line data={chartData} options={options} />
		</div>
	)
}

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
	ChartOptions,
} from "chart.js"
import { Line } from "react-chartjs-2"

import { useWeeklyPowerData } from "@/features/realtime/hooks/weekly-power-chart/useWeeklyPowerData"

// Chart.js에 필요한 스케일 및 요소 등록
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
)

export default function WeeklyPowerChart() {
	const { data = [], isLoading, isError } = useWeeklyPowerData()

	if (isLoading) return <p>Loading...</p>
	if (isError) return <p>Error loading data.</p>

	const chartData = {
		labels: data.map((item) => item.날짜),
		datasets: [
			{
				label: "발전량 (kW)",
				data: data.map((item) => item.발전량),
				fill: true,
				backgroundColor: "rgba(135, 206, 250, 0.2)",
				borderColor: "rgba(70, 130, 180, 1)",
				borderWidth: 2,
				tension: 0.4,
			},
		],
	}

	// Chart.js 옵션 정의
	const options: ChartOptions<"line"> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true,
				position: "top",
			},
			title: {
				display: true,
				text: "주간 전력 생산량",
			},
		},
		scales: {
			x: {
				type: "category", // 명시적으로 'category' 타입 지정
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
		<div className="h-[50vh] w-full">
			<Line data={chartData} options={options} />
		</div>
	)
}

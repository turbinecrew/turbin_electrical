"use client"

<<<<<<< Updated upstream
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts"
=======
import { LinearLineChartComponent } from "@/common/components/chart/line-chart/Dots/linear"
>>>>>>> Stashed changes

const lineChartData = [
	{ 날짜: "17일", 발전량: 500 },
	{ 날짜: "18일", 발전량: 1200 },
	{ 날짜: "19일", 발전량: 900 },
	{ 날짜: "20일", 발전량: 1000 },
	{ 날짜: "21일", 발전량: 800 },
]

export default function DailyChart() {
	return (
<<<<<<< Updated upstream
		<div className="h-96 w-full p-4">
			<h2 className="mb-4 text-xl font-bold">날짜별 발전량</h2>
			<div className="h-full w-full">
				<ResponsiveContainer w-full h-full>
					<LineChart
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
				</ResponsiveContainer>
			</div>
		</div>
=======
		<LinearLineChartComponent
			data={WeeklyWeatherData}
			dataKey="발전량"
			xAxisKey="날짜"
			color="#82ca9d"
		/>
>>>>>>> Stashed changes
	)
}

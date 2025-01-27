"use client"

import { useState, useMemo } from "react"
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

import { usePredictAmgoData } from "@/features/predict/hooks/usePredictAmgoData"
import RegionSelect from "@/features/region/components/regionselect"
import { roundToOneDecimal } from "@/util/utils"

export default function DailyChart() {
	const { data } = usePredictAmgoData()

	const [selectedRegion, setSelectedRegion] = useState<string>("충청북도")

	const regions = useMemo(() => {
		if (!data) return []
		return Array.from(new Set(data.map((item) => item.region)))
	}, [data])

	const chartData = useMemo(() => {
		if (!data) return []

		return data
			.filter((item) => item.region === selectedRegion)
			.map((item) => ({
				날짜: item.date,
				발전량: roundToOneDecimal(item.predict_amgo),
			}))
	}, [data, selectedRegion])

	return (
		<div className="w-full overflow-hidden">
			<div className="mb-2 text-xl font-bold">날짜별 발전량</div>
			<div className="mb-2">
				<RegionSelect
					regions={regions}
					selectedRegion={selectedRegion}
					onChange={setSelectedRegion}
				/>
			</div>

			<div className="h-96 w-full">
				<ResponsiveContainer w-full h-full>
					<LineChart
						data={chartData}
						margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey="날짜"
							className="text-sm"
							tickFormatter={(dateString) => {
								const date = new Date(dateString)
								const month = date.getMonth() + 1
								const day = date.getDate()
								return `${month}월 ${day}일`
							}}
						/>
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
	)
}

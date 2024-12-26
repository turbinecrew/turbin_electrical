"use client"

import { useState } from "react"
import {
	ComposedChart,
	Bar,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts"

import { getTodayString } from "@/features/region/hooks/data/useDateUtils"
import useFilteredData from "@/features/region/hooks/data/useFilteredData"
import mockData from "@/features/region/components/regionaltable/mock"

export default function WeatherChart() {
	const [selectedRegion, setSelectedRegion] = useState("강원특별자치도")

	// 오늘 날짜 계산
	const today = getTodayString()

	// 필터링된 데이터
	const filteredData = useFilteredData(mockData, {
		selectedRegion,
		today,
		startHour: 9,
		endHour: 17,
	})

	return (
		<div className="w-full space-y-4 p-4">
			<h2 className="text-xl font-bold text-gray-700">지역별 기상 데이터</h2>

			<div className="flex justify-start">
				<select
					value={selectedRegion}
					onChange={(e) => setSelectedRegion(e.target.value)}
					className="w-36 rounded border border-gray-300 p-1 text-sm shadow-sm"
				>
					{Array.from(new Set(mockData.map((item) => item.지역))).map(
						(region) => (
							<option key={region} value={region} className="text-sm">
								{region}
							</option>
						),
					)}
				</select>
			</div>

			<div className="h-80 w-full">
				<ResponsiveContainer>
					<ComposedChart data={filteredData}>
						<CartesianGrid strokeDasharray="3 3" />

						<XAxis dataKey="시간" className="text-sm" />

						<YAxis
							yAxisId="irradiance"
							orientation="left"
							label={{
								value: "일사량(W/㎡)",
								angle: -90,
								position: "insideLeft",
								style: { fontSize: "14px", fontWeight: "bold" },
							}}
							stroke="#FFA500"
						/>

						<YAxis
							yAxisId="temperature"
							orientation="right"
							label={{
								value: "기온(℃)",
								angle: 90,
								position: "insideRight",
								style: {
									fontSize: "14px",
									fontWeight: "bold",
									fill: "#FF0000",
								},
							}}
							stroke="#FF0000"
						/>

						<YAxis
							yAxisId="wind"
							orientation="right"
							label={{
								value: "풍속(㎧)",
								angle: 90,
								position: "outsideRight",
								style: {
									fontSize: "14px",
									fontWeight: "bold",
									fill: "#008000",
								},
							}}
							stroke="#008000"
						/>

						<Tooltip />
						<Legend />

						<Bar
							yAxisId="irradiance"
							dataKey="일사량(W/㎡)"
							fill="#FFA500"
							barSize={20}
						/>

						<Line
							yAxisId="temperature"
							dataKey="기온(℃)"
							stroke="#FF0000"
							dot={{ fill: "#FF0000", r: 2 }}
							strokeWidth={1.5}
						/>

						<Line
							yAxisId="wind"
							dataKey="풍속(㎧)"
							stroke="#008000"
							dot={{ fill: "#008000", r: 2 }}
							strokeWidth={1.5}
							strokeDasharray="3 3"
						/>
					</ComposedChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

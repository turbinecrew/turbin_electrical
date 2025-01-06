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
	ResponsiveContainer,
} from "recharts"

import mockData from "@/features/region/components/regionaltable/mock"
import RegionSelect from "@/features/region/components/regionselect"
import { getTodayString } from "@/features/region/hooks/data/useDateUtils"
import useFilteredData from "@/features/region/hooks/data/useFilteredData"

export default function WeatherChart() {
	const [selectedRegion, setSelectedRegion] = useState("강원특별자치도")
	const [activeKey, setActiveKey] = useState("일사량(W/㎡)")

	// 오늘 날짜 계산
	const today = getTodayString()

	// 필터링된 데이터
	const filteredData = useFilteredData(mockData, {
		selectedRegion,
		today,
		startHour: 9,
		endHour: 17,
	})

	// 지역 목록 생성
	const regions = Array.from(new Set(mockData?.map((item) => item.지역) || []))

	return (
		<div className="w-full space-y-4 p-4">
			<h2 className="text-xl font-bold text-gray-700">지역별 기상 데이터</h2>

			<div>
				<div className="mb-4">
					<RegionSelect
						regions={regions}
						selectedRegion={selectedRegion}
						onChange={setSelectedRegion}
					/>
				</div>
			</div>

			<div className="flex cursor-pointer justify-around pb-2 text-sm font-semibold">
				<span
					className={`px-4 py-1 ${
						activeKey === "일사량(W/㎡)"
							? "border-b-2 border-orange-500 text-orange-500"
							: "text-gray-500"
					}`}
					onClick={() => setActiveKey("일사량(W/㎡)")}
				>
					일사량(W/㎡)
				</span>
				<span
					className={`px-4 py-1 ${
						activeKey === "기온(℃)"
							? "border-b-2 border-red-500 text-red-500"
							: "text-gray-500"
					}`}
					onClick={() => setActiveKey("기온(℃)")}
				>
					기온(℃)
				</span>
				<span
					className={`px-4 py-1 ${
						activeKey === "풍속(㎧)"
							? "border-b-2 border-green-500 text-green-500"
							: "text-gray-500"
					}`}
					onClick={() => setActiveKey("풍속(㎧)")}
				>
					풍속(㎧)
				</span>
			</div>

			<div className="h-80 w-full">
				<ResponsiveContainer w-full h-full>
					<ComposedChart data={filteredData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="시간" className="text-sm" />
						<YAxis
							label={{
								value: activeKey,
								angle: -90,
								position: "insideLeft",
								style: { fontSize: "14px", fontWeight: "bold" },
							}}
						/>
						<Tooltip />

						{activeKey === "일사량(W/㎡)" && (
							<Bar dataKey="일사량(W/㎡)" fill="#FFA500" barSize={20} />
						)}
						{activeKey === "기온(℃)" && (
							<Line
								dataKey="기온(℃)"
								stroke="#FF0000"
								dot={{ fill: "#FF0000", r: 2 }}
								strokeWidth={1.5}
							/>
						)}
						{activeKey === "풍속(㎧)" && (
							<Line
								dataKey="풍속(㎧)"
								stroke="#008000"
								dot={{ fill: "#008000", r: 2 }}
								strokeWidth={1.5}
								strokeDasharray="3 3"
							/>
						)}
					</ComposedChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

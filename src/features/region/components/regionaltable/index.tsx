"use client"

import { useState } from "react"

import mockData from "@/features/region/components/regionaltable/mock"
import {
	getTodayString,
	formatMonthDay,
} from "@/features/region/hooks/data/useDateUtils"
import useFilteredData from "@/features/region/hooks/data/useFilteredData"

import RegionSelect from "../regionselect"

export default function RegionalTable() {
	const [selectedRegion, setSelectedRegion] = useState("강원특별자치도")

	const today = getTodayString()
	const currentDayData = useFilteredData(mockData, {
		selectedRegion,
		today,
		startHour: 9,
		endHour: 17,
	})

	const formattedToday = formatMonthDay(today)

	const regions = Array.from(new Set(mockData?.map((item) => item.지역) || [])) // 기본값 설정

	return (
		<div className="mx-auto mt-8 w-full">
			<div className="w-full">
				<div className="mb-4">
					<RegionSelect
						regions={regions}
						selectedRegion={selectedRegion}
						onChange={setSelectedRegion}
					/>
				</div>

				<table className="w-full table-auto border-collapse border border-gray-300 text-center">
					<thead className="bg-gray-100">
						<tr>
							<th colSpan={6} className="border border-gray-300 px-4 py-2">
								오늘({formattedToday})
							</th>
						</tr>
						<tr>
							<th className="border border-gray-300 px-4 py-2">시간</th>
							<th className="border border-gray-300 px-4 py-2">발전량(kW)</th>
							<th className="border border-gray-300 px-4 py-2">
								누적발전량(kWh)
							</th>
							<th className="border border-gray-300 px-4 py-2">일사량(W/㎡)</th>
							<th className="border border-gray-300 px-4 py-2">기온(℃)</th>
							<th className="border border-gray-300 px-4 py-2">풍속(㎧)</th>
						</tr>
					</thead>
					<tbody>
						{currentDayData.length > 0 ? (
							currentDayData.map((item, index) => (
								<tr key={index}>
									<td className="border border-gray-300 px-4 py-2">
										{item.시간}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{item["발전량(kW)"]}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{item["누적발전량(kWh)"]}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{item["일사량(W/㎡)"]}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{item["기온(℃)"]}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{item["풍속(㎧)"]}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={6} className="border border-gray-300 px-4 py-2">
									데이터 없음
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}

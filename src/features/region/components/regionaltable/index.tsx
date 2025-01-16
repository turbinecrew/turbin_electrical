"use client"

import { useState } from "react"

import { useRegionalWeatherData } from "@/features/predict/hooks/useRegionalWeatherData"
import {
	getTodayString,
	formatMonthDay,
} from "@/features/region/hooks/data/useDateUtils"
import useFilteredData from "@/features/region/hooks/data/useFilteredData"
import { Table, TableBody } from "@/shadcn/components/table"

import RegionSelect from "../regionselect"

import RegionalTableBody from "./RegionalTableBody"

export default function RegionalTable() {
	const [selectedRegion, setSelectedRegion] = useState("강원특별자치도")
	const {
		data: weatherData,
		isLoading,
		isError,
		error,
	} = useRegionalWeatherData()

	const today = getTodayString()
	const currentDayData = useFilteredData(weatherData, {
		selectedRegion,
		today,
		startHour: 9,
		endHour: 17,
	})

	const formattedToday = formatMonthDay(today)

	if (isLoading) return <p>로딩중...</p>
	if (isError) return <p>에러 발생: {error?.message}</p>

	return (
		<div className="mx-auto w-full">
			<div className="mb-2 mt-2 text-xl font-bold">지역별 발전량 예측</div>
			<div className="w-full">
				<div className="mb-4">
					<RegionSelect
						selectedRegion={selectedRegion}
						onChange={setSelectedRegion}
					/>
				</div>
				<Table className="w-full">
					<TableBody>
						<RegionalTableBody
							data={currentDayData}
							formattedToday={formattedToday}
						/>
					</TableBody>
				</Table>
			</div>
		</div>
	)
}

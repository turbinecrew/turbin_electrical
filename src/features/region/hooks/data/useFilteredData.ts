import { useMemo } from "react"

import { roundToOneDecimal } from "@/util/utils"

import type { DataEntry } from "../../types/regionTable"

export type FilterOptions = {
	selectedRegion: string
	today: string
	startHour?: number
	endHour?: number
}

export default function useFilteredData(
	data: DataEntry[] | undefined,
	{ selectedRegion, today, startHour = 9, endHour = 17 }: FilterOptions,
): DataEntry[] {
	return useMemo(() => {
		if (!data || data.length === 0) return []

		return data
			.filter(
				(item) =>
					item.time &&
					(selectedRegion === "전국" || item.region === selectedRegion) &&
					item.date === today &&
					parseInt(item.time.split(":")[0], 10) >= startHour &&
					parseInt(item.time.split(":")[0], 10) <= endHour,
			)
			.map((item) => ({
				...item,
				"기온(℃)": roundToOneDecimal(item.temperature_c),
				"풍속(㎧)": roundToOneDecimal(item.wind_speed_m_s),
				"일사량(W/㎡)": roundToOneDecimal(item.solar_radiation_w_m2),
				"발전량(kW)": item.generation_kw,
				"누적발전량(kWh)": item.cumulative_generation_kwh,
			}))
			.sort(
				(a, b) =>
					parseInt(a.time.split(":")[0], 10) -
					parseInt(b.time.split(":")[0], 10),
			)
	}, [data, selectedRegion, today, startHour, endHour])
}

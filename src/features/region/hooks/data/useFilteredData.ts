import { useMemo } from "react"

import type { DataEntry } from "@/features/region/types/regionTable"

export interface FilterOptions {
	selectedRegion: string
	today: string
	startHour?: number
	endHour?: number
}

export function roundToOneDecimal(value: number): number {
	return Math.round(value * 10) / 10 // 소수점 한 자리에서 반올림
}

export default function useFilteredData(
	data: DataEntry[],
	{ selectedRegion, today, startHour = 9, endHour = 17 }: FilterOptions,
): DataEntry[] {
	return useMemo(() => {
		return data
			.filter(
				(item) =>
					(selectedRegion === "전국" || item.지역 === selectedRegion) &&
					item.날짜 === today &&
					parseInt(item.시간.replace("시", ""), 10) >= startHour &&
					parseInt(item.시간.replace("시", ""), 10) <= endHour,
			)
			.map((item) => ({
				...item,
				"기온(℃)": roundToOneDecimal(item["기온(℃)"]),
				"풍속(㎧)": roundToOneDecimal(item["풍속(㎧)"]),
				"일사량(W/㎡)": roundToOneDecimal(item["일사량(W/㎡)"]),
			}))
			.sort(
				(a, b) =>
					parseInt(a.시간.replace("시", ""), 10) -
					parseInt(b.시간.replace("시", ""), 10),
			)
	}, [data, selectedRegion, today, startHour, endHour])
}

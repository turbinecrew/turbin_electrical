"use client"

import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/queryKeys"

import { DataEntry } from "@/features/region/types/regionTable"
import { regionMap } from "@/features/region/types/regionMap"
import { fetchRegionalWeatherData } from "../api/fetchRegionalWeatherData"

export const useRegionalWeatherData = (): UseQueryResult<DataEntry[]> => {
	return useQuery({
		queryKey: [QUERY_KEYS.TIME_BASED_GENERATION],
		queryFn: fetchRegionalWeatherData,
		staleTime: 1000 * 60 * 5,
		retry: 3,

		select: (rawData: any[]) => {
			return rawData.map((item) => ({
				_id: item._id,
				date: item.date,

				region: regionMap[item.region] ?? item.region,
				time: item.time,
				generation_kw: item.generation_kw,
				cumulative_generation_kwh: item.cumulative_generation_kwh,
				solar_radiation_w_m2: item.solar_radiation_w_m2,
				temperature_c: item.temperature_c,
				wind_speed_m_s: item.wind_speed_m_s,
			})) as DataEntry[]
		},
	})
}

"use client"

import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/queryKeys"
import { fetchPredictAmgoData } from "../api/fetchPredictAmgoData"
import type { PredictAmgoData } from "../type/types"
import { regionMap } from "@/features/region/types/regionMap"

export const usePredictAmgoData = (): UseQueryResult<PredictAmgoData[]> => {
	return useQuery({
		queryKey: [QUERY_KEYS.AMGO],
		queryFn: fetchPredictAmgoData,
		staleTime: 1000 * 60 * 5,
		retry: 3,

		select: (rawData: any[]) => {
			return rawData.map((item) => ({
				_id: item._id,
				date: item.날짜,
				region: regionMap[item.지역],
				predict_amgo: item.predict_amgo,
			})) as PredictAmgoData[]
		},
	})
}

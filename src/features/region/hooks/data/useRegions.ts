import { useMemo } from "react"

import type { DataEntry } from "@/features/region/types/regionTable"

/**
 * 데이터에서 고유한 지역 목록을 추출하는 훅
 * @param {DataEntry[]} data - 데이터 배열
 * @returns {string[]} 고유한 지역 목록
 */
export default function useRegions(data: DataEntry[] = []): string[] {
	return useMemo(() => {
		// 지역 목록 추출 및 중복 제거
		if (!data || data.length === 0) return []
		const regions = data
			.map((item) => item.지역)
			.filter((region) => region !== undefined)
		return Array.from(new Set(regions))
	}, [data])
}

"use client"
import { useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/constants/queryKeys"
import { fetchSmpData } from "@/features/smp/api/fetchSmpData"

export const useSmpData = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.SMP_DATA], // 고유한 키
		queryFn: fetchSmpData, // 데이터를 가져오는 함수
		staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
		retry: 3, // 실패 시 재시도
	})
}

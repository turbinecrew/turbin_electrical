"use client"
import { useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/constants/queryKeys"

import { fetchPastRECData } from "../api/fetchPastRECData"

export const usePastRECData = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.PAST_REC], // 고유한 키
		queryFn: fetchPastRECData, // 데이터를 가져오는 함수
		staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
		retry: 3, // 실패 시 재시도
	})
}

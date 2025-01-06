import { useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/constants/queryKeys"

import { fetchAmgoData } from "../../api/fetchAmgoData"

export function useAmgoData() {
	return useQuery({
		queryKey: [QUERY_KEYS.AMGO_DATA], // 고유한 키
		queryFn: fetchAmgoData, // 데이터를 가져오는 함수
		staleTime: 1000 * 60 * 5,
		retry: 3,
	})
}

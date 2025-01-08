import { useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/constants/queryKeys"
import { fetchRecData } from "@/features/rec/api/fetchRecData"

export const useRecData = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.REC_DATA],
		queryFn: fetchRecData,
		staleTime: 1000 * 60 * 5,
		retry: 3,
	})
}

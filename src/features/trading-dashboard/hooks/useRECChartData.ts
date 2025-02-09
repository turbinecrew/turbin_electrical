import { useQuery } from "@tanstack/react-query"

import { fetchRECChartData } from "@/features/trading-dashboard/api/chart/fetchRECChartData"

export const useRECChartData = () => {
	return useQuery({
		queryKey: ["REC_CHART_DATA"],
		queryFn: fetchRECChartData,
		staleTime: 1000 * 60 * 5, // 캐시의 유효 시간을 5분으로 설정
		retry: 3, // 실패 시 최대 3번 재시도
	})
}

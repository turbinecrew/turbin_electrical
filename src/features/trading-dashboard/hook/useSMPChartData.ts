import { useQuery } from "@tanstack/react-query"

import { fetchTodaySMPData } from "@/features/trading-dashboard/api/fetchTodaySMPData"
import { fetchWeeklySMPData } from "@/features/trading-dashboard/api/fetchWeeklySMPData"

export const useSMPChartData = (timeRange: string) => {
	const fetchData = timeRange === "1d" ? fetchTodaySMPData : fetchWeeklySMPData

	return useQuery({
		queryKey: ["smpData", timeRange],
		queryFn: fetchData,
		staleTime: 1000 * 60 * 5,
		retry: 3,
	})
}

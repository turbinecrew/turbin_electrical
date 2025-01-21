import { useQuery } from "@tanstack/react-query"

import { fetchGenRegionalElcData } from "@/features/realtime/api/fetchGenRegionalElcData"
import type { ProcessedData } from "@/features/realtime/types/weeklyPower"
import { processWeeklyData } from "@/features/realtime/utils/ProcessWeeklyData"

export function useWeeklyPowerData() {
	return useQuery<ProcessedData[], Error>({
		queryKey: ["weeklyPowerData"],
		queryFn: async () => {
			const rawData = await fetchGenRegionalElcData()
			return processWeeklyData(rawData)
		},
		staleTime: 60 * 1000,
		retry: 1,
	})
}

import { useQuery } from "@tanstack/react-query"

import { fetchRegionStats } from "@/util/api/region"

export function useRegionStats() {
	return useQuery({
		queryKey: ["regionOverviewStatics"],
		queryFn: fetchRegionStats,
		staleTime: 1000 * 60 * 5,
		retry: 3,
	})
}

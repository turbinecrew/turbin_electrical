import { useQuery } from "@tanstack/react-query"

import { fetchRegionData } from "@/features/region/api/fetchRegionData"

export function useRegionData() {
	return useQuery({
		queryKey: ["regionOverviewStatics"],
		queryFn: fetchRegionData,
		staleTime: 1000 * 60 * 5,
		retry: 3,
	})
}

import { useEffect, useState } from "react"

import { fetchGenRegionalElcData } from "@/features/realtime/api/fetchGenRegionalElcData"
import type { ProcessedData } from "@/features/realtime/types/weeklyPower"
import { processWeeklyData } from "@/features/realtime/utils/ProcessWeeklyData"

export function useWeeklyPowerData() {
	const [data, setData] = useState<ProcessedData[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true)
				const rawData = await fetchGenRegionalElcData()
				const processedData = processWeeklyData(rawData)
				setData(processedData)
			} catch (error) {
				console.error("Error fetching weekly power data:", error)
				setIsError(true)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [])

	return { data, isLoading, isError }
}

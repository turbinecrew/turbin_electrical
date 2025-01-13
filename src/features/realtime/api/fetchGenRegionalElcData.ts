import { axiosInstance } from "@/config/axios"
import type { RawData } from "@/features/realtime/types/weeklyPower"

export const fetchGenRegionalElcData = async (): Promise<RawData[]> => {
	const response = await axiosInstance.get("/time-based-generation")
	return response.data
}

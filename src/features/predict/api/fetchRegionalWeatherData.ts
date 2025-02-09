import { axiosInstance } from "@/config/axios"

export const fetchRegionalWeatherData = async () => {
	const response = await axiosInstance.get("/TimeBasedGeneration")
	return response.data
}

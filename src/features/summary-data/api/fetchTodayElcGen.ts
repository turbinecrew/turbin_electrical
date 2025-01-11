import { axiosInstance } from "@/config/axios"

export const fetchTodayElcGen = async () => {
	const response = await axiosInstance.get("/time-based-generation")
	return response.data
}

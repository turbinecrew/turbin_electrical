import { axiosInstance } from "@/config/axios"

export const fetchTodayRECData = async () => {
	const response = await axiosInstance.get("/TodayREC")
	return response.data
}

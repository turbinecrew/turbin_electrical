import { axiosInstance } from "@/config/axios"

export const fetchTodaySMPData = async () => {
	const response = await axiosInstance.get("/TodaySMP")
	return response.data
}

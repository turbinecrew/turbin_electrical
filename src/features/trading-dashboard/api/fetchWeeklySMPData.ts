import { axiosInstance } from "@/config/axios"

export const fetchWeeklySMPData = async () => {
	const response = await axiosInstance.get("/WeeklySMP")
	return response.data
}

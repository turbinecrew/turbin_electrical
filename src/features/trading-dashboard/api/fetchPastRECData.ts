import { axiosInstance } from "@/config/axios"

export const fetchPastRECData = async () => {
	const response = await axiosInstance.get("/pastREC")
	return response.data
}

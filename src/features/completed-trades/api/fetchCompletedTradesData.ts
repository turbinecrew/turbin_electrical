import { axiosInstance } from "@/config/axios"

export const fetchCompletedTradesData = async () => {
	const response = await axiosInstance.get("/CompletedTrades")
	return response.data
}

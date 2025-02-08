import { axiosInstance } from "@/config/axios"

export const fetchTradeData = async () => {
	const response = await axiosInstance.get("/Trade")
	return response.data
}

import { axiosInstance } from "@/config/axios"

export const fetchTradeAmgoData = async () => {
	const response = await axiosInstance.get("/Trade_amgo")
	return response.data
}

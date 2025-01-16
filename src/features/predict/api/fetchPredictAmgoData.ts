import { axiosInstance } from "@/config/axios"

export const fetchPredictAmgoData = async () => {
	const response = await axiosInstance.get("/PredictAmgo")
	return response.data
}

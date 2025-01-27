import { axiosInstance } from "@/config/axios"

export const fetchGenerationData = async () => {
	const response = await axiosInstance.get("/amgo")
	return response.data
}

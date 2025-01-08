import { axiosInstance } from "@/config/axios"

export const fetchSmpData = async () => {
	const response = await axiosInstance.get("/smp")
	return response.data
}

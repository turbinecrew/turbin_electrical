import { axiosInstance } from "@/config/axios"

export const fetchRecData = async () => {
	const response = await axiosInstance.get("/rec") // /rec은 REC 데이터 API 경로
	return response.data
}

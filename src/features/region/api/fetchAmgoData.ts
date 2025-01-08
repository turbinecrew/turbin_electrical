// features/amgo/api/fetchAmgoData.ts
import { axiosInstance } from "@/config/axios"

export const fetchAmgoData = async () => {
	const response = await axiosInstance.get("/amgo") // /amgo는 AMGO 데이터 API 경로
	return response.data
}

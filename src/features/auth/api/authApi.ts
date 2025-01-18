import { axiosInstance } from "@/config/axios"
export interface LoginResponse {
	accessToken: string
	refreshToken: string
}
// 로그인 요청
export const postLogin = async (formData: {
	email: string
	password: string
}): Promise<LoginResponse> => {
	console.log("Axios 요청 데이터:", formData)
	const response = await axiosInstance.post("/Auth/login", formData)
	console.log("Axios 응답 데이터:", response.data)
	return response.data
}

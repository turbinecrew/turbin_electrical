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
// // 로그아웃 요청
// export const logout = async () => {
// 	const response = await axiosInstance.post("/auth/logout")
// 	return response.data
// }

// 회원가입 요청
// export const signUp = async (formData: {
// 	email: string
// 	password: string
// }) => {
// 	const response = await axiosInstance.post("/auth/signup", formData)
// 	return response.data
// }

// // 사용자 정보 수정 요청 (PATCH)
// export const updateUser = async (updatedData: {
// 	name?: string
// 	password?: string
// }) => {
// 	const response = await axiosInstance.patch("/auth/update", updatedData)
// 	return response.data
// }

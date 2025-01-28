import { axiosInstance } from "@/config/axios"

interface UserResponse {
	authenticated: boolean
	message: string
	user: {
		email: string
		businessName: string
		businessNumber: string
		businessOwner: string
		businessAddress: string
		role: string
		createdAt: string
		updatedAt: string
	}
}

export const fetchUserData = async (): Promise<UserResponse> => {
	const response = await axiosInstance.get("/Auth/getUsers") // API 호출
	return response.data // 응답 데이터 반환
}

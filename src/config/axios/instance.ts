import axios from "axios"

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_NEXTAUTH_URL, // 서버에서 데이터에 접근할 경로
	timeout: 5000, // 요청 시간 초과 설정
	headers: { "Content-Type": "application/json" },
})

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
	(config) => {
		// 추후 로그인 과정 추가할시 추가예정
		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("Response Error:", error)
		return Promise.reject(error)
	},
)

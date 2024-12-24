import axios from "axios"

export const axiosInstance = axios.create({
	baseURL: "https://apis.data.go.kr/B552115",
	timeout: 5000,
	headers: { "Content-Type": "application/json" },
})
// 요청 인터셉터
axiosInstance.interceptors.request.use(
	(config) => {
		const accessToken = process.env.NEXT_PUBLIC_API_KEY
		if (accessToken && config.headers) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	},
	function (error) {
		console.error("Request Error:", error)
		return Promise.reject(error)
	},
)
// 응답 인터셉터
axiosInstance.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		console.error("Response Error:", error.response?.data || error.message)
		return Promise.reject(error)
	},
)

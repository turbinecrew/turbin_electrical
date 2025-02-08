import { axiosInstance } from "@/config/axios"

export const fetchNotificationsData = async () => {
	const response = await axiosInstance.get("/Notifications")
	return response.data
}

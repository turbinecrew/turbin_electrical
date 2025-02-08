import { axiosInstance } from "@/config/axios"

export const createNotificationData = async ({
	user_id,
	type,
	title,
	message,
	content_link,
}: {
	user_id: string
	type: string
	title: string
	message: string
	content_link: string
}) => {
	try {
		const response = await axiosInstance.post(
			`/Notifications/createNotification?` +
				new URLSearchParams({
					userId: user_id,
					type,
					title,
					message,
					link: content_link,
				}),
		)
		return response.data
	} catch (error) {
		console.error("Error creating notification:", error)
		throw error
	}
}

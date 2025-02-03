export type TNotificationData = {
	_id: string
	user_id: string
	type: string
	title: string
	message: string
	data: {
		content_link: string
	}
	is_read: boolean
	created_at: Date
	updated_at: Date | null
	deleted_at: Date | null
}

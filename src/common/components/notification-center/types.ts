export type TNotificationData = {
	_id: string
	user_id: string
	data: { type: string; title: string; message: string; content_link: string }
	is_read: boolean
	created_at: Date
	updated_at: Date | null
	deleted_at: Date | null
}

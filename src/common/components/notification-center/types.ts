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
	created_at: { $date: string }
	updated_at: { $date: Date } | null
	deleted_at: { $date: Date } | null
}

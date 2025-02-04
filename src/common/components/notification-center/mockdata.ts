export const notificationData = [
	{
		_id: {
			$oid: "679f2eec7c2b9d8646d30cc2",
		},
		user_id: {
			$oid: "65bcf5e5a4b0d6a9a7b8c9d0",
		},
		data: {
			type: "notice",
			title: "알림입니다",
			message: "알림상세메시지",
			content_link: "/trading",
		},
		is_read: false,
		created_at: {
			$date: "2025-02-02T08:38:04.206Z",
		},
		updated_at: null,
		deleted_at: null,
	},
	{
		_id: {
			$oid: "679f2f487c2b9d8646d30cc3",
		},
		user_id: {
			$oid: "65bcf5e5a4b0d6a9a7b8c9d0",
		},
		data: {
			type: "regionPage",
			title: "지역",
			message: "지역별데이터에업데이트",
			content_link: "/region",
		},
		is_read: false,
		created_at: {
			$date: "2025-02-02T08:39:36.011Z",
		},
		updated_at: null,
		deleted_at: null,
	},
	{
		_id: {
			$oid: "679f30ea7c2b9d8646d30cc4",
		},
		user_id: {
			$oid: "65bcf5e5a4b0d6a9a7b8c9d0",
		},
		data: {
			type: "user",
			title: "유저정보",
			message: "내정보변경완료",
			content_link: "/profile",
		},
		is_read: false,
		created_at: {
			$date: "2025-02-02T08:46:34.206Z",
		},
		updated_at: null,
		deleted_at: null,
	},
	{
		_id: {
			$oid: "679f31427c2b9d8646d30cc5",
		},
		user_id: {
			$oid: "65bcf5e5a4b0d6a9a7b8c9d0",
		},
		data: {
			type: "warnig",
			title: "경고 알림",
			message: "계좌에 이상 징후가 감지되었습니다.",
			content_link: "/profile",
		},
		is_read: false,
		created_at: {
			$date: "2025-02-02T08:38:04.206Z",
		},
		updated_at: null,
		deleted_at: null,
	},
	{
		_id: {
			$oid: "679f31577c2b9d8646d30cc6",
		},
		user_id: {
			$oid: "65bcf5e5a4b0d6a9a7b8c9d0",
		},
		data: {
			type: "tradingConfirm",
			title: "거래 확인",
			message: "거래가 성공적으로 확인되었습니다.",
			content_link: "/trading",
		},
		is_read: false,
		created_at: {
			$date: "2025-02-02T09:20:30.000Z",
		},
		updated_at: null,
		deleted_at: null,
	},
	{
		_id: {
			$oid: "679f316a7c2b9d8646d30cc7",
		},
		user_id: {
			$oid: "65bcf5e5a4b0d6a9a7b8c9d0",
		},
		data: {
			type: "security",
			title: "보안 알림",
			message: "로그인 시도 실패가 감지되었습니다.",
			content_link: "/profile",
		},
		is_read: false,
		created_at: {
			$date: "2025-02-02T09:30:15.000Z",
		},
		updated_at: null,
		deleted_at: null,
	},
]

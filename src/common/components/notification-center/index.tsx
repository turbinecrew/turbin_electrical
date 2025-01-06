"use client"

import { IconFormatter } from "@/common/components/notification-center/icon"
import { Bell } from "lucide-react"
import React, { useState, useEffect, useRef } from "react"

const notificationData = [
	{
		id: "12314",
		type: "notice",
		title: "알림입니다",
		message: "알림상세메시지",
		read: true,
		date: "2025-01-05 12:00",
	},
	{
		id: "23425",
		type: "warnig",
		title: "중요 공지사항",
		message: "시스템 점검 예정입니다",
		read: false,
		date: "2025-01-06 09:30",
	},
	{
		id: "34536",
		type: "alram",
		title: "업데이트 안내",
		message: "새로운 기능이 추가되었습니다",
		read: true,
		date: "2025-01-06 15:45",
	},
	{
		id: "45647",
		type: "region page",
		title: "긴급 알림",
		message: "서버 오류가 발생했습니다",
		read: false,
		date: "2025-01-07 03:20",
	},
	{
		id: "56758",
		type: "notice",
		title: "이벤트 안내",
		message: "신년 맞이 특별 이벤트 시작",
		read: true,
		date: "2025-01-07 10:00",
	},
]

export function NotificationPopup() {
	const [notifications, setNotifications] = useState(notificationData)
	const popupRef = useRef<HTMLDivElement>(null)

	const [isOpen, setIsOpen] = useState<boolean>(false)
	const toggleNotification = () => {
		setIsOpen((prev) => !prev)
	}

	const setRead = (id: string) => {
		setNotifications((prevNotifications) =>
			prevNotifications.map((notification) =>
				notification.id === id
					? { ...notification, read: !notification.read }
					: notification,
			),
		)
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	const unreadCount = notifications.filter((noti) => !noti.read).length

	return (
		<div className="relative w-fit" ref={popupRef}>
			<button onClick={toggleNotification}>
				{unreadCount > 0 ? (
					<>
						<Bell
							size={20}
							className="cursor-pointer text-gray-700 hover:text-tbGreen"
						/>
						<span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-xs text-white">
							{unreadCount}
						</span>
					</>
				) : (
					<Bell
						size={20}
						className="cursor-pointer text-gray-700 hover:text-tbGreen"
					/>
				)}
			</button>

			{isOpen && (
				<div
					className={
						"absolute z-10 mt-2 flex w-72 flex-col gap-1 rounded-2xl bg-white p-5 text-slate-700 shadow-md transition duration-200 ease-in"
					}
				>
					<div className="text-bold flex border-b text-xl">Notifications</div>
					{notifications.map((noti) => (
						<button
							key={noti.id}
							onClick={() => setRead(noti.id)}
							className={`alert-item grid grid-cols-5 gap-1 rounded-xl border border-gray-300 p-1 ${noti.read && "opacity-30"}`}
						>
							<div className="alert-icon col-span-1 flex h-full w-full items-center justify-center">
								<IconFormatter type={noti.type} size={20} color={"black"} />
							</div>
							<div className="col-span-4 m-2 grid grid-rows-3 space-y-1">
								<div className="alert-title text-start text-sm">
									{noti.title}
								</div>
								<div className="alert-message text-start text-xs">
									{noti.message}
								</div>
								<div className="alert-date text-end text-xs">{noti.date}</div>
							</div>
						</button>
					))}
				</div>
			)}
		</div>
	)
}

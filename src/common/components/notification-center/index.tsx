"use client"

import { Bell } from "lucide-react"
import { useState, useEffect, useRef } from "react"

import { IconFormatter } from "@/common/components/notification-center/icon"

import styles from "./style/notification.module.css"
import Button from "@/common/components/button"

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
		read: false,
		date: "2025-01-07 10:00",
	},
	{
		id: "34526",
		type: "alram",
		title: "업데이트 안내",
		message: "새로운 기능이 추가되었습니다",
		read: false,
		date: "2025-01-07 15:45",
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
				notification.id === id ? { ...notification, read: true } : notification,
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
			<button onClick={toggleNotification} className="flex items-center">
				<Bell
					size={20}
					className={`cursor-pointer text-gray-700 hover:text-tbGreen ${
						unreadCount > 0 && styles.blinkAnimation
					}`}
				/>
				{unreadCount > 0 && (
					<span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-xs text-white">
						{unreadCount}
					</span>
				)}
			</button>

			{isOpen && (
				<div
					className={
						"absolute right-2 top-14 z-10 mt-2 flex h-96 w-64 flex-col gap-1 rounded-2xl bg-white p-3 text-slate-700 shadow-md transition duration-200 ease-in"
					}
				>
					<div className="flex h-10 overflow-hidden border-b bg-transparent bg-gradient-to-r from-tbGreen to-transparent bg-clip-text px-1 text-4xl font-extrabold text-transparent">
						Notifications
					</div>
					<div className="flex flex-col gap-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
						{notifications.map((noti) => {
							const formattedDate = new Date(noti.date)
							return (
								<Button
									key={noti.id}
									onClick={() => setRead(noti.id)}
									className={`alert-item translate group grid h-fit w-full grid-cols-7 rounded-lg border-none p-1 p-[1px] duration-300 hover:border ${noti.read && "opacity-30"}`}
								>
									<div className="alert-icon col-span-1 flex h-full w-full items-center justify-center">
										<IconFormatter type={noti.type} size={16} color={"black"} />
									</div>
									<div className="col-span-6 m-2 flex flex-col space-y-1 group-hover:text-tbGreen">
										<div className="flex justify-between">
											<div className="alert-title text-start text-sm font-semibold group-hover:font-bold">
												{noti.title}
											</div>
											<div className="alert-date text-end text-xs text-gray-400">
												{formattedDate.getMonth() +
													1 +
													"/" +
													formattedDate.getDate() +
													" " +
													formattedDate.getHours() +
													":" +
													formattedDate.getMinutes()}
											</div>
										</div>
										<div className="alert-message text-start text-xs">
											{noti.message}
										</div>
									</div>
								</Button>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}

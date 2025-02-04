"use client"

import { Bell, Trash2, MailOpen, Mail } from "lucide-react"
import { useState, useEffect, useRef } from "react"

import Button from "@/common/components/button/TbButton"
import { IconFormatter } from "@/common/components/notification-center/icon"
import type { TNotificationData } from "@/common/components/notification-center/types"
import { useNotificationsData } from "@/common/hooks/notification-center/useNotificationsData"
import { axiosInstance } from "@/config/axios"

import styles from "./style/notification.module.css"

export function NotificationPopup() {
	const [notifications, setNotifications] = useState<TNotificationData[]>([])
	const popupRef = useRef<HTMLDivElement>(null)

	const { data, error, isError, refetch } = useNotificationsData()
	useEffect(() => {
		if (data && !error) {
			setNotifications(data)
		}
	}, [data, error])

	if (isError) {
		setNotifications([])
	}

	const [isOpen, setIsOpen] = useState<boolean>(false)

	const toggleNotification = () => {
		setIsOpen((prev) => !prev)
	}

	const setAllRead = async () => {
		try {
			await axiosInstance.patch("/Notifications/setAllRead?status=true")
			console.log("setAllRead")
			refetch()
		} catch (error) {
			console.error("setAllRead 오류: is_read 상태 업데이트 실패:", error)
		}
	}

	const setAllReadReverse = async () => {
		try {
			await axiosInstance.patch("/Notifications/setAllRead?status=false")
			console.log("setAllReadReverse")
			refetch()
		} catch (error) {
			console.error(
				"setAllReadReverse 오류: is_read 상태 업데이트 실패:",
				error,
			)
		}
	}

	const setIsRead = async (id: string | number) => {
		if (!id) {
			console.error("오류: 잘못된 ID:", id)
			return
		}

		try {
			await axiosInstance.patch(`/Notifications/setIsRead?id=${id}`)

			refetch()
		} catch (error) {
			console.error("setIsRead 오류: is_read 상태 업데이트 실패:", error)
		}
	}

	const toggleIsReadState = async (id: string) => {
		if (!id) {
			console.error("오류: 잘못된 ID:", id)
			return
		}

		try {
			await axiosInstance.patch(`/Notifications/toggleIsReadState?id=${id}`)

			refetch()
		} catch (error) {
			console.error(
				"toggleIsReadState 오류: is_read 상태 업데이트 실패:",
				error,
			)
		}
	}

	const handleLink = (link: string | undefined) => {
		if (link != undefined && link != "") {
			window.location.href = link
		}
	}

	const deleteNotification = async (id: string) => {
		if (!id) {
			console.error("deleteNotification 오류: 잘못된 ID:", id)
			return
		}

		try {
			await axiosInstance.patch(`/Notifications/deleteNotification?id=${id}`)

			refetch()
		} catch (error) {
			console.error("오류: 알림 삭제 실패:", error)
		}
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

	const unreadCount = notifications.filter(
		(noti: TNotificationData) => !noti.is_read,
	).length

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
						"absolute -right-8 top-14 z-20 mt-2 flex h-96 w-72 flex-col gap-1 overflow-y-auto rounded-2xl bg-white p-3 text-slate-700 shadow-md transition duration-200 ease-in [&::-webkit-scrollbar]:hidden"
					}
				>
					<div className="flex h-fit w-full justify-end gap-1">
						<Button
							size="sm"
							color="green"
							onClick={() => setAllRead()}
							className="gap-1"
						>
							<MailOpen className="h-4 w-4" /> All
						</Button>
						<Button
							size="sm"
							color="green"
							onClick={() => setAllReadReverse()}
							className="gap-1"
						>
							<Mail className="h-4 w-4" /> All
						</Button>
					</div>
					<div className="flex flex-col gap-1">
						{notifications.map((noti: TNotificationData) => {
							const formattedDate = new Date(noti.created_at)
							return (
								<div
									key={noti._id}
									className="alert-item translate group relative h-fit w-full overflow-hidden rounded-xl border-none bg-background py-1 duration-100 hover:border hover:bg-gray-100 hover:text-tbGreen"
								>
									<div
										className={`absolute left-2 top-2 z-10 h-2 w-2 rounded-full bg-red-400 ${noti.is_read && "opacity-0"}`}
									/>
									<div className={`flex h-full w-full flex-row gap-2 px-2`}>
										<div
											className={`${styles.icon} relative col-span-1 flex h-full w-fit items-center justify-center ${noti.is_read && "opacity-50"}`}
										>
											<IconFormatter type={noti.data.type} size={16} />
											<button
												onClick={() => toggleIsReadState(noti._id)}
												className={`absolute left-1/2 top-1/2 flex h-fit w-fit -translate-x-1/2 -translate-y-1/2 transform items-center justify-center bg-white text-black opacity-0 transition-all duration-300 ${styles.check}`}
											>
												{noti.is_read ? (
													<MailOpen className="h-4 w-4" />
												) : (
													<Mail className="h-4 w-4" />
												)}
											</button>
										</div>
										<button
											onClick={() => {
												setIsRead(noti._id)
												handleLink(noti.data.content_link)
											}}
											className={`flex h-full w-full flex-col space-y-1 ${noti.is_read && "opacity-50"}`}
										>
											<div className="flex w-full justify-between">
												<div className="alert-title text-start text-sm font-semibold">
													{noti.data.title}
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
											<div className="alert-message whitespace-nowrap text-start text-xs">
												{noti.data.message}
											</div>
										</button>
										<div className={`${styles.bar} h-full w-2`}>
											<button
												onClick={() => deleteNotification(noti._id)}
												className={`${styles.trash} transiion-all absolute -right-10 top-1/2 flex h-24 w-8 -translate-y-1/2 transform items-center justify-center bg-white text-red-500 opacity-0 duration-200`}
											>
												<Trash2 size={14} />
											</button>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}

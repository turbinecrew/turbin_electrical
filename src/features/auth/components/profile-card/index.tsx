"use client"

import { useMutation } from "@tanstack/react-query"
import { Columns2 } from "lucide-react"
import { useState } from "react"

import { axiosInstance } from "@/config/axios"

import { CardLabel } from "./card-label"

export type ProfileMockKeys =
	| "businessName"
	| "businessOwner"
	| "email"
	| "businessNumber"
	| "businessAddress"

type ProfileData = {
	businessName: string
	businessOwner: string
	email: string
	businessNumber: string
	businessAddress: string
}
export function ProfileCard() {
	const [isSideCardVisible, setIsSideCardVisible] = useState(true)

	const [profileData] = useState<ProfileData>({
		businessName: "방형기",
		businessOwner: "방형기",
		email: "qkdgudrl@naver.com",
		businessNumber: "1118194369",
		businessAddress: "광주광역시",
	})

	const mockFirstTitle = [
		{ key: "businessNumber", title: "사업자 번호" },
		{ key: "email", title: "이메일" },
		{ key: "businessAddress", title: "사업자 주소" },
	]
	const mockSecondTitle = [
		{ key: "businessName", title: "사업자명" },
		{ key: "businessOwner", title: "사업자 대표" },
	]

	const toggleSideCard = () => setIsSideCardVisible((prev) => !prev)

	return (
		<div className="relative mt-8 flex w-full justify-center">
			{/* Main Card */}
			<div
				className={`z-10 h-fit w-[54rem] min-w-[48rem] flex-col gap-4 rounded-2xl border-2 bg-white p-4 shadow-md transition-transform duration-300 ease-in-out ${
					isSideCardVisible ? "-translate-x-[12rem]" : "translate-x-0"
				}`}
			>
				<div className="flex justify-between">
					<div className="flex gap-3 pl-2 pt-2 text-3xl font-semibold">
						<p>Profile</p>-<p>Card</p>
					</div>
					<div className="flex">
						<button className="mr-5">
							{/* {isEditingProfile ? "저장" : "수정"} */}
						</button>
						<div>
							<button
								onClick={toggleSideCard}
								className="flex h-10 w-10 items-center justify-center text-gray-700 shadow-sm hover:bg-gray-100"
							>
								<Columns2 size={24} />
							</button>
						</div>
					</div>
				</div>
				<hr />
				<div className="mx-7 flex h-[13rem] flex-col gap-6 py-3">
					{mockFirstTitle.map((data, idx) => (
						<CardLabel
							key={idx}
							data={data.key as ProfileMockKeys}
							label={data.title}
							value={profileData[data.key as ProfileMockKeys]}
						/>
					))}
				</div>
			</div>

			{/* Side Card */}

			<div
				className={`absolute bottom-0 right-0 z-0 h-[15rem] w-[24rem] transform transition-transform duration-300 ease-in-out ${
					isSideCardVisible ? "translate-x-0" : "-translate-x-[25vw]"
				}`}
			>
				<div className="h-[14.8rem] w-full min-w-[24rem] rounded-2xl border-r-2 border-t-2 py-7 shadow-md">
					<div className="mx-10 flex h-full flex-col gap-6">
						{mockSecondTitle.map((data, idx) => (
							<CardLabel
								key={idx}
								data={data.key as ProfileMockKeys}
								label={data.title}
								value={profileData[data.key as ProfileMockKeys]}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

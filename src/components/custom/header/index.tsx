"use client"

import { Search, Slash, House, Settings, CircleUser, Bell } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// `SignInModal`의 named export 확인
import SignInModal from "../modal/sign-in-modal"

export default function Header() {
	const pathName = usePathname()
	const thisPage = pathName.split("/").pop()
	const [searchText, setSearchText] = useState("")
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)

	const handleKeyPress = (event: { key: string }) => {
		if (event.key === "Enter") {
			console.log(`검색:${searchText}`)
			setSearchText("")
		}
	}

	const handleInputChange = (event: { target: { value: string } }) => {
		setSearchText(event.target.value)
	}

	const toggleSignInModal = () => {
		setIsSignInModalOpen((prevState) => !prevState) // 안전한 상태 업데이트
	}

	return (
		<div className="box-border flex h-20 w-full items-center justify-between rounded-2xl p-4 shadow-md">
			<div className="w-fit flex-col gap-1">
				<nav className="flex items-center justify-start gap-1">
					<Link href="/">
						<House size={16} />
					</Link>
					<Slash size={16} />
					<span>
						{thisPage === "main" || thisPage === "" ? "Dashboard" : thisPage}
					</span>
				</nav>
				<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
					{thisPage === "main" || thisPage === "" ? "Dashboard" : thisPage}
				</h4>
			</div>
			<div className="flex w-fit items-center">
				<div className="flex h-10 w-fit items-center justify-center rounded-2xl border border-gray-600 px-4 focus-within:border-sky-400">
					<label>
						<Search color="gray" size={16} />
					</label>
					<input
						className="h-full w-48 border-none bg-transparent pl-3 text-white outline-none valid:placeholder-gray-500"
						placeholder="Type here..."
						value={searchText}
						onChange={handleInputChange}
						onKeyPress={handleKeyPress}
					/>
				</div>
				<div
					className="m-2 flex w-fit items-center gap-1"
					onClick={toggleSignInModal}
				>
					<CircleUser size={16} />
					<h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
						Sign in
					</h4>
				</div>
				<Settings size={16} className="m-2" />
				<Bell size={16} className="m-2" />
			</div>
			{/* SignIn Modal */}
			<SignInModal
				isOpen={isSignInModalOpen}
				setIsOpen={setIsSignInModalOpen}
			/>
		</div>
	)
}

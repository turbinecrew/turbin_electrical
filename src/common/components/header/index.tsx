"use client"

import { Search, Slash, House, Settings, CircleUser, Bell } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import AuthModal from "@/features/auth/components/modal/auth"

export default function Header() {
	const pathName: string | null = usePathname()
	const thisPage = pathName
		? pathName.split("/").pop() || "Dashboard"
		: "Dashboard"
	const [searchText, setSearchText] = useState("")
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)

	const handleKeyPress = (event: { key: string }) => {
		if (event.key === "Enter") {
			console.log(`검색: ${searchText}`)
			setSearchText("")
		}
	}

	const handleInputChange = (event: { target: { value: string } }) => {
		setSearchText(event.target.value)
	}

	const toggleSignInModal = () => {
		setIsSignInModalOpen((prevState) => !prevState)
	}

	return (
		<div className="flex h-20 w-full items-center justify-between border-b border-gray-200 bg-white p-4 shadow-sm">
			<div className="flex flex-col">
				<nav className="flex items-center text-gray-600">
					<Link href="/" className="flex items-center gap-1 hover:text-tbGreen">
						<House size={16} />
					</Link>
					<Slash size={16} />
					<span className="capitalize">
						{thisPage === "main" || thisPage === "" ? "Dashboard" : thisPage}
					</span>
				</nav>
				<h4 className="text-lg font-semibold text-gray-800">
					{thisPage === "main" || thisPage === "" ? "Dashboard" : thisPage}
				</h4>
			</div>
			<div className="flex items-center gap-4">
				<div className="flex h-10 items-center rounded-2xl border border-gray-300 bg-gray-50 px-4 focus-within:border-tbGreen">
					<Search className="text-gray-400" size={16} />
					<input
						type="text"
						className="ml-2 h-full w-48 border-none bg-transparent text-gray-600 placeholder-gray-400 outline-none"
						placeholder="Search..."
						value={searchText}
						onChange={handleInputChange}
						onKeyPress={handleKeyPress}
					/>
				</div>
				<div
					className="flex cursor-pointer items-center gap-2 text-gray-700 hover:text-tbGreen"
					onClick={toggleSignInModal}
				>
					<CircleUser size={20} />
					<span className="text-sm font-medium">Sign In</span>
				</div>
				<Settings
					size={20}
					className="cursor-pointer text-gray-700 hover:text-tbGreen"
				/>
				<Bell
					size={20}
					className="cursor-pointer text-gray-700 hover:text-tbGreen"
				/>
			</div>
			<AuthModal isOpen={isSignInModalOpen} setIsOpen={setIsSignInModalOpen} />
		</div>
	)
}

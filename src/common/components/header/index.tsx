"use client"
import { Search, Slash, House, Settings, CircleUser, Bell } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import SignInModal from "../../../features/auth/components/sign-in-modal"

export default function Header() {
	const path: string | null = usePathname()
	const pathName = path ? path.split("/") : [""]
	const thisPage = pathName.pop()
	const prevPage = pathName ? pathName.pop() : null

	const [searchText, setSearchText] = useState("")
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)

	const handleKeyDown = (event: { key: string }) => {
		if (event.key === "Enter") {
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
		<div className="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white p-4 shadow-sm md:h-20">
			<div className="flex items-center gap-2">
				<nav className="flex items-center gap-2">
					<div className="flex items-center gap-2 opacity-40">
						<Link href="/" className="flex items-center hover:text-tbGreen">
							<House size={16} />
						</Link>
						{prevPage && prevPage != "" && (
							<div className="flex items-center gap-2">
								<Slash size={14} className="mt-[1px] rotate-[-15deg]" />
								<a
									href={`/${prevPage}`}
									className="text-sm capitalize hover:text-tbGreen md:text-lg"
								>
									{prevPage}
								</a>
							</div>
						)}
					</div>
					<div className="flex items-center gap-2 text-sm font-semibold capitalize md:text-lg">
						<Slash size={14} className="mt-[1px] rotate-[-15deg]" />
						{thisPage === "main" || thisPage === "" ? "Dashboard" : thisPage}
					</div>
				</nav>
			</div>
			<div className="flex flex-row items-center gap-2 pl-2 md:gap-4">
				<div className="flex h-6 items-center rounded-2xl border border-gray-300 bg-gray-50 px-4 focus-within:border-tbGreen md:h-8">
					<Search size={12} className="text-gray-400 md:h-4 md:w-4" />
					<input
						type="text"
						className={`ml-2 h-full border-none bg-transparent text-xs text-gray-600 placeholder-gray-400 outline-none transition-all duration-300 md:text-sm ${
							searchText.length > 8 ? "w-20 md:w-64" : "w-14 md:w-36"
						}`}
						placeholder="Search..."
						value={searchText}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
					/>
				</div>
				<div className="flex gap-2">
					<div
						className="flex cursor-pointer items-center gap-2 text-gray-700 hover:text-tbGreen"
						onClick={toggleSignInModal}
					>
						<CircleUser size={12} className="md:h-4 md:w-4" />
						<span className="text-nowrap text-center text-xs font-medium md:text-sm">
							Sign In
						</span>
					</div>
					<Settings
						size={16}
						className="cursor-pointer text-gray-700 hover:text-tbGreen md:h-5 md:w-5"
					/>
					<Bell
						size={16}
						className="cursor-pointer text-gray-700 hover:text-tbGreen md:h-5 md:w-5"
					/>
				</div>
			</div>
			<SignInModal
				isOpen={isSignInModalOpen}
				setIsOpen={setIsSignInModalOpen}
			/>
		</div>
	)
}

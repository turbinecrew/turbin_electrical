"use client"
import {
	Search,
	Slash,
	House,
	Settings,
	CircleUser,
	Bell,
	X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import AuthModal from "@/features/auth/components/modal/auth"

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
							<House className="h-4 w-4 cursor-pointer md:h-5 md:w-5" />
						</Link>
						{prevPage && prevPage != "" && (
							<div className="flex items-center gap-2">
								<Slash className="mt-[1px] h-3 w-3 rotate-[-15deg] md:h-4 md:w-4" />
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
						<Slash className="mt-[1px] h-3 w-3 rotate-[-15deg] md:h-4 md:w-4" />
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
							searchText.length > 8 ? "w-36 md:w-64" : "w-20 md:w-36"
						}`}
						placeholder="Search..."
						value={searchText}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
					/>
					{searchText.length > 0 ? (
						<button
							onClick={() => {
								setSearchText("")
							}}
							className="text-gray-400"
						>
							<X size={16} />
						</button>
					) : (
						<></>
					)}
				</div>
				<div className="flex items-center gap-1 md:gap-2">
					<div
						className="items-centergap-[1px] border-1 flex h-6 cursor-pointer items-center rounded-full border px-1 text-gray-700 hover:text-tbGreen md:h-8 md:gap-1"
						onClick={toggleSignInModal}
					>
						<CircleUser size={12} className="h-4 w-4 md:h-5 md:w-5" />
						<span className="text-nowrap text-center text-xs font-medium md:text-sm">
							Sign In
						</span>
					</div>
					<Settings className="h-4 w-4 cursor-pointer text-gray-700 hover:text-tbGreen md:h-5 md:w-5" />
					<Bell className="h-4 w-4 cursor-pointer text-gray-700 hover:text-tbGreen md:h-5 md:w-5" />
				</div>
			</div>
			<AuthModal isOpen={isSignInModalOpen} setIsOpen={setIsSignInModalOpen} />
		</div>
	)
}

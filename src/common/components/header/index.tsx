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
		<div className="flex h-20 w-full items-center justify-between border-b border-gray-200 bg-white p-4 shadow-sm">
			<div className="flex items-center gap-2">
				<nav className="flex items-center gap-2 opacity-40">
					<Link href="/" className="flex items-center hover:text-tbGreen">
						<House size={16} />
					</Link>
					{prevPage && prevPage != "" && (
						<div className="flex items-center gap-2 capitalize">
							<Slash size={16} />{" "}
							<a
								href={`/${prevPage}`}
								className="flex items-center hover:text-tbGreen"
							>
								{prevPage}
							</a>
						</div>
					)}
				</nav>
				<div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
					<Slash size={16} />
					<span className="capitalize">
						{thisPage === "main" || thisPage === "" ? "Dashboard" : thisPage}
					</span>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<div className="flex h-10 items-center rounded-2xl border border-gray-300 bg-gray-50 px-4 focus-within:border-tbGreen">
					<Search className="text-gray-400" size={16} />
					<input
						type="text"
						className="ml-2 h-full w-48 border-none bg-transparent text-gray-600 placeholder-gray-400 outline-none"
						placeholder="Search..."
						value={searchText}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
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
			<SignInModal
				isOpen={isSignInModalOpen}
				setIsOpen={setIsSignInModalOpen}
			/>
		</div>
	)
}

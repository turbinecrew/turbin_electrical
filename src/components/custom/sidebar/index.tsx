"use client"

import {
	Home,
	User,
	LogIn,
	Rocket,
	TrendingUp,
	LockKeyhole,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import SignInModal from "../modal/sign-in-modal"
import SignUpModal from "../modal/sign-up-modal"

export default function Sidebar() {
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
	const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)

	return (
		<aside className="h-screen w-64 bg-tbPastelGreen p-6 font-poppins text-tbGreen">
			<div className="mb-6 flex justify-center">
				<Link href="/">
					<Image
						src="/img/turbinecrew.svg"
						alt="Turbine Crew Logo"
						width={200}
						height={70}
						style={{ width: "auto", height: "auto" }}
						priority
						className="cursor-pointer rounded-lg"
					/>
				</Link>
			</div>
			<hr className="mb-6 border-gray-300" />
			<nav>
				<ul className="space-y-4">
					<li>
						<Link
							href="/dashboard"
							className="group flex items-center space-x-4 hover:text-gray-600"
						>
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-tbGreen transition-colors duration-300 group-hover:bg-tbGreen group-hover:text-white">
								<Home className="h-5 w-5" />
							</div>
							<span className="text-lg font-medium">Dashboard</span>
						</Link>
					</li>

					{/* Trading */}
					<li>
						<Link
							href="/trading"
							className="group flex items-center space-x-4 hover:text-gray-600"
						>
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-tbGreen transition-colors duration-300 group-hover:bg-tbGreen group-hover:text-white">
								<TrendingUp className="h-5 w-5" />
							</div>
							<span className="text-lg font-medium">Trading</span>
						</Link>
					</li>
				</ul>

				<hr className="my-6 border-gray-300" />

				<div>
					<h3 className="mb-4 text-sm font-semibold text-gray-600">
						ACCOUNT PAGES
					</h3>
					<ul className="space-y-4">
						<li>
							<Link
								href="/profile"
								className="group flex items-center space-x-4 hover:text-gray-600"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-tbGreen transition-colors duration-300 group-hover:bg-tbGreen group-hover:text-white">
									<User className="h-5 w-5" />
								</div>
								<span className="text-lg font-medium">Profile</span>
							</Link>
						</li>
						<li>
							<Link
								href="/manage"
								className="group flex items-center space-x-4 hover:text-gray-600"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-tbGreen transition-colors duration-300 group-hover:bg-tbGreen group-hover:text-white">
									<LockKeyhole className="h-5 w-5" />
								</div>
								<span className="text-lg font-medium">Admin</span>
							</Link>
						</li>

						<li>
							<button
								onClick={() => setIsSignInModalOpen(true)}
								className="group flex items-center space-x-4 hover:text-gray-600"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-tbGreen transition-colors duration-300 group-hover:bg-tbGreen group-hover:text-white">
									<LogIn className="h-5 w-5" />
								</div>
								<span className="text-lg font-medium">Sign In</span>
							</button>
						</li>

						<li>
							<button
								onClick={() => setIsSignUpModalOpen(true)}
								className="group flex items-center space-x-4 hover:text-gray-600"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-tbGreen transition-colors duration-300 group-hover:bg-tbGreen group-hover:text-white">
									<Rocket className="h-5 w-5" />
								</div>
								<span className="text-lg font-medium">Sign Up</span>
							</button>
						</li>
					</ul>
				</div>
			</nav>

			<SignInModal
				isOpen={isSignInModalOpen}
				setIsOpen={setIsSignInModalOpen}
			/>

			<SignUpModal
				isOpen={isSignUpModalOpen}
				setIsOpen={setIsSignUpModalOpen}
			/>
		</aside>
	)
}

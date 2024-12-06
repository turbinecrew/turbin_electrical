"use client"

import Link from "next/link"
import { Home, User, LogIn, Rocket, TrendingUp } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import SignInModal from "../../common/modal/sign-in-modal"
import SignUpModal from "../../common/modal/sign-up-modal"

export default function Sidebar() {
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
	const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)

	const toggleSignInModal = () => {
		setIsSignInModalOpen(!isSignInModalOpen)
	}

	const toggleSignUpModal = () => {
		setIsSignUpModalOpen(!isSignUpModalOpen)
	}

	return (
		<aside className="h-screen w-64 bg-tbPastelGreen p-6 font-poppins text-tbGreen">
			{/* 상단 이미지 */}
			<div className="mb-6 flex justify-center">
				<Link href="/main">
					<Image
						src="/img/turbinecrew.svg"
						alt="Turbine Crew Logo"
						width={200}
						height={70}
						className="cursor-pointer rounded-lg"
					/>
				</Link>
			</div>

			{/* Separator */}
			<hr className="mb-6 border-gray-300" />

			{/* Navigation */}
			<nav>
				<ul className="space-y-4">
					{/* Dashboard */}
					<li>
						<Link
							href="/main/dashboard"
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

				{/* Separator */}
				<hr className="my-6 border-gray-300" />

				{/* Account Pages Section */}
				<div>
					<h3 className="mb-4 text-sm font-semibold text-gray-600">
						ACCOUNT PAGES
					</h3>
					<ul className="space-y-4">
						{/* Profile */}
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

						{/* Sign In */}
						<li>
							<button
								onClick={toggleSignInModal}
								className="group flex items-center space-x-4 hover:text-gray-600"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-tbGreen transition-colors duration-300 group-hover:bg-tbGreen group-hover:text-white">
									<LogIn className="h-5 w-5" />
								</div>
								<span className="text-lg font-medium">Sign In</span>
							</button>
						</li>

						{/* Sign Up */}
						<li>
							<button
								onClick={toggleSignUpModal}
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

			{isSignInModalOpen && <SignInModal closeModal={toggleSignInModal} />}
			{isSignUpModalOpen && <SignUpModal closeModal={toggleSignUpModal} />}
		</aside>
	)
}

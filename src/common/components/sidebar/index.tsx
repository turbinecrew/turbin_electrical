"use client"

import {
	Home,
	User,
	TrendingUp,
	LockKeyhole,
	Map,
	Columns2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const mainNavItems: { title: string; url: string; icon: typeof Home }[] = [
	{ title: "Dashboard", url: "/", icon: Home },
	{ title: "Trading", url: "/trading", icon: TrendingUp },
	{ title: "Region", url: "/region", icon: Map },
]

const accountNavItems: { title: string; url: string; icon: typeof Home }[] = [
	{ title: "Profile", url: "/profile", icon: User },
	{ title: "Admin", url: "/manage", icon: LockKeyhole },
]

export default function Sidebar() {
	const [isSidebarVisible, setIsSidebarVisible] = useState(true)
	const [activeItem, setActiveItem] = useState<string>("Dashboard")

	const toggleSidebar = () => setIsSidebarVisible((prev) => !prev)

	return (
		<div
			className={`flex ${
				isSidebarVisible ? "ml-64" : "ml-16"
			} transition-all duration-300`}
		>
			<aside
				className={`${
					isSidebarVisible ? "w-64" : "w-16"
				} fixed left-0 top-0 z-20 h-full border-r border-gray-200 bg-white shadow-sm transition-all duration-300`}
			>
				<div className="flex h-full flex-col items-center">
					<div className="my-3 flex items-center justify-center">
						<Link href="/">
							<Image
								src={
									isSidebarVisible
										? "/img/turbinecrew.svg"
										: "/img/turbin_2.svg"
								}
								alt="Turbine Crew Logo"
								width={isSidebarVisible ? 200 : 40}
								height={isSidebarVisible ? 70 : 40}
								priority
								className={`cursor-pointer rounded-lg ${
									isSidebarVisible ? "my-0" : "my-[8px]"
								}`}
							/>
						</Link>
					</div>

					<hr className="mb-6 w-full border-gray-300" />

					<nav className="w-full flex-1 px-1">
						<ul className="space-y-4">
							{mainNavItems.map((item) => (
								<NavItem
									key={item.title}
									item={item}
									isSidebarVisible={isSidebarVisible}
									isActive={activeItem === item.title}
									onClick={() => setActiveItem(item.title)}
								/>
							))}
						</ul>

						<hr className="mx-4 my-6 border-gray-300" />

						<div className="ml-2">
							<h3
								className={`mb-4 text-sm font-semibold text-gray-600 ${
									isSidebarVisible ? "block" : "hidden"
								}`}
							>
								Account Pages
							</h3>
							<ul className="space-y-4">
								{accountNavItems.map((item) => (
									<NavItem
										key={item.title}
										item={item}
										isSidebarVisible={isSidebarVisible}
										isActive={activeItem === item.title}
										onClick={() => setActiveItem(item.title)}
									/>
								))}
							</ul>
						</div>
					</nav>

					<div className="mt-auto w-full px-1">
						<div className="mb-4 flex justify-start">
							<button
								onClick={toggleSidebar}
								className="flex h-10 w-10 items-center justify-center text-gray-700 shadow-sm hover:bg-gray-100"
							>
								<Columns2 size={24} />
							</button>
						</div>
					</div>
				</div>
			</aside>
		</div>
	)
}

function NavItem({
	item,
	isSidebarVisible,
	isActive,
	onClick,
}: {
	item: {
		title: string
		url: string
		icon: typeof Home
	}
	isSidebarVisible: boolean
	isActive: boolean
	onClick: () => void
}) {
	const Icon = item.icon
	return (
		<li>
			<Link
				href={item.url}
				onClick={onClick}
				className={`group flex items-center rounded-md px-4 py-2 text-gray-700 transition-colors duration-300 ${
					isActive
						? "bg-tbPastelGreen text-white"
						: isSidebarVisible
							? "hover:bg-tbPastelGreen hover:text-white"
							: "justify-center hover:bg-tbGreen hover:text-white"
				}`}
			>
				<div
					className={`flex h-10 w-10 items-center justify-center rounded-full duration-300 ${
						isActive
							? "bg-tbPastelGreen text-white"
							: isSidebarVisible
								? "bg-white text-tbGreen group-hover:bg-white group-hover:text-tbGreen"
								: "bg-white text-tbGreen group-hover:bg-tbGreen group-hover:text-white"
					}`}
				>
					<Icon className="h-5 w-5" />
				</div>
				{isSidebarVisible && (
					<span className="ml-2 text-lg font-medium">{item.title}</span>
				)}
			</Link>
		</li>
	)
}

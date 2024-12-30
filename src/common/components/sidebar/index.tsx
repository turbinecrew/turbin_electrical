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

const mainNavItems = [
	{ title: "Dashboard", url: "/", icon: Home },
	{ title: "Trading", url: "/trading", icon: TrendingUp },
	{ title: "Region", url: "/region", icon: Map },
]

const accountNavItems = [
	{ title: "Profile", url: "/profile", icon: User },
	{ title: "Admin", url: "/manage", icon: LockKeyhole },
]

export default function Sidebar() {
	const [isSidebarVisible, setIsSidebarVisible] = useState(true)
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
								className="cursor-pointer rounded-lg"
							/>
						</Link>
					</div>
					<hr className="mb-6 w-full border-gray-300" />
					<nav className="flex-1">
						<ul className="space-y-4">
							{mainNavItems.map((item) => (
								<NavItem
									key={item.title}
									item={item}
									isSidebarVisible={isSidebarVisible}
								/>
							))}
						</ul>
						<hr className="my-6 self-stretch border-gray-300" />
						<div>
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
									/>
								))}
							</ul>
						</div>
					</nav>
					<div className="mt-auto w-full">
						<div className="mb-4 flex justify-start px-4">
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
}: {
	item: {
		title: string
		url: string
		icon: React.ComponentType<{ className: string }>
	}
	isSidebarVisible: boolean
}) {
	const Icon = item.icon
	return (
		<li>
			<Link
				href={item.url}
				className="group flex items-center rounded-md px-6 py-2 text-gray-700 transition-colors duration-300 hover:bg-tbPastelGreen hover:text-white"
			>
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-tbGreen group-hover:bg-white group-hover:text-tbGreen">
					<Icon className="h-5 w-5" />
				</div>
				{isSidebarVisible && (
					<span className="ml-2 text-lg font-medium">{item.title}</span>
				)}
			</Link>
		</li>
	)
}

"use client"

import {
	Home,
	User,
	TrendingUp,
	LockKeyhole,
	ChevronsLeft,
	Menu,
	Map,
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
			className={`flex ${isSidebarVisible ? "ml-64" : "ml-0"} transition-all duration-300`}
		>
			<aside
				className={`${
					isSidebarVisible ? "w-64 p-6" : "w-0 p-0"
				} fixed left-0 top-0 z-20 h-full overflow-hidden border-r border-gray-200 bg-white text-tbGreen shadow-sm transition-all duration-300`}
			>
				{isSidebarVisible && (
					<div>
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
								{mainNavItems.map((item) => (
									<SidebarItem
										key={item.title}
										href={item.url}
										label={item.title}
										icon={item.icon}
									/>
								))}
							</ul>
							<hr className="my-6 border-gray-300" />
							<div>
								<h3 className="mb-4 text-sm font-semibold text-gray-600">
									Account Pages
								</h3>
								<ul className="space-y-4">
									{accountNavItems.map((item) => (
										<SidebarItem
											key={item.title}
											href={item.url}
											label={item.title}
											icon={item.icon}
										/>
									))}
								</ul>
							</div>
						</nav>
					</div>
				)}
			</aside>

			<div className="fixed bottom-4 left-4 z-30">
				{isSidebarVisible ? (
					<button
						onClick={toggleSidebar}
						className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 p-2 text-gray-700 shadow-md hover:bg-gray-300"
					>
						<ChevronsLeft size={24} />
					</button>
				) : (
					<button
						onClick={toggleSidebar}
						className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 p-2 text-gray-700 shadow-md hover:bg-gray-300"
					>
						<Menu size={24} />
					</button>
				)}
			</div>
		</div>
	)
}

function SidebarItem({
	href,
	label,
	icon: Icon,
}: {
	href: string
	label: string
	icon: React.ComponentType<{ className: string }>
}) {
	return (
		<li>
			<Link
				href={href}
				className="group flex items-center space-x-4 rounded-md p-2 text-gray-700 transition-colors duration-300 hover:bg-tbPastelGreen hover:text-white"
			>
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-tbGreen group-hover:bg-white group-hover:text-tbGreen">
					<Icon className="h-5 w-5" />
				</div>
				<span className="text-lg font-medium">{label}</span>
			</Link>
		</li>
	)
}

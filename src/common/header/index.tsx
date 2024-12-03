"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Search, Slash, House, Settings, CircleUser, Bell } from "lucide-react"

export default function Header() {
	const pathName = usePathname()
	const thisPage = pathName.split("/").pop()
	return (
		<div className="box-border flex h-20 w-full items-center justify-between rounded-2xl bg-slate-400 p-4 shadow-md">
			<div className="w-fit flex-col gap-1 bg-slate-300">
				<nav className="flex items-center justify-start gap-1">
					<House size={16}>
						<Link href={"/"} />
					</House>
					<Slash size={16} />
					<span>
						{thisPage === "main" || thisPage === "" ? "Dashboard" : thisPage}
					</span>
				</nav>
				<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
					{thisPage === "main" || thisPage === "" ? "Dashboard" : thisPage}
				</h4>
			</div>
			<div className="flex w-fit items-center bg-slate-500">
				<div className="flex h-10 w-fit items-center justify-center rounded-2xl border border-gray-600 bg-[#2d2d2d] px-4 focus-within:border-sky-400">
					<label>
						<Search color="gray" size={16} absoluteStrokeWidth />
					</label>
					<input
						className="h-full w-48 border-none bg-transparent pl-3 text-white outline-none valid:placeholder-gray-500"
						placeholder="Type here..."
					/>
				</div>
				<div className="m-2 flex w-fit items-center gap-1">
					<CircleUser size={16} />
					<h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
						Sign in
					</h4>
				</div>
				<Settings size={16} className="m-2" />
				<Bell size={16} className="m-2" />
			</div>
		</div>
	)
}

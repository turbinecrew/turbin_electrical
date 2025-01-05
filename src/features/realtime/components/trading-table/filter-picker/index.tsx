"use client"

import { ChevronDown, Plus } from "lucide-react"
import { useState } from "react"

import Button from "@/common/components/button"
import type { FilterPickerPT } from "@/features/realtime/components/types/types"

export const FilterColumnList = [
	{ id: "volume", name: "전력 발전량" },
	{ id: "bidNumbers", name: "거래량" },
]

export function FileterPicker({
	activeFilter,
	setActiveFilter,
	updateState,
	toggleState,
}: FilterPickerPT) {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [selected, setSelected] = useState("")

	const handleFilter = () => {
		if (selected) {
			setActiveFilter((prevState: Record<string, boolean>) => ({
				...prevState,
				[selected]: true,
			}))
		}
	}
	return (
		<div className="absolute z-10 mt-2 flex w-fit flex-col gap-1 rounded-2xl bg-white p-5 text-slate-700 shadow-md transition duration-200 ease-in">
			<div className="flex items-center gap-2">
				<div className="relative w-fit">
					<Button
						onClick={() => setDropdownOpen((e) => !e)}
						className="flex w-36 justify-between gap-1 rounded-2xl border border-gray-300 bg-white text-slate-700 transition duration-200 ease-in focus:ring-2 focus:ring-gray-200"
					>
						<div className="flex w-full justify-center text-sm">
							{selected === "volume"
								? "전력 발전량"
								: selected === "bidNumbers"
									? "거래량"
									: "필터 선택"}
						</div>
						<ChevronDown
							className={`transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
							size={16}
						/>
					</Button>
					{dropdownOpen && (
						<div className="absolute z-10 mt-2 flex w-full flex-col gap-1 overflow-hidden rounded-2xl border border-gray-300 bg-white text-slate-700 transition duration-200 ease-in focus:ring-2 focus:ring-gray-200">
							{FilterColumnList.map(({ id, name }) => (
								<button
									key={id}
									onClick={() => {
										setSelected(id)
										setDropdownOpen(false)
									}}
									className={
										"block w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100"
									}
								>
									{!activeFilter[id] && name}
								</button>
							))}
						</div>
					)}
				</div>

				<Button
					onClick={() => {
						handleFilter()
						updateState({ filtering: !toggleState.filtering })
					}}
					className="flex h-7 items-center gap-1 text-nowrap bg-gray-200 text-sm text-slate-700 ease-in focus:ring-2 focus:ring-gray-200"
				>
					<Plus size={14} />
					추가
				</Button>
			</div>
		</div>
	)
}

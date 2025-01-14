"use client"

import { Check, ChevronDown, ChevronsDown, ChevronsUp } from "lucide-react"
import { useState } from "react"

import { Button } from "@/common/components/button"
import {
	SortColumnList,
	type SortPickerPT,
} from "@/features/trading-data/types/table/SortPickerPT"

export function SortPicker({
	sortingState,
	setSortingState,
	currentSortColumn,
	setCurrentSortColumn,
	handleSort,
	toggleState,
	updateState,
}: SortPickerPT) {
	const [dropdownOpen, setDropdownOpen] = useState(false)

	const handleSortState = (column: string) => {
		setSortingState((prev: Record<string, boolean>) => ({
			...prev,
			[column]: !prev[column],
		}))
	}

	return (
		<div className="absolute z-10 mt-2 flex w-fit flex-col gap-1 rounded-2xl bg-white p-5 text-slate-700 shadow-md transition duration-200 ease-in">
			<div className="flex items-center gap-2">
				<div className="relative w-fit">
					<Button
						onClick={() => setDropdownOpen((e) => !e)}
						className="flex h-7 w-32 justify-between gap-1 rounded-2xl border border-gray-300 bg-white text-slate-700 transition duration-200 ease-in focus:ring-2 focus:ring-gray-200 md:w-36"
					>
						<div className="flex w-full justify-center text-xs md:text-sm">
							{currentSortColumn === "plantName"
								? "발전소명"
								: currentSortColumn === "volume"
									? "전력 발전량"
									: currentSortColumn === "bidNumbers"
										? "거래량"
										: "정렬 기준"}
						</div>
						<ChevronDown
							className={`transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
							size={16}
						/>
					</Button>
					{dropdownOpen && (
						<div className="absolute z-10 mt-2 flex w-full flex-col gap-1 overflow-hidden rounded-2xl border border-gray-300 bg-white text-slate-700 transition duration-200 ease-in focus:ring-2 focus:ring-gray-200">
							{SortColumnList.map(({ id, name }) => (
								<button
									key={id}
									onClick={() => {
										setCurrentSortColumn(id)
										setDropdownOpen(false)
										handleSortState(currentSortColumn)
									}}
									className={`block w-full px-4 py-2 text-center text-xs text-gray-700 hover:bg-gray-100 md:text-sm ${
										currentSortColumn === id ? "bg-gray-100 font-bold" : ""
									}`}
								>
									{name}
								</button>
							))}
						</div>
					)}
				</div>
				<Button
					onClick={() => {
						handleSortState(currentSortColumn)
					}}
					className="flex h-7 w-24 items-center gap-1 text-nowrap text-xs text-slate-700 transition duration-200 ease-in focus:ring-2 focus:ring-gray-200 md:text-sm"
				>
					{currentSortColumn === "" ? (
						"정렬하기"
					) : sortingState[currentSortColumn] ? (
						<>
							<ChevronsDown size={12} />
							내림차순
						</>
					) : (
						<>
							<ChevronsUp size={12} />
							오름차순
						</>
					)}
				</Button>
				<Button
					onClick={() => {
						handleSort()
						updateState({ ordering: !toggleState.ordering })
					}}
					className="flex h-7 items-center gap-1 text-nowrap bg-gray-200 text-xs text-slate-700 ease-in focus:ring-2 focus:ring-gray-200 md:text-sm"
				>
					<Check size={14} />
					확인
				</Button>
			</div>
		</div>
	)
}

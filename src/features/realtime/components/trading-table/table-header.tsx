"use client"
import type { SortingState, Column, Table } from "@tanstack/react-table"
import {
	ChevronsDown,
	ChevronsUp,
	ArrowUpDown,
	ChevronDown,
	ListFilter,
	TextSearch,
	X,
} from "lucide-react"
import { useState } from "react"

import Button from "@/common/components/button"
import { FilterDataByRange } from "@/common/components/table/filter"

import type { TradingTablePT } from "./Tcolumn"

type TradingTableHeaderPT = {
	table: Table<TradingTablePT>
	setSorting: React.Dispatch<React.SetStateAction<SortingState>>
}

export function TradingTableHeader({
	table,
	setSorting,
}: TradingTableHeaderPT) {
	const [isToggle, setToggle] = useState(false)
	const [isSortingToggle, setSortingToggle] = useState(false)

	const [sortingState, setSortingState] = useState<Record<string, boolean>>({
		plantName: false,
		volume: false,
		bidNumbers: false,
	})

	const [currentSortColumn, setCurrentSortColumn] = useState("")
	const [dropdownOpen, setDropdownOpen] = useState(false)

	const handleSort = () => {
		if (currentSortColumn) {
			setSorting(() => {
				const desc = sortingState[currentSortColumn]
				return [{ id: currentSortColumn, desc }]
			})

			table
				.getColumn(currentSortColumn)
				?.setFilterValue(table.getColumn(currentSortColumn)?.getFilterValue())
		}
	}

	const toggleSortOrder = () => {
		if (currentSortColumn) {
			setSortingState((prev) => ({
				...prev,
				[currentSortColumn]: !prev[currentSortColumn],
			}))
			handleSort()
		}
	}

	const resetTableFilter = () => {
		table.getColumn("volume")?.setFilterValue(null)
		table.getColumn("bidNumbers")?.setFilterValue(null)
		table.getColumn("plantName")?.setFilterValue(null)
		setToggle(false)
	}

	const resetSorting = () => {
		setSortingState({
			plantName: false,
			volume: false,
			bidNumbers: false,
		})
		setCurrentSortColumn("")
		setSorting([])
	}
	return (
		<div className="ml-1 flex w-full flex-col">
			<div className="flex w-full justify-between">
				<div className="ml-4 flex items-center justify-start gap-4">
					<button
						onClick={() => {
							setToggle((e) => !e)
						}}
					>
						{isToggle ? (
							<ListFilter color="#6e6e6e" size={16} />
						) : (
							<ListFilter size={16} />
						)}
					</button>
					<button
						onClick={() => {
							setSortingToggle((e) => !e)
						}}
					>
						{isSortingToggle ? (
							<ArrowUpDown color="#6e6e6e" size={16} />
						) : (
							<ArrowUpDown size={16} />
						)}
					</button>
				</div>
				<div className="flex h-8 items-center rounded-xl border border-gray-300 bg-white px-4">
					<TextSearch className="text-gray-400" size={16} />
					<input
						placeholder="Enter Name..."
						value={
							(table.getColumn("plantName")?.getFilterValue() as string) ?? ""
						}
						onChange={(event) => {
							const filterValue = event.target.value
							table.getColumn("plantName")?.setFilterValue(filterValue)
							const currentSorting = table.getState().sorting
							if (currentSorting && currentSorting.length > 0) {
								const [currentSort] = currentSorting
								setSorting([{ id: currentSort.id, desc: currentSort.desc }])
							}
						}}
						className="ml-2 h-full w-48 border-none bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none"
					/>
				</div>
			</div>
			<div className="flex w-full flex-col gap-2 border-none p-2">
				{isSortingToggle && (
					<div className="relative flex items-center gap-2">
						<div className="relative">
							<Button
								onClick={() => setDropdownOpen((e) => !e)}
								className="flex w-36 justify-between gap-1 rounded-2xl border border-gray-300 bg-white text-slate-700 transition duration-200 ease-in focus:ring-2 focus:ring-gray-200"
							>
								<div className="flex w-full justify-center">
									{currentSortColumn === "plantName"
										? "발전소명"
										: currentSortColumn === "volume"
											? "전력 발전량"
											: currentSortColumn === "bidNumbers"
												? "거래량"
												: "정렬 기준 선택"}
								</div>
								<ChevronDown
									className={`transform ${
										dropdownOpen ? "rotate-180" : "rotate-0"
									}`}
									size={16}
								/>
							</Button>
							{dropdownOpen && (
								<div className="absolute z-10 mt-2 flex w-full flex-col gap-1 rounded-2xl border border-gray-300 bg-white text-slate-700 transition duration-200 ease-in focus:ring-2 focus:ring-gray-200">
									{["plantName", "volume", "bidNumbers"].map((columnId) => (
										<button
											key={columnId}
											onClick={() => {
												setCurrentSortColumn(columnId)
												setDropdownOpen(false)
												handleSort()
											}}
											className={`block w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100 ${
												currentSortColumn === columnId
													? "bg-gray-100 font-bold"
													: ""
											}`}
										>
											{columnId === "plantName" && "발전소명"}
											{columnId === "volume" && "전력 발전량"}
											{columnId === "bidNumbers" && "거래량"}
										</button>
									))}
								</div>
							)}
						</div>

						<Button
							onClick={toggleSortOrder}
							className="flex items-center gap-1 border-none text-slate-700 transition duration-200 ease-in focus:ring-2 focus:ring-gray-200"
						>
							{currentSortColumn === "" ? (
								"정렬하기"
							) : sortingState[currentSortColumn] ? (
								<>
									<ChevronsUp size={16} />
									오름차순
								</>
							) : (
								<>
									<ChevronsDown size={16} />
									내림차순
								</>
							)}
						</Button>
						{currentSortColumn === "" ? (
							<></>
						) : (
							<>
								<button
									onClick={resetSorting}
									className="flex items-center gap-1 text-gray-400"
								>
									<X size={16} />
								</button>
							</>
						)}
					</div>
				)}

				{isToggle && (
					<div className="flex w-full flex-row items-center gap-2">
						{table.getColumn("volume") && (
							<FilterDataByRange
								label={"전력 발전량"}
								column={table.getColumn("volume") as Column<unknown, unknown>}
							/>
						)}
						{table.getColumn("bidNumbers") && (
							<FilterDataByRange
								label={"거래량"}
								column={
									table.getColumn("bidNumbers") as Column<unknown, unknown>
								}
							/>
						)}
						<button
							onClick={() => {
								resetTableFilter()
							}}
							className="flex flex-row items-center gap-1 text-gray-400"
						>
							<X size={16} className="gray-400" />
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

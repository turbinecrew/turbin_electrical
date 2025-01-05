"use client"
import type { SortingState, Column, Table } from "@tanstack/react-table"
import {
	ArrowUpDown,
	ListFilter,
	TextSearch,
	X,
	MoveDown,
	MoveUp,
} from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

import Button from "@/common/components/button"
import { FilterDataByRange } from "@/common/components/table/filter"
import { FileterPicker } from "@/features/realtime/components/trading-table/filter-picker"
import { SortPicker } from "@/features/realtime/components/trading-table/sort-picker"

import type { TradingTablePT } from "../Tcolumn"

type TradingTableHeaderPT = {
	table: Table<TradingTablePT>
	setSorting: React.Dispatch<React.SetStateAction<SortingState>>
}

export function TradingTableHeader({
	table,
	setSorting,
}: TradingTableHeaderPT) {
	const dropdownRef1 = useRef<HTMLDivElement>(null)
	const dropdownRef2 = useRef<HTMLDivElement>(null)
	const [toggleState, setToggleState] = useState({
		filtering: false,
		ordering: false,
	})

	const [activeFilter, setActiveFilter] = useState<Record<string, boolean>>({
		plantName: false,
		volume: false,
		bidNumbers: false,
	})
	const [currentSortColumn, setCurrentSortColumn] = useState("")

	const [sortingState, setSortingState] = useState<Record<string, boolean>>({
		plantName: false,
		volume: false,
		bidNumbers: false,
	})

	const updateState = useCallback(
		(newState: { filtering?: boolean; ordering?: boolean }) => {
			setToggleState((prevState) => ({
				...prevState,
				...newState,
			}))
		},
		[],
	)
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

	const resetTableFilter = (column: string) => {
		table.getColumn(column)?.setFilterValue(null)
		setActiveFilter((prevState: Record<string, boolean>) => ({
			...prevState,
			[column]: false,
		}))
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

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef1.current &&
				!dropdownRef1.current.contains(event.target as Node)
			) {
				updateState({ filtering: false })
			} else if (
				dropdownRef2.current &&
				!dropdownRef2.current.contains(event.target as Node)
			) {
				updateState({ ordering: false })
			}
		}

		document.addEventListener("mousedown", handleClickOutside)

		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [toggleState.ordering, updateState])

	return (
		<div className="ml-1 flex w-full flex-col">
			<div className="flex w-full justify-between">
				<div className="ml-4 flex items-center justify-start gap-4">
					<button
						onClick={() => {
							updateState({ filtering: !toggleState.filtering })
						}}
					>
						{toggleState.filtering ? (
							<ListFilter color="#6e6e6e" size={16} />
						) : (
							<ListFilter size={16} />
						)}
					</button>
					<button
						onClick={() => {
							updateState({ ordering: !toggleState.ordering })
						}}
					>
						{toggleState.ordering ? (
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
			<div className="relative">
				{toggleState.filtering && (
					<div ref={dropdownRef1}>
						<FileterPicker
							activeFilter={activeFilter}
							setActiveFilter={setActiveFilter}
							updateState={updateState}
							toggleState={toggleState}
						/>
					</div>
				)}
				{toggleState.ordering && (
					<div ref={dropdownRef2}>
						<SortPicker
							sortingState={sortingState}
							setSortingState={setSortingState}
							currentSortColumn={currentSortColumn}
							setCurrentSortColumn={setCurrentSortColumn}
							handleSort={handleSort}
							toggleState={toggleState}
							updateState={updateState}
						/>
					</div>
				)}
			</div>
			<div className="flex w-full flex-col gap-2 border-none p-2">
				{currentSortColumn != "" && (
					<Button
						onClick={resetSorting}
						className="flex w-fit gap-1 rounded-2xl border border-gray-300 bg-white text-slate-700 transition duration-200 ease-in focus:ring-2 focus:ring-gray-200"
					>
						{sortingState[currentSortColumn] ? (
							<MoveDown size={16} />
						) : (
							<MoveUp size={16} />
						)}
						<div className="flex w-full justify-center">
							{currentSortColumn === "plantName"
								? "발전소명"
								: currentSortColumn === "volume"
									? "전력 발전량"
									: currentSortColumn === "bidNumbers"
										? "거래량"
										: "정렬 기준 선택"}
						</div>

						<div className="flex items-center gap-1 text-gray-400">
							<X size={16} />
						</div>
					</Button>
				)}

				<div className="flex w-full flex-row items-center gap-2">
					{activeFilter["volume"] && table.getColumn("volume") && (
						<FilterDataByRange
							id={"volume"}
							resetTableFilter={resetTableFilter}
							column={table.getColumn("volume") as Column<unknown, unknown>}
						/>
					)}
					{activeFilter["bidNumbers"] && table.getColumn("bidNumbers") && (
						<FilterDataByRange
							id={"bidNumbers"}
							resetTableFilter={resetTableFilter}
							column={table.getColumn("bidNumbers") as Column<unknown, unknown>}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

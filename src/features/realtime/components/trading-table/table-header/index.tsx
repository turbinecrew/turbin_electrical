"use client"

import type { SortingState, Column, Table } from "@tanstack/react-table"
import {
	ArrowUpDown,
	ListFilter,
	TextSearch,
	X,
	ArrowDown,
	ArrowUp,
} from "lucide-react"
import type { ChangeEvent } from "react"
import { useCallback, useEffect, useRef, useState } from "react"

import TbButton from "@/common/components/button/TbButton"
import { FilterDataByRange } from "@/features/realtime/components/trading-table/filter"
import { FileterPicker } from "@/features/realtime/components/trading-table/filter-picker"
import { SortPicker } from "@/features/realtime/components/trading-table/sort-picker"
import {
	FilterColumnList,
	SortColumnList,
} from "@/features/realtime/components/types/table/types"

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

	function getActiveKeys(): string[] {
		return Object.entries(activeFilter)
			.filter(([_, value]) => value)
			.map(([key]) => key)
	}

	const [currentSortColumn, setCurrentSortColumn] = useState("")
	const [sortingState, setSortingState] = useState<Record<string, boolean>>({
		plantName: false,
		volume: false,
		bidVolume: false,
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
			bidVolume: false,
			bidNumbers: false,
		})
		setCurrentSortColumn("")
		setSorting([])
	}

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const filterValue = event.target.value
		table.getColumn("plantName")?.setFilterValue(filterValue)
		const currentSorting = table.getState().sorting
		if (currentSorting && currentSorting.length > 0) {
			const [currentSort] = currentSorting
			setSorting([{ id: currentSort.id, desc: currentSort.desc }])
		}
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

	const sortingText = SortColumnList.find(
		(column) => column.id === currentSortColumn,
	)

	return (
		<div className="ml-1 flex w-full flex-col">
			<div className="flex w-full justify-between">
				<div className="ml-4 flex items-center justify-start gap-4">
					<TbButton
						color="transparent"
						size="fit"
						onClick={() => {
							updateState({ filtering: !toggleState.filtering })
						}}
					>
						<ListFilter
							className={`h-3 w-3 md:h-4 md:w-4 ${
								toggleState.filtering ? "text-gray-500" : ""
							}`}
						/>
					</TbButton>
					<TbButton
						color="transparent"
						size="fit"
						onClick={() => {
							updateState({ ordering: !toggleState.ordering })
						}}
					>
						<ArrowUpDown
							className={`h-3 w-3 md:h-4 md:w-4 ${
								toggleState.ordering ? "text-gray-500" : ""
							}`}
						/>
					</TbButton>
				</div>
				<div className="flex h-fit items-center rounded-xl border border-gray-300 bg-white p-1 px-2 md:px-3">
					<TextSearch className="h-3 w-3 text-gray-400 md:h-4 md:w-4" />
					<input
						placeholder="Enter Name..."
						value={
							(table.getColumn("plantName")?.getFilterValue() as string) ?? ""
						}
						onChange={handleSearch}
						className="ml-2 w-32 border-none bg-transparent text-xs text-gray-600 placeholder-gray-400 outline-none md:w-48 md:text-sm"
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
			<div className="flex w-full flex-col gap-2 border-none p-1 md:p-2">
				{currentSortColumn != "" && (
					<TbButton
						color="tableWhite"
						size="table"
						onClick={resetSorting}
						className="flex w-fit gap-1"
					>
						{sortingState[currentSortColumn] ? (
							<ArrowDown className="h-4 w-4 md:h-5 md:w-5" />
						) : (
							<ArrowUp className="h-4 w-4 md:h-5 md:w-5" />
						)}
						<div className="flex w-full justify-center text-xs md:text-sm">
							{sortingText ? sortingText.name : "필터 선택"}
						</div>
						<X className="h-4 w-4 text-gray-400 md:h-5 md:w-5" />
					</TbButton>
				)}

				<div className="flex w-full flex-wrap items-center gap-2">
					{getActiveKeys().map((item) => {
						const columnData = FilterColumnList.find(
							(column) => column.id === item,
						)
						const tableColumn = table.getColumn(item)

						if (columnData && tableColumn) {
							return (
								<FilterDataByRange
									key={item}
									id={item}
									resetTableFilter={resetTableFilter}
									column={tableColumn as Column<unknown, unknown>}
								/>
							)
						}

						return null
					})}
				</div>
			</div>
		</div>
	)
}

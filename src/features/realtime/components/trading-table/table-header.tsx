"use client"
import type { SortingState, Column, Table } from "@tanstack/react-table"
import {
	AArrowDown,
	AArrowUp,
	ArrowUpDown,
	ChevronsDown,
	ChevronsUp,
	ListFilter,
	RotateCcw,
	TextSearch,
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
	const [isDesc1, setIsDesc1] = useState(false)
	const [isDesc2, setIsDesc2] = useState(false)
	const [isDesc3, setIsDesc3] = useState(false)

	const handleSort = (columnId: string) => {
		switch (columnId) {
			case "plantName":
				setIsDesc1(!isDesc1)
				break
			case "volume":
				setIsDesc2(!isDesc2)
				break
			case "bidNumbers":
				setIsDesc3(!isDesc3)
				break
		}

		setSorting((prev) => {
			if (prev[0]?.id === columnId) {
				return [{ id: columnId, desc: !prev[0].desc }]
			}
			return [{ id: columnId, desc: false }]
		})
	}
	const resetTable = () => {
		table.getColumn("volume")?.setFilterValue(null)
		table.getColumn("bidNumbers")?.setFilterValue(null)
	}

	return (
		<div className="ml-1 flex w-full flex-col">
			<div className="w- full flex justify-between">
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
				<div className="flex h-8 items-center rounded-xl border border-gray-300 bg-white px-4 focus-within:border-tbGreen">
					<TextSearch className="text-gray-400" size={16} />
					<input
						placeholder="Enter Name..."
						value={
							(table.getColumn("plantName")?.getFilterValue() as string) ?? ""
						}
						onChange={(event) =>
							table.getColumn("plantName")?.setFilterValue(event.target.value)
						}
						className="ml-2 h-full w-48 border-none bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none"
					/>
				</div>
			</div>
			<div className="flex w-full flex-col gap-2 border-none p-2">
				{isSortingToggle && (
					<div className="flex items-center justify-start gap-2">
						<Button
							onClick={() => handleSort("plantName")}
							className="flex items-center gap-1 border-none text-slate-700 transition duration-200 ease-in focus:ring-2 focus:ring-gray-200"
						>
							발전소명
							{isDesc1 ? <AArrowUp size={16} /> : <AArrowDown size={16} />}
						</Button>
						<Button
							onClick={() => handleSort("volume")}
							className="flex items-center gap-1 border-none text-slate-700 transition duration-200 ease-in focus:ring-2 focus:ring-gray-200"
						>
							전력 발전량
							{isDesc2 ? <ChevronsUp size={16} /> : <ChevronsDown size={16} />}
						</Button>
						<Button
							onClick={() => handleSort("bidNumbers")}
							className="flex items-center gap-1 border-none text-slate-700 transition duration-200 ease-in focus:ring-2 focus:ring-gray-200"
						>
							거래량
							{isDesc3 ? <ChevronsUp size={16} /> : <ChevronsDown size={16} />}
						</Button>
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
								resetTable()
							}}
							className="flex flex-row items-center gap-1 text-gray-400"
						>
							<RotateCcw size={16} className="gray-400" />
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

"use client"
import type { SortingState, ColumnDef } from "@tanstack/react-table"
import {
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	useReactTable,
	flexRender,
} from "@tanstack/react-table"
import {
	ArrowUpDown,
	ChevronDown,
	ChevronsDown,
	ChevronsUp,
	ListFilter,
	TextSearch,
} from "lucide-react"
import { useState } from "react"

import Button from "@/common/components/button"

import type { TradingTablePT } from "./Tcolumn"

type TradingTableComponentPT = {
	columns: ColumnDef<TradingTablePT>[]
	data: TradingTablePT[]
}

export function TradingTable({ columns, data }: TradingTableComponentPT) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [isToggle, setToggle] = useState(false)
	const [isSortingToggle, setSortingToggle] = useState(false)

	const [isDesc1, setIsDesc1] = useState(false)
	const [isDesc2, setIsDesc2] = useState(false)
	const [isDesc3, setIsDesc3] = useState(false)

	const table = useReactTable({
		columns,
		data: data || [],
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,

		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
		},
		defaultColumn: {
			size: 100,
			minSize: 50,
			maxSize: 300,
		},
	})

	const handleSort = (columnId: string) => {
		setSorting((prev) => {
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

			if (prev[0]?.id === columnId) {
				return [{ id: columnId, desc: !prev[0].desc }]
			}
			return [{ id: columnId, desc: false }]
		})
	}

	return (
		<div className="w-[700px]">
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
							className="ml-2 h-full w-48 border-none bg-transparent text-gray-600 placeholder-gray-400 outline-none"
						/>
					</div>
				</div>
				<div className="m-4 flex items-center justify-start gap-2">
					{isToggle && (
						<Button className="flex flex-row gap-1 border-none pr-4">
							<ChevronDown size={12} className="w-fit" />
						</Button>
					)}

					{isSortingToggle && (
						<div className="flex items-center justify-start gap-1">
							<Button
								onClick={() => handleSort("plantName")}
								className="flex items-center gap-1 border-none text-slate-700 transition duration-200 ease-in focus:ring-2 focus:ring-gray-200"
							>
								발전소명
								{isDesc1 ? (
									<ChevronsDown size={12} />
								) : (
									<ChevronsUp size={12} />
								)}
							</Button>
							<Button
								onClick={() => handleSort("volume")}
								className="flex items-center gap-1 border-none text-slate-700 transition duration-200 ease-in focus:ring-2 focus:ring-gray-200"
							>
								전력 발전량
								{isDesc2 ? (
									<ChevronsDown size={12} />
								) : (
									<ChevronsUp size={12} />
								)}
							</Button>
							<Button
								onClick={() => handleSort("bidNumbers")}
								className="flex items-center gap-1 border-none text-slate-700 transition duration-200 ease-in focus:ring-2 focus:ring-gray-200"
							>
								거래량
								{isDesc3 ? (
									<ChevronsDown size={12} />
								) : (
									<ChevronsUp size={12} />
								)}
							</Button>
						</div>
					)}
				</div>
			</div>

			<table className="w-full bg-[#F7F9FB]">
				<thead className="w-full border-b-4">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id} className="">
							{headerGroup.headers.map((header) => (
								<th key={header.id} style={{ width: header.getSize() }}>
									<div className="text-center font-semibold">
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className="divide-y divide-gray-200">
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id} className="hover:bg-gray-80">
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className="pb-1 pl-4 pr-4 pt-1">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

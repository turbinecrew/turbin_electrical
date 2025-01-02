"use client"
import type { SortingState, ColumnDef } from "@tanstack/react-table"
import {
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	useReactTable,
	flexRender,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, ListFilter, TextSearch } from "lucide-react"
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
	})

	const handleSort = (columnId: string) => {
		setSorting((prev) => {
			if (prev[0]?.id === columnId) {
				return [{ id: columnId, desc: !prev[0].desc }]
			}
			return [{ id: columnId, desc: false }]
		})
	}

	return (
		<div className="w-[800px]">
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
								className="border-none text-slate-700"
							>
								발전소명
							</Button>
							<Button
								onClick={() => handleSort("volume")}
								className="border-none text-slate-700"
							>
								전력 발전량
							</Button>
							<Button
								onClick={() => handleSort("bidNumbers")}
								className="border-none text-slate-700"
							>
								거래량
							</Button>
						</div>
					)}
				</div>
			</div>

			<table className="w-full">
				<thead className="bg-[#F7F9FB]">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className="border-b-8 p-2 text-left font-semibold"
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className="divide-y divide-gray-200">
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id} className="hover:bg-gray-80">
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className="p-2 pl-4">
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

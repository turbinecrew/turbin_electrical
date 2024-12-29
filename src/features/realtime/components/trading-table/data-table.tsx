"use client"
import {
	SortingState,
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	useReactTable,
	flexRender,
} from "@tanstack/react-table"
import React, { useState } from "react"

import Button from "@/common/components/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, ListFilter, TextSearch } from "lucide-react"
import { TradingTablePT } from "./Tcolumn"
type TradingTableComponentPT = {
	columns: ColumnDef<TradingTablePT>[]
	data: TradingTablePT[]
}
export function TradingTable({ columns, data }: TradingTableComponentPT) {
	const [sorting, setSorting] = React.useState<SortingState>([])
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
			<div className="m-1 flex justify-between">
				<div className="ml-4 flex items-center justify-start">
					<div className="ml-4 flex items-center justify-start">
						<button
							onClick={() => {
								setToggle((e) => !e)
							}}
						>
							{isToggle ? (
								<ListFilter color="#6e6e6e" size={16} className="mr-2" />
							) : (
								<ListFilter size={16} />
							)}
						</button>
						{isToggle && (
							<div className="ransition-opacity flex flex-row gap-1 duration-500">
								<ChevronDown />
								필터메뉴
							</div>
						)}
					</div>

					<div className="ml-4 flex items-center justify-start">
						<button
							onClick={() => {
								setSortingToggle((e) => !e)
							}}
						>
							{isSortingToggle ? (
								<ArrowUpDown color="#6e6e6e" size={16} className="mr-2" />
							) : (
								<ArrowUpDown size={16} />
							)}
						</button>
						{isSortingToggle ? (
							<div className="flex items-center justify-start">
								<Button onClick={() => handleSort("plantName")}>
									발전소명
								</Button>
								<Button onClick={() => handleSort("volume")}>
									전력 발전량
								</Button>
								<Button onClick={() => handleSort("bidNumbers")}>거래량</Button>
							</div>
						) : (
							<div></div>
						)}
					</div>
				</div>

				<div className="flex h-10 items-center rounded-2xl border border-gray-300 bg-white px-4 focus-within:border-tbGreen">
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

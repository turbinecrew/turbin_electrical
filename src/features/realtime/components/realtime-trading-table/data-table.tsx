"use client"
import {
	createColumnHelper,
	SortingState,
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	useReactTable,
	flexRender,
} from "@tanstack/react-table"
import React, { useState } from "react"
// Define your row shape

import Button from "@/common/components/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, ListFilter, Search } from "lucide-react"
import { TradingTablePT } from "./Tcolumn"
type props = {
	columns: ColumnDef<TradingTablePT>[]
	data: TradingTablePT[]
}
export function TradingTable({ columns, data }: props) {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [isCheck, setCheck] = useState(false)

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

	return (
		<div className="w-full">
			<div className="m-1 flex justify-between">
				<div className="ml-4 flex items-center justify-start">
					<button
						onClick={() => {
							// setCheck로 state값을 변경해주자.
							// e로 상태값을 받아왔다. 클릭시 상태값은 !상태값이므로 값이 반전된다 false -> true
							setCheck((e) => !e)
						}}
					>
						{isCheck ? (
							<div className="">
								<ListFilter color="#6e6e6e" size={16} />
							</div>
						) : (
							<ListFilter size={16} />
						)}
					</button>
					{isCheck && <ChevronDown />}
				</div>

				<div className="flex h-10 items-center rounded-2xl border border-gray-300 bg-gray-50 px-4 focus-within:border-tbGreen">
					<Search className="text-gray-400" size={16} />
					<input
						placeholder="Filter Name..."
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

"use client"
import type { SortingState, ColumnDef } from "@tanstack/react-table"
import {
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	useReactTable,
	flexRender,
} from "@tanstack/react-table"
import { useState } from "react"

import { TradingTableHeader } from "@/features/realtime/components/trading-table/table-header"

import type { TradingTablePT } from "./Tcolumn"

type TradingTableComponentPT = {
	columns: ColumnDef<TradingTablePT>[]
	data: TradingTablePT[]
}

export function TradingTable({ columns, data }: TradingTableComponentPT) {
	const [sorting, setSorting] = useState<SortingState>([])

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

	return (
		<div className="min-h-96 w-[700px]">
			<TradingTableHeader table={table} setSorting={setSorting} />
			<table className="w-full bg-[#F7F9FB]">
				<thead className="h-10 w-full border-b-4 pt-2">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id} className="">
							{headerGroup.headers.map((header) => (
								<th key={header.id} style={{ width: header.getSize() }}>
									<div className="text-center font-bold">
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

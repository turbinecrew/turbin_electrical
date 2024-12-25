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

export type TradingTablePT = {
	id: string
	plantName: string
	volume: number
	bidNumbers: number
	matchingButton: object
}

export const columns: ColumnDef<TradingTablePT>[] = [
	{
		accessorKey: "plantName",
		header: "발전소명",
	},
	{
		accessorKey: "volume",
		header: ({ column }) => {
			return (
				<Button
					className="text- border-none bg-[#F7F9FB] p-2 text-left font-semibold hover:bg-gray-200"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					전력 발전량
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},

		cell: ({ row }) => {
			const volume = parseFloat(row.getValue("volume"))
			const formatted = new Intl.NumberFormat("ko-KR", {}).format(volume)

			return <div className="text-start font-medium">{formatted}MWh</div>
		},
	},
	{
		accessorKey: "bidNumbers",
		header: ({ column }) => {
			return (
				<Button
					className="border-none bg-[#F7F9FB] p-2 text-left font-semibold hover:bg-gray-200"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					거래량
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: "matchingButton",
		header: "matchingButton",
		cell: (params) => (
			<strong>
				<Button>거래하기</Button>
			</strong>
		),
	},
]

const mockdata: TradingTablePT[] = [
	{
		id: "id_1",
		plantName: "Plant_1",
		volume: 798,
		bidNumbers: 45,
		matchingButton: { label: "Match", action: "match_1" },
	},
	{
		id: "id_2",
		plantName: "Plant_2",
		volume: 764,
		bidNumbers: 38,
		matchingButton: { label: "Match", action: "match_2" },
	},
	{
		id: "id_3",
		plantName: "Plant_3",
		volume: 955,
		bidNumbers: 15,
		matchingButton: { label: "Match", action: "match_3" },
	},
	{
		id: "id_4",
		plantName: "Plant_4",
		volume: 129,
		bidNumbers: 32,
		matchingButton: { label: "Match", action: "match_4" },
	},
	{
		id: "id_5",
		plantName: "Plant_5",
		volume: 404,
		bidNumbers: 3,
		matchingButton: { label: "Match", action: "match_5" },
	},
	{
		id: "id_6",
		plantName: "Plant_6",
		volume: 196,
		bidNumbers: 18,
		matchingButton: { label: "Match", action: "match_6" },
	},
	{
		id: "id_7",
		plantName: "Plant_7",
		volume: 274,
		bidNumbers: 50,
		matchingButton: { label: "Match", action: "match_7" },
	},
	{
		id: "id_8",
		plantName: "Plant_8",
		volume: 709,
		bidNumbers: 12,
		matchingButton: { label: "Match", action: "match_8" },
	},
	{
		id: "id_9",
		plantName: "Plant_9",
		volume: 517,
		bidNumbers: 42,
		matchingButton: { label: "Match", action: "match_9" },
	},
]

export function TradingTable() {
	const [data, setData] = React.useState<TradingTablePT[]>(mockdata)
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [isCheck, setCheck] = useState(false)

	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,

		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
		},
	})

	return (
		<div className="">
			<div className="overflow-x-auto">
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
										className="border-b-8 p-1 text-left font-semibold"
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
									<td key={cell.id} className="p-1 pl-3">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

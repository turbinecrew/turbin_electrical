"use client"

import Button from "@/common/components/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export type DataTablePT = {
	id: string
	tradeTime: string
	plantName: string
	volume: string
	bidPrice: string
	matchingStatus: "matched" | "unmatched"
}

export function getColumns(): ColumnDef<DataTablePT>[] {
	return [
		{
			accessorKey: "tradeTime",
			header: ({ column }) => {
				return (
					<div className=" ">
						<Button
							className="border-none hover:bg-gray-200"
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === "asc")
							}
						>
							tradeTime
							<ArrowUpDown className="ml-2 h-4 w-4" />
						</Button>
					</div>
				)
			},
			cell: ({ row }) => {
				const tradeTime = new Date(row.getValue("tradeTime"))
				const formatted = new Intl.DateTimeFormat("ko-KR", {
					dateStyle: "medium",
					timeStyle: "short",
					hour12: false,
				}).format(tradeTime)

				return <div className="text-start font-medium">{formatted}</div>
			},
		},
		{
			accessorKey: "plantName",
			header: "plantName",
		},
		{
			accessorKey: "volume",
			header: ({ column }) => {
				return (
					<Button
						className="border-none hover:bg-gray-200"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						volume
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
			accessorKey: "bidPrice",
			header: ({ column }) => {
				return (
					<Button
						className="border-none hover:bg-gray-200"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						bidPrice
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				)
			},

			cell: ({ row }) => {
				const bidPrice = parseFloat(row.getValue("bidPrice"))
				const formatted = new Intl.NumberFormat("ko-KR", {
					style: "currency",
					currency: "krw",
					currencyDisplay: "narrowSymbol",
				}).format(bidPrice)

				return <div className="text-start font-medium">{formatted}/kWh</div>
			},
		},
		{
			accessorKey: "matchingStatus",
			header: "matchingStatus",
			cell: ({ row }) => {
				const matchingStatus = row.getValue("matchingStatus")

				if (matchingStatus === "matched") {
					return (
						<div className="border-1 w-20 rounded-xl border bg-lime-700 text-center font-normal text-white">
							{matchingStatus}
						</div>
					)
				} else if (matchingStatus === "unmatched") {
					return (
						<div className="border-1 w-20 rounded-xl border bg-red-700 text-center font-normal text-white">
							{matchingStatus}
						</div>
					)
				}
			},
		},
	]
}

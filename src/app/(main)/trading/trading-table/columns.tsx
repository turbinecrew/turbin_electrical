"use client"

import Button from "@/components/common/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type EnergyTrade = {
	id: string
	tradeTime: string // 거래 시간
	plantName: string // 발전소 이름
	volume: string // 거래량
	bidPrice: string // 입찰 가격
	matchingStatus: "matched" | "unmatched" // 매칭 여부
}

export const columns: ColumnDef<EnergyTrade>[] = [
	{
		accessorKey: "tradeTime",
		header: ({ column }) => {
			return (
				<div className=" ">
					<Button
						className="border-none hover:bg-gray-200"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
	},
]

"use client"

import { ColumnDef } from "@tanstack/react-table"

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
		header: "tradeTime",
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
		header: "volume",
		cell: ({ row }) => {
			const volume = parseFloat(row.getValue("volume"))
			const formatted = new Intl.NumberFormat("ko-KR", {}).format(volume)

			return <div className="text-start font-medium">{formatted}MWh</div>
		},
	},
	{
		accessorKey: "bidPrice",
		header: "bidPrice",
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

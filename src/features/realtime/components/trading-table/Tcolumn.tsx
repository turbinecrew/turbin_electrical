"use client"

import Button from "@/common/components/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { useRouter } from "next/navigation"

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
		header: "전력 발전량",

		cell: ({ row }) => {
			const volume = parseFloat(row.getValue("volume"))
			const formatted = new Intl.NumberFormat("ko-KR", {}).format(volume)

			return <div className="text-start font-medium">{formatted}MWh</div>
		},
	},
	{
		accessorKey: "bidNumbers",
		header: "거래량",
	},
	{
		accessorKey: "matchingButton",
		header: "matchingButton",
		cell: (params) => <Button className="bg-[#ABCF8A]">거래하기</Button>,
	},
]

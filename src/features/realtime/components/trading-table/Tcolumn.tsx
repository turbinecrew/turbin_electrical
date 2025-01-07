"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"

import Button from "@/common/components/button"

export type TradingTablePT = {
	id: string
	plantName: string
	volume: number
	bidVolume: number
	bidNumbers: number
	matchingButton: object
}

export const columns: ColumnDef<TradingTablePT>[] = [
	{
		accessorKey: "plantName",
		header: "발전소명",
		cell: ({ row }) => {
			const plantName: string = row.getValue("plantName")
			return (
				<div className="col-span-2 text-start font-medium">{plantName}</div>
			)
		},
		size: 170,
	},
	{
		accessorKey: "volume",
		header: "발전량 (MWh)",

		cell: ({ row }) => {
			const volume = parseFloat(row.getValue("volume"))
			const formatted = new Intl.NumberFormat("ko-KR", {}).format(volume)

			return <div className="text-end font-medium">{formatted}</div>
		},
	},
	{
		accessorKey: "bidVolume",
		header: "거래량 (MWh)",

		cell: ({ row }) => {
			const volume = parseFloat(row.getValue("bidVolume"))
			const formatted = new Intl.NumberFormat("ko-KR", {}).format(volume)

			return <div className="text-end font-medium">{formatted}</div>
		},
	},
	{
		accessorKey: "bidNumbers",
		header: "거래 (건)",

		cell: ({ row }) => {
			const volume = parseFloat(row.getValue("bidNumbers"))
			const formatted = new Intl.NumberFormat("ko-KR", {}).format(volume)

			return <div className="text-wrap text-end font-medium">{formatted}</div>
		},
	},

	{
		accessorKey: "matchingButton",
		header: "-",
		cell: function Cell({ row }) {
			const router = useRouter()
			const { id } = row.original

			const handleClick = () => {
				router.push(`/trading/${id}`)
			}

			return (
				<div className="flex justify-center">
					<Button className="bg-tbPastelGreen text-xs" onClick={handleClick}>
						거래
					</Button>
				</div>
			)
		},
	},
]

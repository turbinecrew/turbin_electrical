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
		cell: ({ row }) => {
			const router = useRouter()
			const { id } = row.original

			const handleClick = () => {
				router.push(`/trading/${id}`)
			}

			return <Button onClick={handleClick}>거래하기</Button>
		},
	},
]
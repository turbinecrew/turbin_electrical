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
	},
	{
		accessorKey: "plantName",
		header: "plantName",
	},
	{
		accessorKey: "volume",
		header: "volume",
	},
	{
		accessorKey: "bidPrice",
		header: "bidPrice",
	},
	{
		accessorKey: "matchingStatus",
		header: "matchingStatus",
	},
]

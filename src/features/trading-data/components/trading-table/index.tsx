"use client"

import { CardComponent } from "@/common/components/card"

import { columns } from "./Tcolumn"
import { getData } from "./data"
import { TradingTable } from "./data-table"

export function TradingDataTable() {
	const data = getData()
	return (
		<CardComponent className="w-full">
			<TradingTable columns={columns} data={data} />
		</CardComponent>
	)
}

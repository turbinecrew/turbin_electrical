"use client"

import { TradingTable } from "./data-table"
import { columns } from "./Tcolumn"
import { getData } from "./data"
import { CardComponent } from "@/common/components/card"

export function TradingDataTable() {
	const data = getData()
	return (
		<CardComponent>
			<TradingTable columns={columns} data={data} />
		</CardComponent>
	)
}

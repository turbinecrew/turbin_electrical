"use client"

import { TradingTable } from "./data-table"
import { columns } from "./Tcolumn"
import { getData } from "./data"

export function TradingDataTable2sss() {
	const data = getData()
	return <TradingTable columns={columns} data={data} />
}

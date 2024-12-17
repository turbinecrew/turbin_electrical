"use client"

import { getColumns } from "./Tcolumns"
import getData from "./data"
import { DataTable } from "./data-table"

export function TradingDataTable() {
	const data = getData()
	return <DataTable columns={getColumns()} data={data} />
}

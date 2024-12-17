"use client"

import { getColumns } from "./Tcolumns"
import getData from "./data"
import { DataTableSet } from "./data-table"

export function TradingDataTable() {
	const data = getData()
	return <DataTableSet columns={getColumns()} data={data} />
}

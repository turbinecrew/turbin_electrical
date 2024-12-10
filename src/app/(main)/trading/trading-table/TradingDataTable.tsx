"use client"

import { DataTable } from "@/components/custom/data-table"
import { getColumns } from "./Tcolumns"
import getData from "./data"

export function TradingDataTable() {
	const data = getData()
	return <DataTable columns={getColumns()} data={data} />
}

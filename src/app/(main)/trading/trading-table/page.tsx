import { columns } from "./Tcolumns"
import { DataTable } from "@/components/ui/table/data-table"
import getData from "./data"

export default async function DemoPage() {
	const data = await getData()

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	)
}

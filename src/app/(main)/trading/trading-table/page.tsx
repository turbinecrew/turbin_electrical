import { columns } from "./columns"
import { DataTable } from "../../../../components/common/data-table"

import { EnergyTrade } from "./columns"
async function getData(): Promise<EnergyTrade[]> {
	return [
		{
			id: "trade001",
			tradeTime: "2023-12-04 12:00",
			plantName: "서울 태양광 발전소",
			volume: "500",
			bidPrice: "70",
			matchingStatus: "matched",
		},
	]
}

export default async function DemoPage() {
	const data = await getData()

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	)
}

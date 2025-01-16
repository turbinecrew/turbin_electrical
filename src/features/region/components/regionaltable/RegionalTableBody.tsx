"use client"

import type { DataEntry } from "@/features/region/types/regionTable"
import { TableRow, TableCell } from "@/shadcn/components/table"

interface RegionalTableBodyPT {
	data: DataEntry[]
	formattedToday: string
}

const headerData = [
	"시간",
	"발전량(kW)",
	"누적발전량(kWh)",
	"일사량(W/㎡)",
	"기온(℃)",
	"풍속(㎧)",
]

export default function RegionalTableBody({
	data,
	formattedToday,
}: RegionalTableBodyPT) {
	return (
		<>
			<TableRow>
				<TableCell colSpan={6} className="font-bold">
					오늘({formattedToday})
				</TableCell>
			</TableRow>
			{data.length > 0 ? (
				<>
					<TableRow>
						{headerData.map((header) => (
							<TableCell key={header} className="font-bold">
								{header}
							</TableCell>
						))}
					</TableRow>
					{data.map((item, idx) => (
						<TableRow
							key={item.time}
							className={idx % 2 === 0 ? "bg-tbPastelGreen" : " "}
						>
							<TableCell>{item.time}</TableCell>
							<TableCell>{item.generation_kw}</TableCell>
							<TableCell>{item.cumulative_generation_kwh}</TableCell>
							<TableCell>{item.solar_radiation_w_m2}</TableCell>
							<TableCell>{item.temperature_c}</TableCell>
							<TableCell>{item.wind_speed_m_s}</TableCell>
						</TableRow>
					))}
				</>
			) : (
				<TableRow>
					<TableCell colSpan={6}>데이터 없음</TableCell>
				</TableRow>
			)}
		</>
	)
}

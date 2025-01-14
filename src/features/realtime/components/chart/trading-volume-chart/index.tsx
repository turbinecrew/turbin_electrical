"use client"

import { TitleCard } from "@/common/components/card"
import { LineChartComponent } from "@/common/components/chart/line-chart"
import { groupByPendingDate } from "@/features/realtime/components/chart/trading-volume-chart/detaildata/groupByPendingDate"
import { mockdata } from "@/features/realtime/components/chart/trading-volume-chart/detaildata/mockdata"
import { generateChartConfig } from "@/features/trading-dashboard/utils/generateChartConfig"

export function VolumeChart() {
	const data = groupByPendingDate(mockdata)
	const chartConfig = generateChartConfig(data)

	console.log(data)
	return (
		<TitleCard title="월별 거래량">
			<div className="pt-4">
				<LineChartComponent
					chartConfig={chartConfig}
					chartData={data}
					LineDataKey={"volume"}
					XAixsDataKey={"date"}
					type={"monotone"}
					dot={false}
					Ymin={0}
					Ymax={"auto"}
					yFormat={"YM"}
				/>
			</div>
		</TitleCard>
	)
}

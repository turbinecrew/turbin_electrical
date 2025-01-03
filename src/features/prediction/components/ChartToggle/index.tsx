"use client"

import { useState } from "react"
import DailyChart from "../chart/daily"
import CombinedChart from "../chart/weather"
import type { ChartTogglePT } from "./type"

export default function ChartToggle({
	selectedRegion,
	setSelectedRegion,
}: ChartTogglePT) {
	const [chartMode, setChartMode] = useState<"region" | "date">("region")

	const baseStyle = "inline-block cursor-pointer transition-all"
	const activeStyle = "border-tbGreen font-semibold text-tbGreen"
	const inactiveStyle =
		"border-transparent font-thin text-gray-500 hover:text-tbGreen"

	return (
		<div className="mx-auto flex w-full flex-col">
			<div className="flex items-center gap-6 p-4">
				<span
					className={`${baseStyle} ${
						chartMode === "region" ? activeStyle : inactiveStyle
					}`}
					onClick={() => setChartMode("region")}
				>
					지역별 기상 예측
				</span>
				<span
					className={`${baseStyle} ${
						chartMode === "date" ? activeStyle : inactiveStyle
					}`}
					onClick={() => setChartMode("date")}
				>
					날짜별 발전량
				</span>
			</div>

			<div className="flex-1 overflow-hidden">
				{chartMode === "region" ? (
					<CombinedChart
						selectedRegion={selectedRegion}
						setSelectedRegion={setSelectedRegion}
					/>
				) : (
					<DailyChart />
				)}
			</div>
		</div>
	)
}

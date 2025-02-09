"use client"

import { useState } from "react"

import DailyChart from "./chart/daily"
import CombinedChart from "./chart/weather"

export default function ChartToggle() {
	const [chartMode, setChartMode] = useState<"region" | "date">("region")

	const baseStyle = "inline-block text-l cursor-pointer transition-all"
	const activeStyle = "border-tbGreen font-semibold text-tbGreen"
	const inactiveStyle =
		"border-transparent font-thin text-gray-500 hover:text-tbGreen"

	return (
		<div className="mx-auto w-full">
			<div className="flex items-center gap-6 pb-2 pt-2">
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

			<div className="flex w-full flex-col">
				{chartMode === "region" ? <CombinedChart /> : <DailyChart />}
			</div>
		</div>
	)
}

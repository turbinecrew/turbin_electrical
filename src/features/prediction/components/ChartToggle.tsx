// ChartToggle.tsx
"use client"

import { useState } from "react"

import DailyChart from "./chart/daily"
import CombinedChart from "./chart/weather"

export default function ChartToggle() {
	const [chartMode, setChartMode] = useState<"region" | "date">("region")

	return (
		<div className="mx-auto w-full">
			<div className="flex items-center gap-6 p-4">
				<span
					className={`inline-block cursor-pointer transition-all ${
						chartMode === "region"
							? "border-b-4 border-tbGreen font-semibold text-tbGreen"
							: "border-b-4 border-transparent font-thin text-gray-500 hover:text-tbGreen"
					} `}
					onClick={() => setChartMode("region")}
				>
					지역별 기상 예측
				</span>
				<span
					className={`inline-block cursor-pointer transition-all ${
						chartMode === "date"
							? "border-b-4 border-tbGreen font-semibold text-tbGreen"
							: "border-b-4 border-transparent font-thin text-gray-500 hover:text-tbGreen"
					} `}
					onClick={() => setChartMode("date")}
				>
					날짜별 발전량
				</span>
			</div>

			<div className="h-full w-full overflow-x-auto">
				{chartMode === "region" ? <CombinedChart /> : <DailyChart />}
			</div>
		</div>
	)
}

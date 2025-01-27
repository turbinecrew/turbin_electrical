import React from "react"

import { useRegionalWeatherData } from "@/features/predict/hooks/useRegionalWeatherData"

type RegionSelectPT = {
	regions?: string[]
	selectedRegion: string
	onChange: (region: string) => void
}

function RegionSelect({ selectedRegion, onChange }: RegionSelectPT) {
	const { data: weatherData, isLoading, isError } = useRegionalWeatherData()

	if (isLoading || isError) return <p>로딩 중 또는 에러 발생</p>

	const regions = Array.from(
		new Set(weatherData?.map((item) => item.region) || []),
	)

	return (
		<select
			value={selectedRegion}
			onChange={(e) => onChange(e.target.value)}
			className="w-36 rounded border border-gray-300 p-1 text-sm shadow-sm"
			aria-label="지역 선택"
		>
			{regions.map((region, idx) => (
				<option key={idx} value={region}>
					{region}
				</option>
			))}
		</select>
	)
}

export default RegionSelect

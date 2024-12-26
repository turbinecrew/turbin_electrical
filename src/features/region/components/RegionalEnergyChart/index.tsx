"use client"

import { useState, useMemo } from "react"
import {
	Bar,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts"

import { RegionalModal } from "@/features/auth/components/regional-modal"

import { data } from "./mocks"

export function RegionalEnergyChart() {
	const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [timeSeriesData, setTimeSeriesData] = useState([])

	const chartData = useMemo(() => {
		const regionGenerationMap: Record<string, number> = {}

		data.forEach((entry) => {
			const region = entry["지역"]
			const generation = entry["발전량(kW)"]
			if (region in regionGenerationMap) {
				regionGenerationMap[region] += generation
			} else {
				regionGenerationMap[region] = generation
			}
		})

		return Object.entries(regionGenerationMap).map(
			([region, totalGeneration]) => ({
				region,
				generation: parseFloat(totalGeneration.toFixed(3)),
			}),
		)
	}, [])

	const handleRegionClick = (region: string) => {
		setSelectedRegion(region)
		const regionData = data.filter((entry) => entry["지역"] === region)
		setTimeSeriesData(regionData)
		setIsModalOpen(true)
	}

	return (
		<div className="p-4">
			<div className="relative h-[35vh]">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						data={chartData}
						margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
						onClick={(e) => {
							if (e?.activeLabel) handleRegionClick(e.activeLabel)
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey="region"
							tickLine={false}
							tick={{ fontSize: 12, fontWeight: "bold" }}
							angle={-45}
							textAnchor="end"
						/>
						<YAxis tick={{ fontSize: 12, fontWeight: "bold" }} />
						<Tooltip contentStyle={{ fontWeight: "bold" }} />
						<Bar
							dataKey="generation"
							fill="#07A525"
							radius={[4, 4, 0, 0]}
							cursor="pointer"
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>

			<RegionalModal
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
				region={selectedRegion}
				timeSeriesData={timeSeriesData}
			/>
		</div>
	)
}

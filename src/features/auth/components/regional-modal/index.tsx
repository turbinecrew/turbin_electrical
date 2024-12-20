"use client"

import {
	Line,
	LineChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts"

import {
	Modal,
	ModalHeader,
	ModalContext,
	ModalFooter,
} from "@/common/components/modal"
import type { RegionalModalPT } from "@/features/region/types/regionModal"

export function RegionalModal({
	isOpen,
	setIsOpen,
	region,
	timeSeriesData,
}: RegionalModalPT) {
	const totalGeneration = timeSeriesData.reduce(
		(sum, entry) => sum + entry["발전량(kW)"],
		0,
	)
	const averageGeneration = (totalGeneration / timeSeriesData.length).toFixed(2)

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<ModalHeader>{region} 시간별 발전량</ModalHeader>
			<ModalContext>
				<div className="flex w-full justify-between">
					<div className="h-[300px] w-[600px]">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart
								data={timeSeriesData}
								margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis
									dataKey="시간"
									tick={{ fontSize: 12 }}
									label={{ value: "시간", position: "bottom" }}
								/>
								<YAxis
									tick={{ fontSize: 12 }}
									label={{
										value: "발전량(kW)",
										angle: -90,
										position: "insideLeft",
									}}
								/>
								<Tooltip />
								<Line type="monotone" dataKey="발전량(kW)" stroke="#07A525" />
							</LineChart>
						</ResponsiveContainer>
					</div>
					<div className="ml-4 flex flex-col justify-center space-y-4">
						<div className="rounded-lg border p-4 shadow-md">
							<h3 className="text-lg font-semibold">평균 발전량</h3>
							<p className="text-xl font-bold text-green-600">
								{averageGeneration} kW
							</p>
						</div>
						<div className="rounded-lg border p-4 shadow-md">
							<h3 className="text-lg font-semibold">누적 발전량</h3>
							<p className="text-xl font-bold text-blue-600">
								{totalGeneration.toFixed(2)} kW
							</p>
						</div>
					</div>
				</div>
			</ModalContext>
			<ModalFooter>
				<button className="rounded-xl bg-green-600 px-4 py-2 text-white">
					거래하기
				</button>
			</ModalFooter>
		</Modal>
	)
}

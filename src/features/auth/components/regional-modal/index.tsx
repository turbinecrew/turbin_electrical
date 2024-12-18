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

type RegionalModalPT = {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	region: string | null
	timeSeriesData: string
}

export function RegionalModal({
	isOpen,
	setIsOpen,
	region,
	timeSeriesData,
}: RegionalModalPT) {
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<ModalHeader>{region} 시간별 발전량</ModalHeader>
			<ModalContext>
				<div className="flex w-full justify-center">
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
										value: "발전량(kW)   ",
										angle: -90,
										position: "insideLeft",
									}}
								/>
								<Tooltip />
								<Line type="monotone" dataKey="발전량(kW)" stroke="#07A525" />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
			</ModalContext>
			<ModalFooter>
				<button className="rounded-lg bg-green-500 px-4 py-2 text-white">
					거래하기
				</button>
			</ModalFooter>
		</Modal>
	)
}

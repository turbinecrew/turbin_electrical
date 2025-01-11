"use client"

import { useMemo } from "react"
import {
	Bar,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts"

import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "@/shadcn/components/card"

import { useAmgoData } from "../../hooks/api/useAmgo"
interface TAmgoData {
	_id: string
	regionNm: string
	amgo: number
}
export function RegionalEnergyChart() {
	// const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
	// const [isModalOpen, setIsModalOpen] = useState(false)
	// const [timeSeriesData, setTimeSeriesData] = useState([])
	const { data, isLoading, isError } = useAmgoData()

	const chartData = useMemo(() => {
		if (!data) return [] // 데이터가 없으면 빈 배열 반환

		return data.map((entry: TAmgoData) => ({
			region: entry.regionNm,
			generation: parseFloat(entry.amgo.toFixed(2)), // 소수점 2자리 고정
		}))
	}, [data])
	if (isLoading) return <div>스켈레톤 예정</div>
	// 에러 처리
	if (isError) return <div>데이터를 불러오는 중 문제가 발생했습니다.</div>

	// const handleRegionClick = (region: string) => {
	// 	setSelectedRegion(region)
	// 	const regionData = data.filter((entry) => entry["지역"] === region)
	// 	setTimeSeriesData(regionData)
	// 	setIsModalOpen(true)
	// }

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>지역별 에너지 차트</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="relative h-[35vh] overflow-x-auto">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={chartData}
							margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
							// onClick={(e) => {
							// 	if (e?.activeLabel) handleRegionClick(e.activeLabel)
							// }}
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

				{/* <RegionalModal
						isOpen={isModalOpen}
						setIsOpen={setIsModalOpen}
						region={selectedRegion}
						//지역 명 넘길예정
						timeSeriesData={timeSeriesData}
					/> */}
			</CardContent>
		</Card>
	)
}

"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shadcn/components/card"

// 지점번호 매핑
const locations: Record<string, number> = {
	충청북도: 131,
	충청남도: 129,
	전라북도: 146,
	전라남도: 156,
	인천시: 112,
	울산시: 152,
	세종시: 133,
	서울시: 108,
	부산시: 159,
	대전시: 133,
	대구시: 143,
	광주시: 156,
	경상북도: 136,
	경상남도: 155,
	경기도: 119,
	강원도: 105,
	제주도: 184,
}

// 차트 데이터: 지점번호에서 값 가져오기
const chartData = Object.keys(locations).map((region) => ({
	region,
	generation: Math.floor(Math.random() * 1000) + 500, // 예제 데이터
}))

export function RegionalEnergyChart() {
	return (
		<div className="h-full w-full overflow-x-auto p-4">
			<div className="w-[1200px]">
				<Card className="shadow-md">
					<CardHeader>
						<CardTitle>지역별 지점 데이터 차트</CardTitle>
					</CardHeader>
					<CardContent>
						<BarChart
							width={1200} // 차트 너비 확대
							height={500} // 차트 높이 조정
							data={chartData}
							margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis
								dataKey="region"
								tickLine={false}
								tick={{ fontSize: 12, fontWeight: "bold" }} // X축 레이블 폰트 굵게
								angle={-45} // 레이블 기울이기
								textAnchor="end"
							/>
							<YAxis
								tick={{ fontSize: 12, fontWeight: "bold" }} // Y축 레이블 폰트 굵게
							/>
							<Tooltip
								contentStyle={{ fontWeight: "bold" }} // 툴팁 폰트 굵게
							/>
							<Bar dataKey="generation" fill="#07A525" radius={[4, 4, 0, 0]} />
						</BarChart>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

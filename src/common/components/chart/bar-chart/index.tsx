"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/shadcn/components/chart"

// 차트 설정 타입
type TChartConfig = {
	desktop: {
		label: string
		color: string
	}
	mobile: {
		label: string
		color: string
	}
}

// 차트 데이터 타입
type TChartDataItem = {
	month: string
	desktop: number
	mobile: number
}

// 공용 BarChart 컴포넌트
type BarChartComponentProps = {
	data: TChartDataItem[] // 차트 데이터
	config: TChartConfig // 차트 설정
}

export function BarChartComponent({ data, config }: BarChartComponentProps) {
	return (
		<ChartContainer config={config}>
			<BarChart accessibilityLayer data={data}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="month"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value.slice(0, 3)} // 월을 3글자 축소
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="dashed" />}
				/>
				<Bar dataKey="desktop" fill={config.desktop.color} radius={4} />
				<Bar dataKey="mobile" fill={config.mobile.color} radius={4} />
			</BarChart>
		</ChartContainer>
	)
}

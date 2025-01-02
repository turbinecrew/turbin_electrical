"use client"

import React, { useEffect, useState } from "react"

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shadcn/components/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shadcn/components/table"

// 데이터 타입 정의
type TradeData = {
	time: string
	price: number
	quantity: number
}

export default function RealTimeTradeCard() {
	const [tradeData, setTradeData] = useState<TradeData[]>([])

	useEffect(() => {
		const interval = setInterval(() => {
			const newTrade = {
				time: new Date().toLocaleTimeString(),
				price: Math.floor(100 + Math.random() * 1000),
				quantity: Math.floor(1 + Math.random() * 50),
			}
			setTradeData((prevData) => [newTrade, ...prevData])
		}, 2000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className="mx-auto max-w-4xl p-4">
			<Card>
				<CardHeader>
					<CardTitle className="text-center text-xl font-semibold">
						실시간 거래 목록
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="max-h-[30vh] overflow-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>거래 시간</TableHead>
									<TableHead>체결된 거래 가격</TableHead>
									<TableHead>거래 수량</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{tradeData.map((trade, idx) => (
									<TableRow key={idx}>
										<TableCell>{trade.time}</TableCell>
										<TableCell>₩{trade.price.toLocaleString()}</TableCell>
										<TableCell>{trade.quantity} MWh</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

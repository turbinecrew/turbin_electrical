"use client"

import React, { useState, useEffect } from "react"

import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
} from "@/shadcn/components/card"

type Bid = {
	id: number
	consumer: string
	requestedPower: number
	bidPrice: number
	smp: number
	rec: number
	totalPrice: number
	status: string
}

type PowerStats = {
	remainingPower: number
	totalPower: number
	resetTime: string
}

type Statistics = {
	totalRevenue: number
	totalTransactions: number
	pendingBids: number
}

export default function Manage() {
	const [bids, setBids] = useState<Bid[]>([])
	const [powerStats, setPowerStats] = useState<PowerStats | null>(null)
	const [statistics, setStatistics] = useState<Statistics | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const mockBids: Bid[] = [
			{
				id: 1,
				consumer: "User1",
				requestedPower: 100,
				bidPrice: 120,
				smp: 110,
				rec: 20,
				totalPrice: 14000,
				status: "Pending",
			},
			{
				id: 2,
				consumer: "User2",
				requestedPower: 200,
				bidPrice: 115,
				smp: 110,
				rec: 25,
				totalPrice: 23000,
				status: "Pending",
			},
			{
				id: 3,
				consumer: "User3",
				requestedPower: 200,
				bidPrice: 150,
				smp: 170,
				rec: 25,
				totalPrice: 14000,
				status: "Pending",
			},
		]

		const mockPowerStats: PowerStats = {
			remainingPower: 500,
			totalPower: 1000,
			resetTime: "일요일 자정",
		}

		const mockStatistics: Statistics = {
			totalRevenue: 150000,
			totalTransactions: 10,
			pendingBids: 2,
		}

		setBids(mockBids)
		setPowerStats(mockPowerStats)
		setStatistics(mockStatistics)
		setIsLoading(false)
	}, [])

	const approveBid = (bidId: number) => {
		setBids((prevBids) =>
			prevBids.map((bid) =>
				bid.id === bidId ? { ...bid, status: "Approved" } : bid,
			),
		)

		setPowerStats((prevStats) => {
			if (!prevStats) return null
			const approvedBid = bids.find((bid) => bid.id === bidId)
			return approvedBid
				? {
						...prevStats,
						remainingPower:
							prevStats.remainingPower - approvedBid.requestedPower,
					}
				: prevStats
		})
	}

	const rejectBid = (bidId: number) => {
		setBids((prevBids) =>
			prevBids.map((bid) =>
				bid.id === bidId ? { ...bid, status: "Rejected" } : bid,
			),
		)
	}

	if (isLoading || !powerStats || !statistics) {
		return (
			<div className="min-h-screen bg-white p-8 text-gray-800">Loading...</div>
		)
	}

	return (
		<div className="min-h-screen bg-white p-8 text-gray-800">
			<h1 className="mb-6 text-2xl font-bold">관리자 대시보드</h1>
			<div className="mb-8 grid grid-cols-3 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>현재 발전량</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="font-bold text-tbGreen">
							{powerStats.remainingPower} kWh
						</p>
						<p className="text-sm text-gray-600">
							총 발전량: {powerStats.totalPower} kWh
						</p>
						<p className="text-sm text-gray-600">
							초기화 시간: {powerStats.resetTime}
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>총 거래 수익</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="font-bold text-gray-700">
							₩{statistics.totalRevenue}
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>미처리 입찰</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="font-bold text-yellow-600">
							{statistics.pendingBids} 건
						</p>
					</CardContent>
				</Card>
			</div>
			<div>
				<h2 className="mb-2 text-lg font-semibold">입찰 요청</h2>
				<div className="overflow-x-auto">
					<table className="w-full border-collapse border border-gray-200 bg-white">
						<thead className="bg-gray-100">
							<tr>
								<th className="border border-gray-200 px-4 py-2">ID</th>
								<th className="border border-gray-200 px-4 py-2">소비자</th>
								<th className="border border-gray-200 px-4 py-2">
									요청 전력량
								</th>
								<th className="border border-gray-200 px-4 py-2">입찰 가격</th>
								<th className="border border-gray-200 px-4 py-2">총 금액</th>
								<th className="border border-gray-200 px-4 py-2">상태</th>
								<th className="border border-gray-200 px-4 py-2">관리</th>
							</tr>
						</thead>
						<tbody>
							{bids.map((bid) => (
								<tr key={bid.id} className="hover:bg-gray-50">
									<td className="border border-gray-200 px-4 py-2 text-center">
										{bid.id}
									</td>
									<td className="border border-gray-200 px-4 py-2 text-center">
										{bid.consumer}
									</td>
									<td className="border border-gray-200 px-4 py-2 text-center">
										{bid.requestedPower}
									</td>
									<td className="border border-gray-200 px-4 py-2 text-center">
										{bid.bidPrice}
									</td>
									<td className="border border-gray-200 px-4 py-2 text-center">
										{bid.totalPrice}
									</td>
									<td className="border border-gray-200 px-4 py-2 text-center">
										<span
											className={`rounded-full px-2 py-1 text-sm ${
												bid.status === "Pending"
													? "bg-yellow-100 text-yellow-700"
													: bid.status === "Approved"
														? "bg-green-100 text-green-700"
														: "bg-red-100 text-red-700"
											}`}
										>
											{bid.status}
										</span>
									</td>
									<td className="border border-gray-200 px-4 py-2 text-center">
										{bid.status === "Pending" && (
											<div className="flex justify-center gap-2">
												<button
													onClick={() => approveBid(bid.id)}
													className="rounded bg-tbGreen px-4 py-2 text-white shadow hover:bg-green-600"
												>
													승인
												</button>
												<button
													onClick={() => rejectBid(bid.id)}
													className="rounded bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600"
												>
													거부
												</button>
											</div>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

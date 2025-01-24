"use client"

import React, { useState, useEffect } from "react"

import BidMiniCard from "@/features/manage/components/BidMiniCard/bidMiniCard"
import BidTable from "@/features/manage/components/BidTable/bidTable"

type Bid = {
	id: number
	consumer: string
	requestedPower: number
	bidPrice: number
	totalPrice: number
	status: string
}

export default function ManagePage() {
	const [bids, setBids] = useState<Bid[]>([])
	const [selectedBids, setSelectedBids] = useState<number[]>([])
	const [filterText, setFilterText] = useState("")
	const [filter, setFilter] = useState("일간")
	const [sortColumn, setSortColumn] = useState<keyof Bid>("id")
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

	useEffect(() => {
		const mockBids: Bid[] = [
			{
				id: 1,
				consumer: "기업A",
				requestedPower: 100,
				bidPrice: 120,
				totalPrice: 12000,
				status: "Pending",
			},
			{
				id: 2,
				consumer: "기업B",
				requestedPower: 150,
				bidPrice: 130,
				totalPrice: 19500,
				status: "Pending",
			},
			{
				id: 3,
				consumer: "기업C",
				requestedPower: 200,
				bidPrice: 110,
				totalPrice: 22000,
				status: "Pending",
			},
		]
		setBids(mockBids)
	}, [])

	const updateBidStatus = (status: string) => {
		setBids((prevBids) =>
			prevBids.map((bid) =>
				selectedBids.includes(bid.id) ? { ...bid, status } : bid,
			),
		)
		setSelectedBids([])
	}

	const handleSort = (column: keyof Bid) => {
		const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc"
		setSortColumn(column)
		setSortOrder(order)
		setBids((prevBids) =>
			[...prevBids].sort((a, b) => {
				if (a[column] < b[column]) return order === "asc" ? -1 : 1
				if (a[column] > b[column]) return order === "asc" ? 1 : -1
				return 0
			}),
		)
	}

	return (
		<div className="min-h-screen bg-white p-8">
			<h1 className="mb-6 text-2xl font-bold">관리자 대시보드</h1>
			<div className="mb-4 flex justify-end">
				<select
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:outline-none"
				>
					{["일간", "주간", "월간", "연간"].map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
			<BidMiniCard />
			<div className="my-8 h-px w-full bg-gray-300"></div>
			<BidTable
				bids={bids}
				filterText={filterText}
				setFilterText={setFilterText}
				selectedBids={selectedBids}
				setSelectedBids={setSelectedBids}
				updateBidStatus={updateBidStatus}
				handleSort={handleSort}
				sortColumn={sortColumn}
				sortOrder={sortOrder}
			/>
		</div>
	)
}

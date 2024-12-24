"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
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
	totalPrice: number
	status: string
}

export default function Manage() {
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
	const toggleCheckbox = (id: number) => {
		setSelectedBids((prev) =>
			prev.includes(id) ? prev.filter((bidId) => bidId !== id) : [...prev, id],
		)
	}

	const toggleSelectAll = () => {
		setSelectedBids(
			selectedBids.length === bids.length ? [] : bids.map((bid) => bid.id),
		)
	}

	const filteredBids = bids.filter((bid) =>
		bid.consumer.toLowerCase().includes(filterText.toLowerCase()),
	)

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

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				{[
					{
						title: "전력 생산량",
						value: "500 kW",
						change: "+5%",
						total: "1000 kW",
					},
					{
						title: "총 수익",
						value: "$150,000",
						change: "-3%",
						total: "$300,000",
					},
					{
						title: "입찰 요청 수",
						value: "10 건",
						change: "+5%",
						total: "200 건",
					},
					{ title: "승인율", value: "92%", change: "-3%", total: "95%" },
				].map((item, index) => (
					<Card key={index}>
						<CardHeader>
							<CardTitle className="text-gray-500">{item.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-bold">{item.value}</p>
							<p
								className={`mt-1 text-sm ${item.change.startsWith("+") ? "text-red-500" : "text-blue-500"}`}
							>
								{item.change}
							</p>
							<p className="mt-1 text-gray-500">총 누적 {item.total}</p>
						</CardContent>
					</Card>
				))}
			</div>
			<div className="my-8 h-px w-full bg-gray-300"></div>

			<div className="mt-8">
				<div className="mb-4 flex justify-between">
					<input
						type="text"
						placeholder="소비자 검색"
						value={filterText}
						onChange={(e) => setFilterText(e.target.value)}
						className="rounded border px-4 py-2"
					/>
					<div>
						<button
							onClick={() => updateBidStatus("Approved")}
							disabled={selectedBids.length === 0}
							className="mr-2 rounded bg-green-500 px-4 py-2 text-white disabled:bg-gray-300"
						>
							Approve
						</button>
						<button
							onClick={() => updateBidStatus("Rejected")}
							disabled={selectedBids.length === 0}
							className="rounded bg-red-500 px-4 py-2 text-white disabled:bg-gray-300"
						>
							Reject
						</button>
					</div>
				</div>
				<table className="w-full border-collapse rounded-md border border-gray-200 shadow-md">
					<thead className="sticky top-0 bg-gray-100 text-gray-700">
						<tr>
							<th className="p-2 text-center">
								<input
									type="checkbox"
									onChange={toggleSelectAll}
									checked={selectedBids.length === bids.length}
									className="h-4 w-4 cursor-pointer"
								/>
							</th>
							{[
								"id",
								"consumer",
								"requestedPower",
								"bidPrice",
								"totalPrice",
								"status",
							].map((col) => (
								<th
									key={col}
									onClick={() => handleSort(col as keyof Bid)}
									className="cursor-pointer p-2 text-center text-sm font-semibold tracking-wide"
								>
									<div className="flex items-center justify-center">
										<span className="mr-1 capitalize">{col}</span>
										{sortColumn === col &&
											(sortOrder === "asc" ? (
												<ArrowUp className="h-4 w-4 text-gray-600" />
											) : (
												<ArrowDown className="h-4 w-4 text-gray-600" />
											))}
									</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{filteredBids.map((bid, index) => (
							<tr
								key={bid.id}
								className={`${
									index % 2 === 0 ? "bg-white" : "bg-gray-50"
								} transition-colors duration-200 hover:bg-gray-100`}
							>
								<td className="p-2 text-center">
									<input
										type="checkbox"
										checked={selectedBids.includes(bid.id)}
										onChange={() => toggleCheckbox(bid.id)}
										className="h-4 w-4 cursor-pointer"
									/>
								</td>
								<td className="p-2 text-center text-gray-700">{bid.id}</td>
								<td className="p-2 text-center text-gray-700">
									{bid.consumer}
								</td>
								<td className="p-2 text-center text-gray-700">
									{bid.requestedPower}
								</td>
								<td className="p-2 text-center text-gray-700">
									{bid.bidPrice}
								</td>
								<td className="p-2 text-center text-gray-700">
									{bid.totalPrice}
								</td>
								<td className="p-2 text-center">
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
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

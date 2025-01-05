"use client"

import { ArrowDown, ArrowUp } from "lucide-react"

import type { Bid, TablePT } from "@/features/types/bidTable/type"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shadcn/components/table"

export default function BidTable({
	bids,
	filterText,
	setFilterText,
	selectedBids,
	setSelectedBids,
	updateBidStatus,
	handleSort,
	sortColumn,
	sortOrder,
}: TablePT) {
	const toggleCheckbox = (id: number) => {
		setSelectedBids((prev: number[]) => {
			if (prev.includes(id)) {
				return prev.filter((bidId: number) => bidId !== id)
			} else {
				return [...prev, id]
			}
		})
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
		<div className="mt-8">
			<div className="mb-6 flex items-center justify-between">
				<input
					type="text"
					placeholder="소비자 검색"
					value={filterText}
					onChange={(e) => setFilterText(e.target.value)}
					className="rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
				/>
				<div>
					<button
						onClick={() => updateBidStatus("Approved")}
						disabled={selectedBids.length === 0}
						className="mr-2 rounded-md bg-green-500 px-4 py-2 text-sm text-white transition hover:bg-green-600 disabled:bg-gray-300"
					>
						승인
					</button>
					<button
						onClick={() => updateBidStatus("Rejected")}
						disabled={selectedBids.length === 0}
						className="rounded-md bg-red-500 px-4 py-2 text-sm text-white transition hover:bg-red-600 disabled:bg-gray-300"
					>
						거부
					</button>
				</div>
			</div>
			<div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
				<Table className="min-w-full bg-white">
					<TableHeader className="bg-gray-50">
						<TableRow>
							<TableHead className="p-3 text-center">
								<input
									type="checkbox"
									onChange={toggleSelectAll}
									checked={selectedBids.length === bids.length}
									className="h-4 w-4 cursor-pointer"
								/>
							</TableHead>
							{[
								"id",
								"consumer",
								"requestedPower",
								"bidPrice",
								"totalPrice",
								"status",
							].map((col) => (
								<TableHead
									key={col}
									onClick={() => handleSort(col as keyof Bid)}
									className="cursor-pointer p-3 text-center text-sm font-semibold text-gray-600 hover:text-blue-500"
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
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredBids.length > 0 ? (
							filteredBids.map((bid, idx) => (
								<TableRow
									key={bid.id}
									className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
								>
									<TableCell className="p-3 text-center">
										<input
											type="checkbox"
											checked={selectedBids.includes(bid.id)}
											onChange={() => toggleCheckbox(bid.id)}
											className="h-4 w-4 cursor-pointer"
										/>
									</TableCell>
									<TableCell className="p-3 text-center">{bid.id}</TableCell>
									<TableCell className="p-3 text-center">
										{bid.consumer}
									</TableCell>
									<TableCell className="p-3 text-center">
										{bid.requestedPower}
									</TableCell>
									<TableCell className="p-3 text-center">
										{bid.bidPrice}
									</TableCell>
									<TableCell className="p-3 text-center">
										{bid.totalPrice}
									</TableCell>
									<TableCell className="p-3 text-center">
										<span
											className={`rounded-full px-3 py-1 text-xs font-medium ${
												bid.status === "Pending"
													? "bg-yellow-100 text-yellow-600"
													: bid.status === "Approved"
														? "bg-green-100 text-green-600"
														: "bg-red-100 text-red-600"
											}`}
										>
											{bid.status}
										</span>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={7}
									className="p-6 text-center text-gray-500"
								>
									검색된 입찰 데이터가 없습니다.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}

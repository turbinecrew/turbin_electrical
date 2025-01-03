"use client"

import { ArrowDown, ArrowUp } from "lucide-react"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shadcn/components/table"

type Bid = {
	id: number
	consumer: string
	requestedPower: number
	bidPrice: number
	totalPrice: number
	status: string
}

type TablePT = {
	bids: Bid[]
	filterText: string
	setFilterText: (text: string) => void
	selectedBids: number[]
	setSelectedBids: (ids: number[]) => void
	updateBidStatus: (status: string) => void
	handleSort: (column: keyof Bid) => void
	sortColumn: keyof Bid
	sortOrder: "asc" | "desc"
}

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
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="text-center">
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
								className="cursor-pointer text-center text-sm font-semibold tracking-wide"
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
					{filteredBids.map((bid, idx) => (
						<TableRow key={bid.id}>
							<TableCell className="text-center">
								<input
									type="checkbox"
									checked={selectedBids.includes(bid.id)}
									onChange={() => toggleCheckbox(bid.id)}
									className="h-4 w-4 cursor-pointer"
								/>
							</TableCell>
							<TableCell className="text-center">{bid.id}</TableCell>
							<TableCell className="text-center">{bid.consumer}</TableCell>
							<TableCell className="text-center">
								{bid.requestedPower}
							</TableCell>
							<TableCell className="text-center">{bid.bidPrice}</TableCell>
							<TableCell className="text-center">{bid.totalPrice}</TableCell>
							<TableCell className="text-center">
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
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

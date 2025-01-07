export type Bid = {
	id: number
	consumer: string
	requestedPower: number
	bidPrice: number
	totalPrice: number
	status: string
}

export type TablePT = {
	bids: Bid[]
	filterText: string
	setFilterText: (text: string) => void
	selectedBids: number[]
	setSelectedBids: React.Dispatch<React.SetStateAction<number[]>>
	updateBidStatus: (status: string) => void
	handleSort: (column: keyof Bid) => void
	sortColumn: keyof Bid
	sortOrder: "asc" | "desc"
}

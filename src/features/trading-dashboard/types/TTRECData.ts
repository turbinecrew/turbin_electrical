export type TRECData = {
	_id: { $oid: string }
	date: string
	value?: number
	trade_volume?: number
	average_price?: number
	highest_price?: number
	lowest_price?: number
	closing_price?: number
}

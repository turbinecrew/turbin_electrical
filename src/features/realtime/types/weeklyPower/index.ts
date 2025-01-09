export interface RawData {
	trade_kwh: number
	date: string
	generation_kw: number
	cumulative_generation_kwh: number
	region: string
}

export interface ProcessedData {
	날짜: string
	발전량: number
	잔여거래량: number
}

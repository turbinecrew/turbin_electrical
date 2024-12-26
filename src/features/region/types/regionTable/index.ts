// src/types/data.d.ts
export type DataItem = {
	지역: string
	날짜: string // YYYY-MM-DD
	시간: string
	발전량: number
	누적발전량: number
	일사량: number
	기온: number
	풍속: number
}
export interface DataEntry {
	_id?: { $oid: string } // MongoDB의 _id 필드 (선택적)
	시간: string
	"일사량(W/㎡)": number
	"기온(℃)": number
	"풍속(㎧)": number
	"발전량(kW)": number
	"누적발전량(kWh)": number
	지역: string
	날짜: string
}

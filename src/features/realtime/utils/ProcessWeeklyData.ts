import type {
	RawData,
	ProcessedData,
} from "@/features/realtime/types/weeklyPower"

export function processWeeklyData(rawData: RawData[]): ProcessedData[] {
	return rawData.reduce((acc: ProcessedData[], item) => {
		const existingItem = acc.find((data) => data.날짜 === item.date)
		if (!existingItem) {
			acc.push({
				날짜: item.date,
				발전량: item.generation_kw,
				잔여거래량: item.cumulative_generation_kwh - (item.trade_kwh || 0),
			})
		}
		return acc
	}, [])
}

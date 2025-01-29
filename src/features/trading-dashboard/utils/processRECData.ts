import type { TRECData } from "@/features/trading-dashboard/types/TTRECData"

export const processRECData = (data: TRECData[]) => {
	let date = new Date()
	return data.map((item: TRECData) => {
		if (item.value) {
			date = new Date(item.date)
		} else if (item.average_price) {
			const cleanedDateStr = item.date.replace(/\(.*?\)/g, "").trim()

			// 문자열을 "YYYY.MM.DD" 형식으로 파싱
			const [year, month, day] = cleanedDateStr.split(".")

			// JavaScript Date 객체 생성 (월은 0부터 시작하므로 -1 필요)
			date = new Date(
				parseInt(year, 10),
				parseInt(month, 10) - 1,
				parseInt(day, 10),
			)
		}

		const rec = item.value ? item.value : item.average_price
		date.setHours(0, 11, 0, 0) // 그래프에 시간 표시 안하게
		return {
			date,
			rec,
		}
	})
}

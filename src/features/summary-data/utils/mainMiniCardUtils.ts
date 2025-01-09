import type { TRECData } from "@/features/summary-data/types/TodayREC"
import type { TSMPData } from "@/features/summary-data/types/TodaySmp"

export function getMiniCardData(
	todaySMPData: TSMPData[] | null,
	todayRECData: TRECData[] | null,
) {
	const recentSMPData: TSMPData | null =
		todaySMPData && todaySMPData.length > 0
			? todaySMPData[todaySMPData.length - 1]
			: null

	const previousSMPData: TSMPData | null =
		todaySMPData && todaySMPData.length > 1
			? todaySMPData[todaySMPData.length - 2]
			: null

	const smpDifference =
		recentSMPData && previousSMPData
			? recentSMPData.Land - previousSMPData.Land
			: 0
	const isSMPIncreased = smpDifference > 0
	const smpAmount = Math.round(Math.abs(smpDifference) * 100) / 100

	const recentRECData: TRECData | null =
		todayRECData && todayRECData.length > 0
			? todayRECData[todayRECData.length - 1]
			: null

	const previousRECData: TRECData | null =
		todayRECData && todayRECData.length > 1
			? todayRECData[todayRECData.length - 2]
			: null

	const recDifference =
		recentRECData && previousRECData
			? recentRECData.closing_price - previousRECData.closing_price
			: 0
	const isRECIncreased = recDifference > 0
	const recAmount = Math.round(Math.abs(recDifference) * 100) / 100

	return [
		{
			title: "일일전력생산량",
			value: 721,
			unit: "Mwh",
			isIncreased: true,
			amount: 320,
			color: "bg-[#F6FCF3]",
		},
		{
			title: "일일전력판매량",
			value: 433,
			unit: "Mwh",
			isIncreased: false,
			amount: 0.35,
			color: "bg-[#EFF6F1]",
		},
		{
			title: "SMP 현재가",
			value: recentSMPData ? recentSMPData.Land : "데이터 없음",
			unit: "원/kWh",
			isIncreased: isSMPIncreased,
			amount: smpAmount,
			color: "bg-[#F6FCF3]",
		},
		{
			title: "REC 현재가",
			value: recentRECData ? recentRECData.closing_price : "데이터 없음",
			unit: "원/REC",
			isIncreased: isRECIncreased,
			amount: recAmount,
			color: "bg-[#EFF6F1]",
		},
	]
}

import type { TSMPData } from "@/features/summary-data/types/TodaySmp"

export function getMiniCardData(todaySMPData: TSMPData[] | null) {
	const recentSMPData: TSMPData | null =
		todaySMPData && todaySMPData.length > 0
			? todaySMPData[todaySMPData.length - 1]
			: null

	const previousSMPData: TSMPData | null =
		todaySMPData && todaySMPData.length > 1
			? todaySMPData[todaySMPData.length - 2]
			: null

	const landDifference =
		recentSMPData && previousSMPData
			? recentSMPData.Land - previousSMPData.Land
			: 0
	const isIncreased = landDifference > 0
	const amount = Math.round(Math.abs(landDifference) * 100) / 100

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
			title: "일일",
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
			isIncreased: isIncreased,
			amount: amount,
			color: "bg-[#F6FCF3]",
		},
		{
			title: "REC 현재가",
			value: 456,
			unit: "원/REC",
			isIncreased: true,
			amount: 4.5,
			color: "bg-[#EFF6F1]",
		},
	]
}

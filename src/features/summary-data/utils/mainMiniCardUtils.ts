import type { TRECData } from "@/features/summary-data/types/TodayREC"
import type { TSMPData } from "@/features/summary-data/types/TodaySmp"
import type { TElcGen } from "@/features/summary-data/types/TodayElcGen"

export function getMiniCardData(
	todaySMPData: TSMPData[] = [],
	todayRECData: TRECData[] = [],
	todayElcGenData: TElcGen[] = [],
) {
	// 최신 및 이전 SMP 데이터 처리
	const recentSMPData = todaySMPData.at(-1)
	const previousSMPData = todaySMPData.at(-2)

	const smpDifference =
		recentSMPData && previousSMPData
			? recentSMPData.Land - previousSMPData.Land
			: 0
	const isSMPIncreased = smpDifference > 0
	const smpAmount = Math.round(Math.abs(smpDifference) * 100) / 100

	// 최신 및 이전 REC 데이터 처리
	const recentRECData = todayRECData.at(-1)
	const previousRECData = todayRECData.at(-2)

	const recDifference =
		recentRECData && previousRECData
			? recentRECData.closing_price - previousRECData.closing_price
			: 0
	const isRECIncreased = recDifference > 0
	const recAmount = Math.round(Math.abs(recDifference) * 100) / 100

	// 최신 및 이전 전력생산량 데이터 처리
	const recentElcGenData = todayElcGenData.at(-1)
	const previousElcGenData = todayElcGenData.at(-2)

	const elcGenDifference =
		recentElcGenData && previousElcGenData
			? recentElcGenData.cumulative_generation_kwh -
				previousElcGenData.cumulative_generation_kwh
			: 0
	const isElcGenIncreased = elcGenDifference > 0
	const elcGenAmount = Math.round(Math.abs(elcGenDifference) * 100) / 100

	return [
		{
			title: "일일전력생산량",
			value: recentElcGenData?.cumulative_generation_kwh || "데이터 없음",
			unit: "Mwh",
			isIncreased: isElcGenIncreased,
			amount: elcGenAmount,
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
			value: recentSMPData?.Land || "데이터 없음",
			unit: "원/kWh",
			isIncreased: isSMPIncreased,
			amount: smpAmount,
			color: "bg-[#F6FCF3]",
		},
		{
			title: "REC 현재가",
			value: recentRECData?.closing_price || "데이터 없음",
			unit: "원/REC",
			isIncreased: isRECIncreased,
			amount: recAmount,
			color: "bg-[#EFF6F1]",
		},
	]
}

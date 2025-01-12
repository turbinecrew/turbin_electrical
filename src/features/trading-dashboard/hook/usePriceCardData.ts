import { useTodayRECData } from "@/features/trading-dashboard/hook/useTodayRECData"
import { useTodaySMPData } from "@/features/trading-dashboard/hook/useTodaySMPData"

export function usePriceCardData() {
	const {
		data: todaySMPData,
		// isLoading: isSMPLoading,
		// isError: isSMPError,
	} = useTodaySMPData()
	const {
		data: todayRECData,
		// isLoading: isRECLoading,
		// isError: isRECError,
	} = useTodayRECData()

	// 가장 최근 데이터 추출
	const recentSMPData =
		todaySMPData?.length > 0 ? todaySMPData[todaySMPData.length - 1] : null

	const secondSMPData =
		todaySMPData?.length > 0 ? todaySMPData[todaySMPData.length - 2] : null

	const SMPDataGap = () =>
		recentSMPData?.Land && secondSMPData?.Land
			? parseFloat((recentSMPData.Land - secondSMPData.Land).toFixed(2))
			: null

	// REC 데이터 추출
	const recentRECData =
		todayRECData?.length > 0 ? todayRECData[todayRECData.length - 1] : null

	const secondRECData =
		todayRECData?.length > 0 ? todayRECData[todayRECData.length - 2] : null

	// 데이터 간의 차이 계산

	const RECDataGap = () =>
		recentRECData?.closing_price && secondRECData?.closing_price
			? parseFloat(
					(recentRECData.closing_price - secondRECData.closing_price).toFixed(
						2,
					),
				)
			: null

	const mathSymbol = (number: number | null) => {
		return number == null
			? null
			: number > 0
				? true
				: number == 0
					? false
					: null
	}

	const priceCardData = [
		{
			title: "현재 SMP 가격",
			value: recentSMPData ? recentSMPData.Land : "-",
			unit: "원/kWh",
			isIncreased: mathSymbol(SMPDataGap()),
			amount: SMPDataGap(),
			color: "bg-[#F6FCF3]",
		},
		{
			title: "현재 REC 가격",
			value: recentRECData ? recentRECData.closing_price : "-",
			unit: "원/REC",
			isIncreased: mathSymbol(RECDataGap()),
			amount: RECDataGap(),
			color: "bg-[#EFF6F1]",
		},
	]

	return priceCardData
}

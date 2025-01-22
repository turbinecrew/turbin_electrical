import { MiniCardPT } from "@/common/components/card/new-card/types"
import { useTodayRECData } from "@/features/trading-dashboard/hook/useTodayRECData"
import { useTodaySMPData } from "@/features/trading-dashboard/hook/useTodaySMPData"

export function usePriceCardData(): MiniCardPT[] {
	const {
		data: todaySMPData,
		isLoading: isSMPLoading,
		isError: isSMPError,
	} = useTodaySMPData()

	const {
		data: todayRECData,
		isLoading: isRECLoading,
		isError: isRECError,
	} = useTodayRECData()

	// 가장 최근 데이터 추출
	const recentSMPData =
		todaySMPData?.length > 0 ? todaySMPData[todaySMPData.length - 1] : null

	const secondSMPData =
		todaySMPData?.length > 1 ? todaySMPData[todaySMPData.length - 2] : null

	const SMPDataGap =
		recentSMPData?.Land && secondSMPData?.Land
			? parseFloat((recentSMPData.Land - secondSMPData.Land).toFixed(2))
			: null

	const recentRECData =
		todayRECData?.length > 0 ? todayRECData[todayRECData.length - 1] : null

	const secondRECData =
		todayRECData?.length > 1 ? todayRECData[todayRECData.length - 2] : null

	const RECDataGap =
		recentRECData?.closing_price && secondRECData?.closing_price
			? parseFloat(
					(recentRECData.closing_price - secondRECData.closing_price).toFixed(
						2,
					),
				)
			: null

	const mathSymbol = (number: number | null) => {
		if (number === null) return null
		return number > 0 ? true : number === 0 ? false : "noChange"
	}

	if (isSMPError || isRECError) {
		return [
			{
				title: "SMP 현재가",
				value: "error",
				unit: "원/kWh",
				isIncreased: null,
				amount: null,
			},
			{
				title: "REC 현재가",
				value: "error",
				unit: "원/REC",
				isIncreased: null,
				amount: null,
			},
		]
	}

	if (isSMPLoading || isRECLoading) {
		return [
			{
				title: "SMP 현재가",
				value: "-",
				unit: "원/kWh",
				isIncreased: null,
				amount: null,
			},
			{
				title: "REC 현재가",
				value: "-",
				unit: "원/REC",
				isIncreased: null,
				amount: null,
			},
		]
	}

	return [
		{
			title: "SMP 현재가",
			value: recentSMPData ? recentSMPData.Land : "-",
			unit: "원/kWh",
			isIncreased: mathSymbol(SMPDataGap),
			amount: SMPDataGap,
		},
		{
			title: "REC 현재가",
			value: recentRECData ? recentRECData.closing_price : "-",
			unit: "원/REC",
			isIncreased: mathSymbol(RECDataGap),
			amount: RECDataGap,
		},
	]
}

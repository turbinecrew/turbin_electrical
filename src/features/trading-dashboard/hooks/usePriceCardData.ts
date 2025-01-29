import { useTodayRECData } from "@/features/trading-dashboard/hooks/useTodayRECData"
import { useTodaySMPData } from "@/features/trading-dashboard/hooks/useTodaySMPData"

export const usePriceCardData = () => {
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
		return number > 0 ? true : number === 0 ? false : null
	}

	if (isSMPError || isRECError) {
		return [
			{
				title: "현재 SMP 가격",
				value: "error",
				unit: "원/kWh",
				isIncreased: null,
				amount: null,
				color: "bg-[#F6FCF3]",
			},
			{
				title: "현재 REC 가격",
				value: "error",
				unit: "원/REC",
				isIncreased: null,
				amount: null,
				color: "bg-[#EFF6F1]",
			},
		]
	}

	if (isSMPLoading || isRECLoading) {
		return [
			{
				title: "현재 SMP 가격",
				value: "-",
				unit: "원/kWh",
				isIncreased: null,
				amount: null,
				color: "bg-[#F6FCF3]",
			},
			{
				title: "현재 REC 가격",
				value: "-",
				unit: "원/REC",
				isIncreased: null,
				amount: null,
				color: "bg-[#EFF6F1]",
			},
		]
	}

	return [
		{
			title: "현재 SMP 가격",
			value: recentSMPData ? recentSMPData.Land : "-",
			unit: "원/kWh",
			isIncreased: mathSymbol(SMPDataGap),
			amount: SMPDataGap,
			color: "bg-[#F6FCF3]",
		},
		{
			title: "현재 REC 가격",
			value: recentRECData ? recentRECData.closing_price : "-",
			unit: "원/REC",
			isIncreased: mathSymbol(RECDataGap),
			amount: RECDataGap,
			color: "bg-[#EFF6F1]",
		},
	]
}

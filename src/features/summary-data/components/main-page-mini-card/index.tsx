import { MiniCard } from "@/common/components/card"
import { useTodayElcGen } from "@/features/summary-data/hooks/uesTodayElcGen"
import { useTodayRECData } from "@/features/summary-data/hooks/useTodayRECData"
import { useTodaySMPData } from "@/features/summary-data/hooks/useTodaySMPData"
import { getMiniCardData } from "@/features/summary-data/utils/mainMiniCardUtils"

export function MainPageSummaryCard() {
	const {
		data: TODAY_SMP,
		isLoading: isSMPDataLoading,
		isError: isSMPDataError,
	} = useTodaySMPData()

	const {
		data: TODAY_REC,
		isLoading: isRECDataLoading,
		isError: isRECDataError,
	} = useTodayRECData()

	const {
		data: TIME_BASED_GENERATION,
		isLoading: isElcGenDataLoading,
		isError: isElcGenDataError,
	} = useTodayElcGen()

	const miniCardData = getMiniCardData(
		TODAY_SMP,
		TODAY_REC,
		TIME_BASED_GENERATION,
	)

	return (
		<div className="grid grid-cols-4 gap-4">
			{miniCardData.map((item, idx) => {
				let value = item.value
				let unit = item.unit
				let amount = item.amount ?? 0
				let isIncreased = item.isIncreased ?? false

				// 로딩 상태 처리
				if (idx === 0 && isElcGenDataLoading) {
					value = "Loading..."
					unit = ""
					amount = 0
					isIncreased = false
				} else if (idx === 1 && isRECDataLoading) {
					value = "Loading..."
					unit = ""
					amount = 0
					isIncreased = false
				} else if (idx === 2 && isSMPDataLoading) {
					value = "Loading..."
					unit = ""
					amount = 0
					isIncreased = false
				}

				// 에러 상태 처리
				if (idx === 0 && isElcGenDataError) {
					value = "Error"
					unit = ""
					amount = 0
					isIncreased = false
				} else if (idx === 1 && isRECDataError) {
					value = "Error"
					unit = ""
					amount = 0
					isIncreased = false
				} else if (idx === 2 && isSMPDataError) {
					value = "Error"
					unit = ""
					amount = 0
					isIncreased = false
				}

				return (
					<MiniCard
						key={idx}
						title={item.title}
						value={value}
						unit={unit}
						isIncreased={isIncreased}
						amount={amount}
					/>
				)
			})}
		</div>
	)
}

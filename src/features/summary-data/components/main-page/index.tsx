import { MiniCard } from "@/common/components/card"
import { LoadingComponent } from "@/common/components/loading"
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

	if (isSMPDataLoading || isRECDataLoading) {
		return <LoadingComponent />
	}

	if (isSMPDataError || isRECDataError) {
		return <div>Error loading data.</div>
	}
	const miniCardData = getMiniCardData(TODAY_SMP, TODAY_REC)

	return (
		<div className="grid grid-cols-4 gap-4">
			{miniCardData.map((item, idx) => (
				<MiniCard
					key={idx}
					title={item.title}
					value={item.value}
					unit={item.unit}
					isIncreased={item.isIncreased}
					amount={item.amount}
				/>
			))}
		</div>
	)
}

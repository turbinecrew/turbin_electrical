import { MiniCard } from "@/common/components/card"
import { useTodaySMPData } from "@/features/summary-data/hook/useTodaySMPData"
import { getMiniCardData } from "@/features/summary-data/utils/smpCardUtils"

export function MainPageSummaryCard() {
	const { data: TODAY_SMP, isLoading, isError } = useTodaySMPData()

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error loading data</div>

	const miniCardData = getMiniCardData(TODAY_SMP)

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

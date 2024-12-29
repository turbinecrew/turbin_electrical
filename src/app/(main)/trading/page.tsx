import type { MiniCardPT } from "@/common/components/card"
import { TitleCard, CardComponent, MiniCard } from "@/common/components/card"
import { LineComponent } from "@/features/realtime/components/chart"
import { VolumeChart } from "@/features/realtime/components/chart/trading-volume-chart"
import { TradingDataTable2sss } from "@/features/realtime/components/realtime-trading-table"
import { TradingTable } from "@/features/realtime/components/realtime-trading-table/data-table"
import { TradingVolumeCards } from "@/features/realtime/components/slide-card"
import { TradingDataTable } from "@/features/realtime/components/trading-table"

export default function Trading() {
	const miniCardDatas = [
		{
			title: "현재 REC 가격",
			value: 39921,
			unit: "원/REC",
			isIncreased: true,
			amount: 320,
			color: "bg-[#F6FCF3]",
		},
		{
			title: "현재 SMP 가격",
			value: 148.32,
			unit: "원/kWh",
			isIncreased: false,
			amount: 0.35,
			color: "bg-[#EFF6F1]",
		},
	]

	return (
		<div className="flex flex-col gap-8 p-8">
			<div className="flex w-full flex-col gap-4">
				<div className="grid w-full grid-cols-4 gap-4">
					{miniCardDatas.map((items: MiniCardPT, idx) => (
						<MiniCard
							title={items.title}
							value={items.value}
							unit={items.unit}
							isIncreased={items.isIncreased}
							amount={items.amount}
							color={items.color}
							key={idx}
							className="h-full"
						/>
					))}

					<div className="col-span-2">
						<TradingVolumeCards />
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<TitleCard title="SMP 가격">
						<div className="pt-2">
							<LineComponent />
						</div>
					</TitleCard>
					<TitleCard title="월별 거래량">
						<div className="pt-4">
							<VolumeChart />
						</div>
					</TitleCard>
				</div>
			</div>
			<div className="flex w-full justify-center">
				<CardComponent>
					<TradingDataTable2sss />
				</CardComponent>
			</div>
		</div>
	)
}

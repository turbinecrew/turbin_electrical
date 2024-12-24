import { TitleCard, CardComponent, MiniCard } from "@/common/components/card"
import { LineComponent } from "@/features/realtime/components/chart"

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
	const timeCardDatas = [
		{
			title: "누적 거래량",
			value: 1144,
			unit: "kWh",
			color: "bg-[#F6FCF3]",
		},
		{
			title: "이번 달 거래량",
			value: 456011,
			unit: "원",
			color: "bg-[#EFF6F1]",
		},
	]
	return (
		<div className="page_container m-5 flex h-full w-[full-20px] flex-col gap-7 overflow-y-auto">
			<div className="page_content flex flex-col gap-8">
				{/* ------top------ */}
				<div className="flex w-full flex-row gap-4">
					<div className="flex w-1/2 flex-col gap-4">
						<div className="flex w-full gap-4">
							{miniCardDatas.map((items, idx) => (
								<MiniCard
									title={items.title}
									value={items.value}
									unit={items.unit}
									isIncreased={items.isIncreased}
									amount={items.amount}
									color={items.color}
									key={idx}
								/>
							))}
						</div>
						<CardComponent>
							<LineComponent />
						</CardComponent>
					</div>
					<div className="flex w-1/2 flex-col gap-4">
						<div className="flex w-full gap-4">
							{timeCardDatas.map((items, idx) => (
								<MiniCard
									title={items.title}
									value={items.value}
									unit={items.unit}
									color={items.color}
									key={idx}
								/>
							))}
						</div>
						<TitleCard
							className="flex h-full min-h-40"
							title="월별 거래량"
						></TitleCard>
					</div>
				</div>
				{/* ------bottom------ */}
				<div className="flex w-full flex-row gap-8">table</div>
			</div>
		</div>
	)
}

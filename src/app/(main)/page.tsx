import { MiniCard } from "@/common/components/card"
import { BidPieChart } from "@/features/realtime/components/chart/bid-pie-chart"
import WeeklyPowerChart from "@/features/realtime/components/chart/weekly-power-chart"
import { RegionalEnergyChart } from "@/features/region/components/RegionalEnergyChart"

export default function Home() {
	const miniCardDatas = [
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
			value: 1144,
			unit: "원",
			isIncreased: false,
			amount: 1.95,
			color: "bg-[#F6FCF3]",
		},
		{
			title: "REC 현재가",
			value: 456,
			unit: "원",
			isIncreased: true,
			amount: 4.5,
			color: "bg-[#EFF6F1]",
		},
	]

	return (
		<div className="flex flex-col gap-8 p-8">
			<div className="grid grid-cols-4 gap-4">
				{miniCardDatas.map((item, index) => (
					<MiniCard
						key={index}
						title={item.title}
						value={item.value}
						unit={item.unit}
						isIncreased={item.isIncreased}
						amount={item.amount}
						color={item.color}
					/>
				))}
			</div>

			<div className="grid grid-cols-2 gap-4">
				<RegionalEnergyChart />
				<div className="flex h-[45vh] w-[30vw] items-center justify-center bg-green-400">
					지도영역
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<BidPieChart />
				<WeeklyPowerChart />
			</div>
		</div>
	)
}

import {
	TitleCard,
	MiniCard,
	TitleContent,
	CardComponent,
} from "@/common/components/card"
import {
	LineComponent,
	PieComponent,
} from "@/features/realtime/components/chart"
import { BidPieChart } from "@/features/realtime/components/chart/bid-pie-chart"
import { ArrowRightCircle } from "lucide-react"

export default function Trading() {
	const RECdata = [
		{
			_id: {
				$oid: "676523b9c5bfa31e0b05c9be",
			},
			거래일: "2024.12.19(목)",
			거래량: "143846",
			평균가: "63104",
			최고가: "65000",
			최저가: "62000",
			종가: "63000",
			date: "2024-12-20 16:58:49",
		},
	]

	return (
		<div className="page_container m-5 flex h-full w-[full-20px] flex-col gap-7 overflow-y-auto">
			<div className="text-3xl font-extralight">전력 거래</div>

			<div className="page_content flex flex-col gap-8">
				{/* ------top------ */}
				<div className="flex w-full flex-row gap-4">
					<div className="flex w-1/2 flex-col gap-4">
						<div className="flex w-full gap-4">
							<div
								className={
									"w-full flex-col gap-2 rounded-xl bg-tbPastelGreen p-6 shadow-md"
								}
							>
								<div className="text-sm font-semibold">현재 REC 가격</div>
								<div className="text-xs font-light">2024-12-18 (목)</div>

								<div className="flex items-center justify-between">
									<div className="flex items-baseline gap-1">
										<span className="scroll-m-20 text-2xl font-semibold tracking-tight">
											39,921
										</span>
										<span className="scroll-m-20 text-xl font-semibold tracking-tight">
											원/REC
										</span>
									</div>
									<div className="text-xs text-red-600"> +320</div>
								</div>
							</div>
							<div
								className={
									"w-full flex-col gap-2 rounded-xl bg-tbPastelGreen p-6 shadow-md"
								}
							>
								<div className="text-sm font-semibold">현재 SMP 가격</div>
								<div className="text-xs font-light">2024-12-18 (목) 12:34</div>

								<div className="flex items-center justify-between gap-1">
									<div className="flex items-baseline gap-1">
										<span className="scroll-m-20 text-2xl font-semibold tracking-tight">
											148.32
										</span>
										<span className="scroll-m-20 text-xl font-semibold tracking-tight">
											원/kWh
										</span>
									</div>
									<div className="text-xs text-blue-700"> -0.35</div>
								</div>
							</div>
						</div>
						<CardComponent>
							<LineComponent />
						</CardComponent>
					</div>
					<div className="flex w-1/2 flex-col gap-4">
						<div className="flex w-full gap-4">
							<div
								className={
									"w-full flex-col gap-2 rounded-xl bg-tbPastelGreen p-6 shadow-md"
								}
							>
								<div className="">
									<div className="text-sm font-semibold">총 거래량</div>
									<div className="text-xs font-light">2024-12-18 (목)</div>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-baseline gap-1">
										<span className="scroll-m-20 text-2xl font-semibold tracking-tight">
											1,144
										</span>
										<span className="scroll-m-20 text-xl font-semibold tracking-tight">
											kWh
										</span>
									</div>
								</div>
							</div>
							<div
								className={
									"w-full flex-col gap-2 rounded-xl bg-tbPastelGreen p-6 shadow-md"
								}
							>
								<div className="text-sm font-semibold">총 거래 금액</div>
								<div className="text-xs font-light">2024-12-18 (목)</div>

								<div className="flex items-center justify-between">
									<div className="flex items-baseline gap-1">
										<span className="scroll-m-20 text-2xl font-semibold tracking-tight">
											456,011
										</span>
										<span className="scroll-m-20 text-xl font-semibold tracking-tight">
											원
										</span>
									</div>
								</div>
							</div>
						</div>
						<TitleCard
							className="flex h-full min-h-40"
							title="입찰/매칭 현황"
							lowerTitle="2024-12-18 12:34"
						>
							<BidPieChart />
							<div className="flex h-full w-full items-center justify-center">
								<button className="flex h-[50px] w-fit items-center justify-center gap-1 rounded-2xl border bg-slate-200 p-4 text-center">
									거래관리
									<ArrowRightCircle />
								</button>
							</div>
						</TitleCard>
					</div>
				</div>
				{/* ------bottom------ */}
				<div className="flex w-full flex-row gap-8">
					<TitleCard className="flex w-1/2 gap-1" title="오늘의 REC">
						<div className="w-full bg-[#72BF2C] text-center font-semibold text-white">
							1REC=1MWh(가중치에 따라 변동)
						</div>
						<div className="flex items-center justify-between">
							<div className="text-xs text-gray-500">
								※ 매주 화,목요일 10 : 00 ~ 16 : 00 개장
							</div>
							<div className="text-xs text-gray-500">(단위:REC,원/REC)</div>
						</div>
						<table className="w-full">
							<tbody className="border-collapse">
								<tr className="w-full border-b border-t">
									<th className="w-1/6 border-b border-t bg-gray-200 p-2">
										거래일
									</th>
									<td className="w-2/6 border p-2">{RECdata[0].거래일}</td>
									<th className="w-1/6 border bg-gray-200 p-2">거래량</th>
									<td className="w-2/6 border-b border-t p-2">
										{RECdata[0].거래량
											.toString()
											.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
									</td>
								</tr>
								<tr className="border-b">
									<th className="border-b bg-gray-200 p-2">평균가</th>
									<td className="border p-2">
										{RECdata[0].평균가
											.toString()
											.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
									</td>
									<th className="border bg-gray-200 p-2">최고가</th>
									<td className="border-b p-2">
										{RECdata[0].최고가
											.toString()
											.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
									</td>
								</tr>
								<tr className="border-b">
									<th className="border-b bg-gray-200 p-2">최저가</th>
									<td className="border p-2">
										{RECdata[0].최저가
											.toString()
											.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
									</td>
									<th className="border bg-gray-200 p-2">종가</th>
									<td className="border-b p-2">
										{RECdata[0].종가
											.toString()
											.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
									</td>
								</tr>
							</tbody>
						</table>
					</TitleCard>
				</div>
			</div>
		</div>
	)
}

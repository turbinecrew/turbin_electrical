import { PieChart, Search } from "lucide-react"

import { TitleCard, MiniCard, TitleContent } from "@/components/common/card"

export default function Trading() {
	return (
		<div className="container mx-auto flex h-screen flex-col gap-4 overflow-y-auto p-10">
			<div className="mb-6 text-3xl">Trading</div>
			{/* ------top------ */}
			<div className="grid h-[320px] grid-cols-5 gap-4">
				<TitleCard className="col-span-1" title="총 거래량">
					<TitleContent className="flex flex-col gap-4">
						<MiniCard title="총 거래량" value="10,000" unit="MWh" />
						<MiniCard title="총 거래 금액" value="1,000,000" unit="원" />
					</TitleContent>
				</TitleCard>
				<TitleCard
					className="col-span-1"
					title="입찰/매칭 비율"
					lowerTitle="단위: 원"
				>
					<TitleContent className="">
						<PieChart size={60} />
					</TitleContent>
				</TitleCard>
				<TitleCard
					className="col-span-3"
					title="총 REC 거래량과 평균 거래 가격"
				>
					<TitleContent className="grid grid-cols-4 gap-4">
						<div className="col-span-1 flex flex-col gap-4 align-middle">
							<MiniCard title="총 REC 거래량" value="2,000" unit="REC" />
							<MiniCard title="평균 가격" value="50,000" unit="원/REC" />
						</div>
						<div className="col-span-1">
							<div>원형 차트</div>
							<PieChart size={60} />
						</div>
						<TitleCard className="col-span-2" title="REC 거래 요약 카드">
							거래요약
							<table className="mt-5">
								<thead>
									<tr>
										<th className="border border-black">#</th>
										<th className="border border-black">First Name</th>
										<th className="border border-black">Last Name</th>
										<th className="border border-black">Username</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="border border-black">1</td>
										<td className="border border-black">Mark</td>
										<td className="border border-black">Otto</td>
										<td className="border border-black">@mdo</td>
									</tr>
									<tr>
										<td className="border border-black">2</td>
										<td className="border border-black">Jacob</td>
										<td className="border border-black">Thornton</td>
										<td className="border border-black">@fat</td>
									</tr>
									<tr>
										<td className="border border-black">3</td>
										<td className="border border-black" colSpan={2}>
											Larry the Bird
										</td>
										<td className="border border-black">@twitter</td>
									</tr>
								</tbody>
							</table>
						</TitleCard>
					</TitleContent>
				</TitleCard>
			</div>
			{/* ------middle------ */}
			<div className="">
				<TitleCard title="거래 상세 테이블">
					<div className="flex w-full flex-col items-center">
						<div>
							<div className="flex h-10 w-fit items-center justify-center rounded-2xl border border-gray-600 px-4 focus-within:border-sky-400">
								<label>
									<Search color="gray" size={16} />
								</label>
								<input
									className="h-full w-48 border-none bg-transparent pl-3 text-white outline-none valid:placeholder-gray-500"
									placeholder="Type here..."
								/>
								<div className="m-1 rounded-2xl border border-gray-600">
									combobox
								</div>
								<div className="m-1 rounded-2xl border border-gray-600">
									combobox
								</div>
							</div>
						</div>
					</div>
				</TitleCard>
			</div>
			{/* ------bottom------ */}
			<div className="">
				<div className="grid h-[400px] grid-cols-2 gap-4">
					<TitleCard
						className="col-span-1"
						title="시간대별 거래량 그래프"
						lowerTitle="단위: 원"
					>
						<TitleContent className="flex flex-col gap-4">
							막대그래프(Bar Chart): ● X축: 시간대. ● Y축: 거래량(MWh).
						</TitleContent>
					</TitleCard>
					<TitleCard
						className="col-span-1"
						title=" SMP/REC 가격 그래프"
						lowerTitle="단위: 원"
					>
						<TitleContent className="">
							<PieChart size={60} />
							선형 그래프(Line Chart): ● X축: 시간대. ● Y축: 가격(₩). 두 개의
							선(SMP, REC)을 색상으로 구분.
						</TitleContent>
					</TitleCard>
				</div>
			</div>
		</div>
	)
}

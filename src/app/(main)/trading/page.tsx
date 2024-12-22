import { TitleCard, MiniCard, TitleContent } from "@/common/components/card"
import { BarChartComponent } from "@/shadcn/components/chart/bar"
import {
	LineComponent,
	PieComponent,
} from "@/features/realtime/components/chart"
import { TradingDataTable } from "@/features/realtime/components/trading-table"

export default function Trading() {
	return (
		<div className="container m-4 flex h-screen w-full flex-col gap-4 overflow-y-auto">
			<div className="mb-6 text-3xl">Trading</div>
			{/* ------top------ */}
			<div className="grid h-fit grid-cols-5 gap-4">
				<TitleCard className="col-span-1" title="총 거래량">
					<TitleContent className="flex flex-col gap-4">
						<MiniCard
							isColored={true}
							title="총 거래량"
							value="10,000"
							unit="MWh"
						/>
						<MiniCard
							isColored={true}
							title="총 거래 금액"
							value="1,000,000"
							unit="원"
						/>
					</TitleContent>
				</TitleCard>
				<TitleCard
					className="col-span-1"
					title="입찰/매칭 비율"
					lowerTitle="단위: 원"
				>
					<TitleContent className="">
						<PieComponent />
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
							<PieComponent />
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
			<div className="h-fit">
				<TitleCard title="거래 상세 테이블">
					<TradingDataTable />
				</TitleCard>
			</div>
			{/* ------bottom------ */}
			<div className="h-fit">
				<div className="grid h-[400px] grid-cols-2 gap-4">
					<TitleCard
						className="col-span-1"
						title="시간대별 거래량 그래프"
						lowerTitle="단위: 원"
					>
						<TitleContent className="flex flex-col gap-4">
							<BarChartComponent />
							막대그래프(Bar Chart): ● X축: 시간대. ● Y축: 거래량(MWh).
						</TitleContent>
					</TitleCard>
					<TitleCard
						className="col-span-1"
						title=" SMP/REC 가격 그래프"
						lowerTitle="단위: 원"
					>
						<TitleContent className="">
							<LineComponent />
							선형 그래프(Line Chart): ● X축: 시간대. ● Y축: 가격(₩). 두 개의
							선(SMP, REC)을 색상으로 구분.
						</TitleContent>
					</TitleCard>
				</div>
			</div>
		</div>
	)
}

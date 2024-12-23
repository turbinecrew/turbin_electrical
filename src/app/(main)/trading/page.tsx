import { TitleCard, CardComponent } from "@/common/components/card"
import { LineComponent } from "@/features/realtime/components/chart"

export default function Trading() {
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
									"w-full flex-col gap-2 rounded-xl bg-[#F6FCF3] p-6 shadow-md"
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
									"w-full flex-col gap-2 rounded-xl bg-[#EFF6F1] p-6 shadow-md"
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
									"w-full flex-col gap-2 rounded-xl bg-[#F6FCF3] p-6 shadow-md"
								}
							>
								<div className="">
									<div className="text-sm font-semibold">어제 총 거래량</div>
									<div className="text-xs font-light">2024-12-17 (수)</div>
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
									"w-full flex-col gap-2 rounded-xl bg-[#EFF6F1] p-6 shadow-md"
								}
							>
								<div className="text-sm font-semibold">오늘 총 거래량</div>
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
							title="시간대별거래량"
							lowerTitle="2024-12-18 12:34"
						></TitleCard>
					</div>
				</div>
				{/* ------bottom------ */}
				<div className="flex w-full flex-row gap-8">table</div>
			</div>
		</div>
	)
}

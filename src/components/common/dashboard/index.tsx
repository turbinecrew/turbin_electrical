"use client"
import { Globe } from "lucide-react"
import { Component } from "@/components/common/chart/bar"

export default function Dashboard() {
	return (
		<div className="flex flex-col overflow-x-auto p-4">
			{/* 상단 카드 */}
			<div className="flex space-x-4 pb-4">
				{[1, 2, 3, 4].map((item) => (
					<div
						key={item}
						className="flex w-1/4 max-w-[calc(25%-1rem)] flex-shrink-0 justify-between rounded-3xl bg-tbPastelGreen p-4 text-left text-gray-500 shadow-md"
					>
						<div>
							<h3 className="text-[12px]">일일 전력 생산</h3>
							<p className="text-[16px] font-bold">
								250 MWh <span className="text-base text-tbGreen">+55%</span>
							</p>
						</div>
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tbLightGreen text-white transition-colors duration-300 group-hover:bg-tbGreen group-hover:text-white">
							<Globe className="h-5 w-5" />
						</div>
					</div>
				))}
			</div>

			{/* 하단 차트 영역 */}
			<div className="flex flex-col space-y-4">
				{/* 차트 제목 */}
				<h3 className="text-lg font-bold">전력 생산 추이</h3>

				{/* 차트 부분 */}
				<div className="flex w-full justify-center">
					<div className="h-[400px] w-full max-w-[1200px]">
						{/* 차트 컴포넌트 */}
						<Component />
					</div>
				</div>
			</div>
		</div>
	)
}

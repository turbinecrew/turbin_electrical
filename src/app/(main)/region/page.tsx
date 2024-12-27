import ChartToggle from "@/features/prediction/components/ChartToggle"
import RegionalTable from "@/features/region/components/regionaltable"

// regionalPage.tsx
export default function RegionalPage() {
	return (
		<div className="flex min-h-screen w-full flex-col">
			{/* 차트 섹션 */}
			<section className="w-full flex-1">
				<ChartToggle />
			</section>

			{/* 표 섹션 */}
			<section className="w-full flex-1 overflow-x-auto p-4">
				<RegionalTable />
			</section>
		</div>
	)
}

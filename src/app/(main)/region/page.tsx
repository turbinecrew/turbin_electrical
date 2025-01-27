import ChartToggle from "@/features/prediction/components/ChartToggle"
import RegionalTable from "@/features/region/components/regionaltable"
import { Card, CardContent } from "@/shadcn/components/card"

export default function RegionalPage() {
	return (
		<div className="flex min-h-screen w-full flex-col items-center gap-8 p-8">
			<Card className="w-full">
				<CardContent>
					<ChartToggle />
				</CardContent>
			</Card>

			<Card className="w-full">
				<CardContent>
					<RegionalTable />
				</CardContent>
			</Card>
		</div>
	)
}

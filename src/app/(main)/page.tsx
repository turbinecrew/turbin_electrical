import { RegionalEnergyChart } from "@/features/region/components/RegionalEnergyChart"
import WeeklyPowerChart from "@/features/realtime/components/chart/weekly-power"

export default function Home() {
	return (
		<div className="flex h-full w-full items-start justify-start overflow-x-auto">
			<RegionalEnergyChart />
			<WeeklyPowerChart />
		</div>
	)
}

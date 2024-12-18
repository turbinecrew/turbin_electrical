import { RegionalEnergyChart } from "@/features/region/components/RegionalEnergyChart"

export default function Home() {
	return (
		<div className="flex h-full w-full items-start justify-start overflow-x-auto">
			<RegionalEnergyChart />
		</div>
	)
}

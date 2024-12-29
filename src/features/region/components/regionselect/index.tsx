import React from "react"

type RegionSelectPT = {
	regions: string[]
	selectedRegion: string
	onChange: (region: string) => void
}

function RegionSelect({ regions, selectedRegion, onChange }: RegionSelectPT) {
	return (
		<select
			value={selectedRegion}
			onChange={(e) => onChange(e.target.value)}
			className="w-36 rounded border border-gray-300 p-1 text-sm shadow-sm"
		>
			{regions.map((region, idx) => (
				<option key={idx} value={region}>
					{region}
				</option>
			))}
		</select>
	)
}

export default RegionSelect

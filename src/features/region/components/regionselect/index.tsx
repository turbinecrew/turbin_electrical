import React from "react"

interface RegionSelectProps {
	regions: string[]
	selectedRegion: string
	onChange: (region: string) => void
}

const RegionSelect: React.FC<RegionSelectProps> = ({
	regions,
	selectedRegion,
	onChange,
}) => {
	return (
		<select
			value={selectedRegion}
			onChange={(e) => onChange(e.target.value)}
			className="w-36 rounded border border-gray-300 p-1 text-sm shadow-sm"
		>
			{regions.map((region) => (
				<option key={region} value={region}>
					{region}
				</option>
			))}
		</select>
	)
}

export default RegionSelect

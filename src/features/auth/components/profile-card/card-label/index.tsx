import type { ProfileMockKeys } from ".."

type CardLabelPT = {
	data: ProfileMockKeys
	label: string
	value: string
	// isEditing: boolean
	// onChange?: (key: ProfileMockKeys, value: string) => void
}
export function CardLabel({
	//data,
	label,
	value,
	// isEditing,
	//, onChange
}: CardLabelPT) {
	return (
		<div className="flex w-full justify-between gap-4 text-2xl">
			<div className="w-36 rounded-xl border-2 py-1 text-center shadow">
				{label}
			</div>
			{/* {isEditing ? ( */}
			<label
				className="min-w-36 border-b-2 px-4 text-center"

				//onChange={(e) => onChange(data, e.target.value)}
			>
				{value}
			</label>
			{/* ) : (
				<div className="min-w-36 border-b-2 px-4 text-end">{value}</div>
			)} */}
		</div>
	)
}

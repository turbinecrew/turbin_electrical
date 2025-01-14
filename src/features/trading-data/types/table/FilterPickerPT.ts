import type { Dispatch, SetStateAction } from "react"

export const FilterColumnList = [
	{ id: "volume", name: "발전량" },
	{ id: "bidVolume", name: "거래량" },
	{ id: "bidNumbers", name: "거래" },
]

export type FilterPickerPT = {
	activeFilter: Record<string, boolean>
	setActiveFilter: Dispatch<SetStateAction<Record<string, boolean>>>
	updateState: (
		newState: Partial<{
			filtering: boolean
			ordering: boolean
		}>,
	) => void
	toggleState: {
		filtering: boolean
		ordering: boolean
	}
}

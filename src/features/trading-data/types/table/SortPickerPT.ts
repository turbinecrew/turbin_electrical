import type { Dispatch, SetStateAction } from "react"

export const SortColumnList = [
	{ id: "plantName", name: "발전소명" },
	{ id: "volume", name: "발전량" },
	{ id: "bidVolume", name: "거래량" },
	{ id: "bidNumbers", name: "거래" },
]

export type SortPickerPT = {
	sortingState: Record<string, boolean>
	setSortingState: Dispatch<SetStateAction<Record<string, boolean>>>
	currentSortColumn: string
	setCurrentSortColumn: Dispatch<SetStateAction<string>>
	handleSort: () => void
	toggleState: {
		filtering: boolean
		ordering: boolean
	}
	updateState: (
		newState: Partial<{
			filtering: boolean
			ordering: boolean
		}>,
	) => void
}

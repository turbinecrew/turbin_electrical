import type { Dispatch, SetStateAction } from "react"

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

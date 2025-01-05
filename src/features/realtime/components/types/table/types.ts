import type { Column } from "@tanstack/react-table"
import type { Dispatch, InputHTMLAttributes, SetStateAction } from "react"

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

export type DebouncedInputPT = {
	value: string | number
	onChange: (value: string | number) => void
	debounce?: number
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">

export type FilterDataByRangePT = {
	column: Column<unknown, unknown>
	id: string
	isInputVisible?: boolean
	resetTableFilter: (column: string) => void
}

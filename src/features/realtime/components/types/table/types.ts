import type { Column } from "@tanstack/react-table"
import type { Dispatch, InputHTMLAttributes, SetStateAction } from "react"

//sort-picker

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

//filter-picker, filter

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

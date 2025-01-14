import type { Column } from "@tanstack/react-table"
import type { InputHTMLAttributes } from "react"

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

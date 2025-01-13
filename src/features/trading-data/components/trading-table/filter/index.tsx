import { Minus, X } from "lucide-react"
import { useEffect, useState } from "react"

import {
	FilterColumnList,
	type DebouncedInputPT,
	type FilterDataByRangePT,
} from "@/features/trading-data/types/table/types"

function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: DebouncedInputPT) {
	const [value, setValue] = useState(initialValue)

	useEffect(() => {
		setValue(initialValue)
	}, [initialValue])

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value)
		}, debounce)

		return () => clearTimeout(timeout)
	}, [value, onChange, debounce])

	return (
		<input
			{...props}
			value={value}
			className="h-fit w-20 rounded border text-center text-xs md:text-sm"
			onChange={(e) => setValue(e.target.value)}
		/>
	)
}

export function FilterDataByRange({
	column,
	id,
	isInputVisible = true,
	resetTableFilter,
}: FilterDataByRangePT) {
	const columnFilterValue = column.getFilterValue()

	return (
		<>
			{isInputVisible && (
				<div className="flex h-fit w-fit items-center gap-3 rounded-xl border pr-2 text-sm font-medium md:p-1">
					<div className="w-14 border border-none px-1 text-center text-xs font-medium md:text-sm">
						{FilterColumnList.find((item) => item.id === id)?.name || "Unknown"}
					</div>
					<div className="flex h-fit w-fit flex-row items-center gap-1">
						<DebouncedInput
							type="number"
							value={(columnFilterValue as [number, number])?.[0] ?? ""}
							onChange={(value) =>
								column.setFilterValue((old: [number, number]) => [
									value,
									old?.[1],
								])
							}
							placeholder={`Min`}
						/>
						<Minus size={10} />
						<DebouncedInput
							type="number"
							value={(columnFilterValue as [number, number])?.[1] ?? ""}
							onChange={(value) =>
								column.setFilterValue((old: [number, number]) => [
									old?.[0],
									value,
								])
							}
							placeholder={`Max`}
						/>
					</div>
					<button
						onClick={() => {
							resetTableFilter(id)
						}}
						className="flex flex-row items-center gap-1 text-gray-400"
					>
						<X className="gray-400 w-3 md:w-4" />
					</button>
				</div>
			)}
		</>
	)
}

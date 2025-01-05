import type { Column } from "@tanstack/react-table"
import { Minus, X } from "lucide-react"
import { useEffect, useState } from "react"
import type { InputHTMLAttributes } from "react"

import { FilterColumnList } from "@/features/realtime/components/trading-table/filter-picker"

function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: {
	value: string | number
	onChange: (value: string | number) => void
	debounce?: number
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">) {
	//사용자가 입력을 멈춘 후 일정 시간이 지나면 onChange 콜백을 호출한다.
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
			onChange={(e) => setValue(e.target.value)}
		/>
	)
}

export function FilterDataByRange({
	column,
	id,
	isInputVisible = true,
	resetTableFilter,
}: {
	column: Column<unknown, unknown>
	id: string
	isInputVisible?: boolean
	resetTableFilter: (column: string) => void
}) {
	const columnFilterValue = column.getFilterValue()

	return (
		<>
			{isInputVisible && (
				<div className="flex h-fit w-fit items-center gap-3 rounded-xl border p-1 pr-2 text-sm font-medium">
					<div className="border border-none px-1 text-sm font-medium">
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
							className="w-20 rounded border text-center"
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
							className="w-20 rounded border text-center"
						/>
					</div>
					<button
						onClick={() => {
							resetTableFilter(id)
						}}
						className="flex flex-row items-center gap-1 text-gray-400"
					>
						<X size={16} className="gray-400" />
					</button>
				</div>
			)}
		</>
	)
}

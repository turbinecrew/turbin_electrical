import type { Column } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import type { InputHTMLAttributes } from "react"

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
	label,
}: {
	column: Column<unknown, unknown>
	label: string
}) {
	const columnFilterValue = column.getFilterValue()

	return (
		<div>
			<div className="mt-1 flex h-fit items-center gap-3 rounded-xl border border-none bg-background p-2 text-sm font-medium transition-colors focus-within:border-tbGreen">
				<div className="text-sm">{label}</div>
				<DebouncedInput
					type="number"
					value={(columnFilterValue as [number, number])?.[0] ?? ""}
					onChange={(value) =>
						column.setFilterValue((old: [number, number]) => [value, old?.[1]])
					}
					placeholder={`Min`}
					className="w-20 rounded border text-center"
				/>
				-
				<DebouncedInput
					type="number"
					value={(columnFilterValue as [number, number])?.[1] ?? ""}
					onChange={(value) =>
						column.setFilterValue((old: [number, number]) => [old?.[0], value])
					}
					placeholder={`Max`}
					className="w-20 rounded border text-center"
				/>
			</div>
		</div>
	)
}

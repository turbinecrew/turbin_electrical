import type { Column } from "@tanstack/react-table"
import { Minus } from "lucide-react"
import { useEffect, useState } from "react"
import type { InputHTMLAttributes } from "react"

import Button from "@/common/components/button"

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
	key?: number | string
}) {
	const columnFilterValue = column.getFilterValue()
	const [isInputVisible, setInputVisible] = useState(false)

	return (
		<div className="flex h-fit w-fit items-center rounded-xl border text-sm font-medium">
			<Button
				className="cursor-pointer border border-none text-sm font-medium"
				onClick={() => setInputVisible((prev) => !prev)}
			>
				{label}
			</Button>

			{isInputVisible && (
				<div className="flex h-fit w-fit flex-row items-center gap-1 px-3">
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
			)}
		</div>
	)
}

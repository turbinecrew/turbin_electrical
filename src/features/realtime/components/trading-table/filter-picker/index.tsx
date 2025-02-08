"use client"

import { ChevronDown, Plus } from "lucide-react"
import { useState } from "react"

import TbButton from "@/common/components/button/TbButton"
import {
	FilterColumnList,
	type FilterPickerPT,
} from "@/features/realtime/components/types/table/types"
import { TbDropDown } from "@/common/components/dropDown"

export function FileterPicker({
	activeFilter,
	setActiveFilter,
	updateState,
	toggleState,
}: FilterPickerPT) {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [selected, setSelected] = useState("")

	const handleFilter = () => {
		if (selected) {
			setActiveFilter((prevState: Record<string, boolean>) => ({
				...prevState,
				[selected]: true,
			}))
		}
	}

	const columnList = FilterColumnList
	const text = columnList.find((column) => column.id === selected)

	return (
		<div className="absolute z-10 mt-2 flex w-fit flex-col gap-1 rounded-2xl bg-white p-5 text-slate-700 shadow-md transition duration-200 ease-in">
			<div className="flex items-center gap-2">
				<TbDropDown
					dropDownText={text ? text.name : "필터 선택"}
					selectList={columnList}
					onClickFunc={(id) => {
						setSelected(id)
					}}
				/>
				<TbButton
					color="tableGray"
					size="table"
					onClick={() => {
						handleFilter()
						updateState({ filtering: !toggleState.filtering })
					}}
					className="flex h-7 items-center gap-1 bg-gray-200 text-xs text-slate-700"
				>
					<Plus size={12} />
					추가
				</TbButton>
			</div>
		</div>
	)
}

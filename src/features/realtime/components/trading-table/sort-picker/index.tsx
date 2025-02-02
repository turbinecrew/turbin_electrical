"use client"

import { Check, ChevronDown, ChevronsDown, ChevronsUp } from "lucide-react"
import { useState } from "react"

import TbButton from "@/common/components/button/TbButton"
import {
	SortColumnList,
	type SortPickerPT,
} from "@/features/realtime/components/types/table/types"
import { TbDropDown } from "@/common/components/dropDown"

export function SortPicker({
	sortingState,
	setSortingState,
	currentSortColumn,
	setCurrentSortColumn,
	handleSort,
	toggleState,
	updateState,
}: SortPickerPT) {
	const handleSortState = (column: string) => {
		setSortingState((prev: Record<string, boolean>) => ({
			...prev,
			[column]: !prev[column],
		}))
	}

	const text = SortColumnList.find((column) => column.id === currentSortColumn)

	return (
		<div className="absolute z-10 mt-2 flex w-fit flex-col gap-1 rounded-2xl bg-white p-5 text-slate-700 shadow-md transition duration-200 ease-in">
			<div className="flex items-center gap-2">
				<TbDropDown
					dropDownText={text ? text.name : "정렬 기준"}
					selectList={SortColumnList}
					onClickFunc={(id) => {
						setCurrentSortColumn(id)
						handleSortState(currentSortColumn)
					}}
					contentClassName={({ id }) =>
						currentSortColumn === id ? "bg-gray-100 font-bold" : ""
					}
				/>
				<TbButton
					color="tableWhite"
					size="table"
					onClick={() => {
						handleSortState(currentSortColumn)
					}}
					className="flex w-24 items-center gap-1 text-nowrap text-xs text-slate-700 md:text-sm"
				>
					{currentSortColumn === "" ? (
						"정렬하기"
					) : sortingState[currentSortColumn] ? (
						<>
							<ChevronsDown size={12} />
							내림차순
						</>
					) : (
						<>
							<ChevronsUp size={12} />
							오름차순
						</>
					)}
				</TbButton>
				<TbButton
					onClick={() => {
						handleSort()
						updateState({ ordering: !toggleState.ordering })
					}}
					color="tableGray"
					size="table"
					className="flex h-7 items-center gap-1 text-nowrap bg-gray-200 text-xs text-slate-700"
				>
					<Check size={14} />
					확인
				</TbButton>
			</div>
		</div>
	)
}

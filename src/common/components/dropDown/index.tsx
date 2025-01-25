import { ChevronDown } from "lucide-react"
import { useMemo, useState } from "react"

import TbButton from "@/common/components/button/TbButton"
import { cn } from "@/util/utils"

type DropDownPT = {
	dropDownText: string
	selectList: { id: string; name: string }[]
	onClickFunc: (id: string) => void
	contentClassName?: (item: { id: string; name: string }) => string
}

export const TbDropDown = ({
	dropDownText,
	selectList,
	onClickFunc,
	contentClassName,
}: DropDownPT) => {
	const [dropdownOpen, setDropdownOpen] = useState(false)

	const itemsWithClassNames = useMemo(
		() =>
			selectList.map((item) => ({
				...item,
				className: contentClassName ? contentClassName(item) : "",
			})),
		[selectList, contentClassName], // selectList나 contentClassName 변경 시 재계산
	)

	return (
		<div className="relative w-fit">
			<TbButton
				color="tableWhite"
				size="table"
				onClick={() => setDropdownOpen((e) => !e)}
				className="flex w-28 justify-between gap-1 md:w-32"
			>
				<div className="flex w-full justify-center text-xs md:text-sm">
					{dropDownText}
				</div>
				<ChevronDown
					className={`transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
					size={16}
				/>
			</TbButton>
			{dropdownOpen && (
				<div className="absolute z-10 mt-2 flex w-full flex-col gap-1 overflow-hidden rounded-2xl border border-gray-300 bg-white text-black transition duration-200 ease-in focus:ring-2 focus:ring-gray-200">
					{itemsWithClassNames.map(
						(item: { id: string; className?: string; name: string }) => (
							<button
								key={item.id}
								onClick={() => {
									setDropdownOpen(false)
									onClickFunc(item.id)
									console.log(item, contentClassName?.(item))
								}}
								color="clear"
								className={cn(
									item.className,
									"w-full rounded-none px-4 py-2 text-center text-xs text-gray-700 hover:bg-gray-200 hover:text-black md:text-sm",
								)}
							>
								{item.name}
							</button>
						),
					)}
				</div>
			)}
		</div>
	)
}

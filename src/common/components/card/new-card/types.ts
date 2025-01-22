import { cva, VariantProps } from "class-variance-authority"
import { ReactNode } from "react"

export const cardVariants = cva("shadow-md", {
	variants: {
		color: {
			default: "bg-[#FAFAFA]",
			light: "bg-[#F6FCF3]",
			deep: "bg-[#EFF6F1]",
			pastelGreen: "bg-tbPastelGreen",
		},
		size: {
			default: "rounded-2xl",
			mini: "flex-col gap-2 rounded-xl p-6",
		},
	},
	defaultVariants: {
		color: "default",
		size: "default",
	},
})

export type TbCardPT = {
	className?: string
	children?: ReactNode
	size?: VariantProps<typeof cardVariants>["size"]
	color?: VariantProps<typeof cardVariants>["color"]
}

export type TbCardHeaderPT = {
	className?: string
	children?: ReactNode
	title?: string
	rightArea?: ReactNode
	sideTitle?: string
}

export type MiniCardPT = {
	title?: string
	children?: ReactNode
	className?: string
	value?: string | number
	unit?: string
	amount?: number | null
	isIncreased?: boolean | "noChange" | null // true: 증가, false: 감소, noChange: 변화 없음
}

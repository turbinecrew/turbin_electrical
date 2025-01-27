import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import type { ReactNode } from "react"

export const cardVariants = cva("shadow-md", {
	variants: {
		variant: {
			default: "rounded-2xl",
			mini: "flex-col gap-2 rounded-xl p-6",
		},
		color: {
			default: "bg-[#FAFAFA]",
			light: "bg-[#F6FCF3]",
			deep: "bg-[#EFF6F1]",
			pastelGreen: "bg-tbPastelGreen",
		},
	},
	defaultVariants: {
		variant: "default",
		color: "default",
	},
})

export type TbCardPT = {
	className?: string
	children?: ReactNode
	variant?: VariantProps<typeof cardVariants>["variant"]
	color?: VariantProps<typeof cardVariants>["color"]
}

export type TbCardHeaderPT = {
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

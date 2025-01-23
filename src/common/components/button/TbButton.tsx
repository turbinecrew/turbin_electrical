"use client"

import type { VariantProps } from "class-variance-authority"
import cn from "clsx"
import type { ButtonHTMLAttributes, ReactNode } from "react"
import React from "react"

import { buttonVariants } from "./buttonVariants"

type ButtonPT = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
	className?: string
	children: ReactNode
	size?: VariantProps<typeof buttonVariants>["size"]
	color?: VariantProps<typeof buttonVariants>["color"]
	type?: "button" | "submit"
}

export default function Button({
	className,
	size,
	color,
	children,
	...rest
}: ButtonPT) {
	return (
		<button
			{...rest}
			type={rest.type || "button"}
			className={cn(buttonVariants({ size, color }), className)}
		>
			{children}
		</button>
	)
}

Button.defaultPT = {
	size: "md",
	color: "tbGreen",
}
